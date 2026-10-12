<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content records-modal">
      <div class="card-title-row">
        <h2>
          <span>📁</span> {{ t('recordsModalTitle') }}
        </h2>
        <button class="btn btn-secondary btn-icon btn-sm" @click="$emit('close')">✕</button>
      </div>

      <!-- Auth Warning if not authenticated -->
      <div v-if="!authState.authenticated" class="unauth-records-box">
        <div class="unauth-icon">🔒</div>
        <h3>{{ t('loginToViewRecordsTitle') }}</h3>
        <p>{{ t('loginToViewRecordsDesc') }}</p>
        <button class="btn btn-primary btn-sm" @click="$emit('open-auth')">
          {{ t('loginNowBtn') }}
        </button>
      </div>

      <!-- Authenticated Content -->
      <div v-else class="records-content-body">
        <!-- Records Overview Stats -->
        <div class="stats-cards-grid">
          <div class="stat-card total-card">
            <span class="stat-num">{{ records.length }}</span>
            <span class="stat-label">{{ t('totalDonorsCount') }}</span>
          </div>

          <div class="stat-card blood-stats">
            <div class="blood-pills-row">
              <span 
                v-for="(count, bg) in bloodGroupStats" 
                :key="bg"
                class="mini-bg-pill"
                v-show="count > 0"
              >
                <strong>{{ bg }}:</strong> {{ count }}
              </span>
            </div>
            <span class="stat-label">{{ t('groupWiseStats') }}</span>
          </div>
        </div>

        <!-- Search & Filter Controls -->
        <div class="filter-controls-row">
          <input 
            type="text" 
            class="form-input search-box" 
            v-model="searchQuery" 
            :placeholder="t('searchDonorPlaceholder')" 
          />
          <select class="form-select filter-select" v-model="filterBloodGroup">
            <option value="">{{ t('allGroups') }}</option>
            <option v-for="bg in ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']" :key="bg" :value="bg">
              {{ bg }}
            </option>
          </select>
        </div>

        <!-- Records List -->
        <div v-if="loading" class="loading-state">
          <span>⏳ {{ t('loadingRecords') }}</span>
        </div>

        <div v-else-if="filteredRecords.length === 0" class="empty-state">
          <div class="empty-icon">📂</div>
          <p>{{ t('noRecordsFound') }}</p>
        </div>

        <div v-else class="records-items-list">
          <div 
            v-for="rec in filteredRecords" 
            :key="rec.id" 
            class="record-item-card"
          >
            <!-- Donor Thumbnail / Avatar -->
            <div class="record-avatar-box">
              <img 
                v-if="rec.donorPhoto" 
                :src="rec.donorPhoto" 
                alt="Donor" 
                class="record-avatar-img" 
              />
              <div v-else class="record-avatar-fallback">🩸</div>
              <span class="record-bg-chip">{{ rec.bloodGroup }}</span>
            </div>

            <!-- Details -->
            <div class="record-meta">
              <div class="record-name-row">
                <h4 class="rec-donor-name">{{ rec.donorName }}</h4>
                <span class="rec-count-badge">{{ rec.donationCount || '1st Time' }}</span>
              </div>

              <div class="rec-sub-info">
                <span>📅 {{ rec.donationDate }}</span>
                <span v-if="rec.referenceName" class="rec-ref">
                  🤝 {{ rec.referenceName }}
                </span>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="record-actions">
              <button 
                class="btn btn-secondary btn-sm" 
                @click="loadRecordIntoEditor(rec)"
                :title="t('loadToEditorBtn')"
              >
                {{ t('loadToEditorBtn') }}
              </button>
              <button 
                class="btn btn-secondary btn-sm btn-delete" 
                @click="deleteRecord(rec.id)"
                :title="t('deleteBtn')"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="records-footer-actions">
          <button class="btn btn-secondary btn-sm" @click="fetchRecords">
            {{ t('refreshBtn') }}
          </button>
          <button class="btn btn-primary btn-sm" @click="exportRecordsFile">
            {{ t('exportFileBtn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../utils/api';
import { t, currentLang } from '../utils/i18n';

const props = defineProps({
  authState: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'open-auth', 'load-record', 'notify']);

const records = ref([]);
const loading = ref(false);
const searchQuery = ref('');
const filterBloodGroup = ref('');

onMounted(() => {
  if (props.authState.authenticated) {
    fetchRecords();
  }
});

async function fetchRecords() {
  loading.value = true;
  try {
    records.value = await api.getRecords();
  } catch (e) {
    console.error('Fetch records failed:', e);
  } finally {
    loading.value = false;
  }
}

const filteredRecords = computed(() => {
  return records.value.filter(r => {
    const matchesSearch = !searchQuery.value || (r.donorName || '').toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesBg = !filterBloodGroup.value || r.bloodGroup === filterBloodGroup.value;
    return matchesSearch && matchesBg;
  });
});

const bloodGroupStats = computed(() => {
  const stats = { 'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0, 'AB+': 0, 'AB-': 0, 'O+': 0, 'O-': 0 };
  records.value.forEach(r => {
    if (stats[r.bloodGroup] !== undefined) {
      stats[r.bloodGroup]++;
    }
  });
  return stats;
});

function loadRecordIntoEditor(rec) {
  emit('load-record', rec);
  emit('close');
  emit('notify', t('toastLoaded'));
}

async function deleteRecord(id) {
  const confirmMsg = currentLang.value === 'bn' 
    ? 'আপনি কি নিশ্চিত যে এই রেকর্ডটি মুছতে চান?' 
    : 'Are you sure you want to delete this donor record?';
  if (!confirm(confirmMsg)) return;

  await api.deleteRecord(id);
  records.value = records.value.filter(r => r.id !== id);
  emit('notify', currentLang.value === 'bn' ? 'রেকর্ডটি মোছা হয়েছে।' : 'Record deleted.');
}

function exportRecordsFile() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(records.value, null, 2));
  const dlAnchor = document.createElement('a');
  dlAnchor.setAttribute('href', dataStr);
  dlAnchor.setAttribute('download', `donor_records_backup_${Date.now()}.json`);
  dlAnchor.click();
  emit('notify', currentLang.value === 'bn' ? 'রেকর্ড ফাইল ডাউনলোড হয়েছে!' : 'Records file downloaded!');
}
</script>

<style scoped>
.records-modal {
  max-width: 650px;
}

.unauth-records-box {
  text-align: center;
  padding: 2.5rem 1rem;
}

.unauth-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.unauth-records-box h3 {
  font-size: 1.3rem;
  color: #fca5a5;
  margin-bottom: 0.5rem;
}

.unauth-records-box p {
  color: #94a3b8;
  max-width: 380px;
  margin: 0 auto 1.5rem;
  font-size: 0.9rem;
  line-height: 1.4;
}

.stats-cards-grid {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.85rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.total-card .stat-num {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: #ef4444;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-top: 0.2rem;
}

.blood-pills-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.mini-bg-pill {
  font-size: 0.7rem;
  background: rgba(239, 68, 68, 0.15);
  color: #fca5a5;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.filter-controls-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-box {
  flex: 1;
}

.filter-select {
  width: 120px;
}

.records-items-list {
  max-height: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-right: 0.3rem;
}

.record-item-card {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: var(--radius-md);
  padding: 0.65rem 0.85rem;
  transition: var(--transition);
}

.record-item-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(239, 68, 68, 0.3);
}

.record-avatar-box {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: #1e293b;
  flex-shrink: 0;
  border: 2px solid #ef4444;
}

.record-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.record-avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
}

.record-bg-chip {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #dc2626;
  color: #fff;
  font-size: 0.55rem;
  font-weight: 800;
  padding: 1px 3px;
  border-radius: 3px;
}

.record-meta {
  flex: 1;
  min-width: 0;
}

.record-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.rec-donor-name {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rec-count-badge {
  font-size: 0.7rem;
  background: rgba(245, 158, 11, 0.2);
  color: #fef08a;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
}

.rec-sub-info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.15rem;
}

.rec-ref {
  color: #fef08a;
}

.record-actions {
  display: flex;
  gap: 0.35rem;
}

.btn-delete:hover {
  background: rgba(239, 68, 68, 0.25);
  color: #ef4444;
}

.records-footer-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.empty-state, .loading-state {
  text-align: center;
  padding: 2.5rem 1rem;
  color: var(--text-muted);
}
.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 0.4rem;
}
</style>
