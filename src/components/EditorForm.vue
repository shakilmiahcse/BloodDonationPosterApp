<template>
  <div class="glass-card editor-form-card">
    <div class="card-title-row">
      <h2><span>🎨</span> {{ t('editorTab') }}</h2>
      <div class="title-action-group">
        <!-- New Donor Entry Button (Keeps Org & Template) -->
        <button 
          type="button" 
          class="btn btn-primary btn-sm btn-new-entry" 
          @click="startNewDonorEntry"
          :title="t('newEntryTooltip')"
          id="btn-new-donor-entry"
        >
          <span>➕</span>
          <span>{{ t('newEntryBtn') }}</span>
        </button>
      </div>
    </div>

    <!-- Compact Template Selector (Made much smaller as requested) -->
    <div class="form-group compact-template-section">
      <label class="form-label compact-label">
        <span>{{ t('chooseTemplate') }}</span>
        <span class="active-tpl-badge-compact">{{ currentTemplateName }}</span>
      </label>

      <div class="templates-grid-compact">
        <button 
          v-for="tpl in templates" 
          :key="tpl.id"
          type="button"
          class="template-card-compact"
          :class="{ active: formData.templateId === tpl.id }"
          @click="selectTemplate(tpl.id)"
          :id="'tpl-select-' + tpl.id"
        >
          <span class="tpl-icon-compact">{{ tpl.icon }}</span>
          <span class="tpl-name-compact">{{ t(tpl.nameKey) }}</span>
        </button>
      </div>
    </div>

    <!-- Donor Information Section -->
    <div class="form-section-title">
      <span>{{ t('donorDetailsSection') }}</span>
    </div>

    <!-- Donor Name -->
    <div class="form-group">
      <label class="form-label" for="input-donor-name">
        <span>{{ t('donorName') }} <strong class="req">*</strong></span>
      </label>
      <input 
        id="input-donor-name"
        type="text" 
        class="form-input" 
        v-model="formData.donorName" 
        :placeholder="t('donorNamePlaceholder')"
      />
    </div>

    <!-- Blood Group Picker -->
    <div class="form-group">
      <label class="form-label">
        <span>{{ t('bloodGroup') }} <strong class="req">*</strong></span>
        <span class="sel-blood-val">{{ formData.bloodGroup }}</span>
      </label>
      <div class="blood-group-grid">
        <button 
          v-for="bg in bloodGroups" 
          :key="bg"
          type="button"
          class="blood-group-btn"
          :class="{ selected: formData.bloodGroup === bg }"
          @click="formData.bloodGroup = bg"
          :id="'bg-btn-' + bg.replace('+', 'pos').replace('-', 'neg')"
        >
          {{ bg }}
        </button>
      </div>
    </div>

    <!-- Donation Count -->
    <div class="form-group">
      <label class="form-label">
        <span>{{ t('donationCount') }}</span>
      </label>
      <div class="count-chips-container">
        <button 
          v-for="c in activeCountPresets" 
          :key="c"
          type="button"
          class="chip-btn"
          :class="{ selected: formData.donationCount === c }"
          @click="formData.donationCount = c"
        >
          {{ c }}
        </button>
      </div>
      <input 
        type="text" 
        class="form-input" 
        v-model="formData.donationCount" 
        :placeholder="t('donationCountPlaceholder')"
      />
    </div>

    <!-- Donation Date -->
    <div class="form-group">
      <label class="form-label" for="input-date">
        <span>{{ t('donationDate') }}</span>
      </label>
      <input 
        id="input-date"
        type="date" 
        class="form-input" 
        v-model="formData.donationDate"
      />
    </div>

    <!-- Reference Person (Optional) -->
    <div class="form-group highlight-box">
      <label class="form-label" for="input-reference">
        <span>🤝 {{ t('referenceLabel') }}</span>
        <span class="optional-tag">{{ t('referenceOptional') }}</span>
      </label>
      <input 
        id="input-reference"
        type="text" 
        class="form-input" 
        v-model="formData.referenceName" 
        :placeholder="t('referencePlaceholder')"
      />
      <span class="input-hint">{{ t('referenceHint') }}</span>
    </div>

    <!-- Donor Photo Upload & Adjust -->
    <div class="form-section-title">
      <span>{{ t('photoSection') }}</span>
    </div>

    <div class="form-group photo-section-group">
      <div class="photo-section-header" v-if="formData.donorPhoto">
        <span class="photo-live-status">📸 {{ currentLang === 'bn' ? 'লাইভ ফ্রেম প্রিভিউ' : 'Live Framing Preview' }}</span>
        <button 
          type="button" 
          class="btn-quick-preview-tab" 
          @click="$emit('switch-tab', 'preview')"
          title="সম্পূর্ণ পোস্টার প্রিভিউ দেখুন"
        >
          👁️ {{ t('viewPosterPreview') || 'পোস্টার দেখুন' }}
        </button>
      </div>

      <!-- If NO photo uploaded: clean upload box -->
      <div v-if="!formData.donorPhoto" class="photo-upload-box" @click="triggerFileInput">
        <input 
          type="file" 
          ref="fileInput" 
          accept="image/*" 
          class="hidden-file-input" 
          @change="handlePhotoUpload"
        />
        <div class="upload-placeholder">
          <div class="upload-icon">📸</div>
          <p class="photo-upload-prompt">{{ t('uploadPhotoPrompt') }}</p>
          <span class="upload-sub">{{ t('mobileUploadHint') }}</span>
        </div>
      </div>

      <!-- If photo IS uploaded: Live Interactive Framing Canvas & Touch/Mouse Drag -->
      <div v-else class="interactive-framer-card">
        <input 
          type="file" 
          ref="fileInput" 
          accept="image/*" 
          class="hidden-file-input" 
          @change="handlePhotoUpload"
        />

        <!-- Frame Top Toolbar with Hint Tag & Change Button -->
        <div class="framer-header-bar">
          <span class="framer-hint-tag">
            {{ t('dragToFrameHint') || '👆 ছবিতে আঙুল দিয়ে টেনে মুখ ঠিক পজিশনে বসান' }}
          </span>
          <button 
            type="button" 
            class="btn-framer-change" 
            @click="triggerFileInput"
            title="অন্য ছবি সিলেক্ট করুন"
          >
            🔄 {{ t('changePhotoBtn') || 'ছবি পরিবর্তন' }}
          </button>
        </div>

        <!-- The Exact Proportional Poster Photo Frame Stage -->
        <div class="framer-stage-container">
          <div 
            class="framer-window"
            ref="framerWindowRef"
            @mousedown="startDrag"
            @touchstart="startTouchDrag"
          >
            <!-- Rule-of-Thirds & Center Face Guide Overlay -->
            <div class="framer-grid-guide" aria-hidden="true">
              <div class="grid-line grid-v1"></div>
              <div class="grid-line grid-v2"></div>
              <div class="grid-line grid-h1"></div>
              <div class="grid-line grid-h2"></div>
              <div class="face-target-oval"></div>
            </div>

            <!-- The Live Scaled & Panned Photo -->
            <img 
              :src="formData.donorPhoto" 
              alt="Donor Crop" 
              class="framer-img"
              :style="{
                transform: `scale(${formData.photoZoom || 1}) translate(${formData.photoPanX || 0}px, ${formData.photoPanY || 0}px)`
              }"
              draggable="false"
            />
          </div>
        </div>

        <!-- Framer Controls Strip -->
        <div class="framer-controls-block">
          <!-- Zoom Slider Row with Quick +/- -->
          <div class="framer-ctrl-row zoom-row">
            <span class="ctrl-label">🔍 {{ t('zoomLabel') || 'জুম' }}</span>
            <button 
              type="button" 
              class="btn-step-zoom" 
              @click="adjustZoom(-0.1)"
              title="জুম কমান"
            >
              −
            </button>
            <input 
              type="range" 
              min="0.5" 
              max="3.0" 
              step="0.05" 
              class="framer-zoom-slider"
              v-model.number="formData.photoZoom" 
            />
            <button 
              type="button" 
              class="btn-step-zoom" 
              @click="adjustZoom(0.1)"
              title="জুম বাড়ান"
            >
              +
            </button>
            <span class="ctrl-val-pill">{{ Math.round((formData.photoZoom || 1) * 100) }}%</span>
          </div>

          <!-- Fine Directional Nudge Pad (Up, Down, Left, Right) + Reset -->
          <div class="framer-actions-row">
            <div class="nudge-pad" :title="currentLang === 'bn' ? 'সূক্ষ্ম সরানোর বাটন' : 'Nudge arrows'">
              <button type="button" class="btn-nudge" @click="nudgePan(0, -6)" title="উপরে">⬆️</button>
              <button type="button" class="btn-nudge" @click="nudgePan(0, 6)" title="নিচে">⬇️</button>
              <button type="button" class="btn-nudge" @click="nudgePan(-6, 0)" title="বামে">⬅️</button>
              <button type="button" class="btn-nudge" @click="nudgePan(6, 0)" title="ডানে">➡️</button>
            </div>

            <div class="framer-sub-btns">
              <button 
                type="button" 
                class="btn btn-secondary btn-sm" 
                @click="resetPhotoAlign"
                :title="currentLang === 'bn' ? 'সেন্টার এবং ডিফল্ট সাইজ' : 'Reset center'"
              >
                ↺ {{ t('resetAlign') || 'রিসেট' }}
              </button>
              <button 
                type="button" 
                class="btn btn-secondary btn-sm btn-remove-photo" 
                @click="removeDonorPhoto"
                title="ছবি মুছুন"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Organization Branding & Logo Section -->
    <div class="form-section-title">
      <span>{{ t('orgSection') }}</span>
      <button 
        v-if="authState.authenticated" 
        type="button" 
        class="btn-save-org-mini" 
        @click="$emit('save-org-defaults')"
        title="সংগঠন ও লোগো সবসময় মনে রাখার জন্য সেভ করুন"
      >
        💾 {{ t('saveOrgSettingsBtn') }}
      </button>
    </div>

    <!-- Organization Logo Upload Box -->
    <div class="form-group org-logo-upload-group">
      <label class="form-label">{{ t('orgLogoLabel') }}</label>
      <div class="org-logo-control-row">
        <div class="org-logo-preview-box">
          <img v-if="formData.orgLogo" :src="formData.orgLogo" alt="Org Logo" class="org-logo-thumb" />
          <span v-else class="org-logo-empty-icon">🩸</span>
        </div>
        <div class="org-logo-btns">
          <input 
            type="file" 
            ref="logoFileInput" 
            accept="image/*" 
            class="hidden-file-input" 
            @change="handleLogoUpload"
          />
          <button type="button" class="btn btn-secondary btn-sm" @click="triggerLogoInput">
            📤 {{ t('uploadLogoPrompt') }}
          </button>
          <button 
            v-if="formData.orgLogo" 
            type="button" 
            class="btn btn-secondary btn-sm" 
            @click="resetLogoToDefault"
          >
            ❌ {{ t('resetLogoPrompt') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Organization Name -->
    <div class="form-group">
      <label class="form-label" for="input-org-name">
        <span>{{ t('orgNameLabel') }}</span>
      </label>
      <input 
        id="input-org-name"
        type="text" 
        class="form-input" 
        v-model="formData.orgName" 
        :placeholder="t('orgNamePlaceholder')"
      />
    </div>

    <!-- Organization Slogan / Subtitle -->
    <div class="form-group">
      <label class="form-label" for="input-org-subtitle">
        <span>{{ t('orgSubtitleLabel') }}</span>
      </label>
      <input 
        id="input-org-subtitle"
        type="text" 
        class="form-input" 
        v-model="formData.orgSubtitle" 
        :placeholder="t('orgSubtitlePlaceholder')"
      />
    </div>

    <!-- Motivational Quotes Presets -->
    <div class="form-group">
      <label class="form-label" for="input-quote-preset">
        <span>{{ t('quotePresetLabel') }}</span>
      </label>
      <select 
        id="input-quote-preset" 
        class="form-select" 
        @change="onQuotePresetChange"
      >
        <option value="">{{ t('selectQuotePrompt') }}</option>
        <option v-for="(q, idx) in activeQuotesList" :key="idx" :value="q">
          {{ q }}
        </option>
      </select>
    </div>

    <!-- Custom Quote -->
    <div class="form-group">
      <label class="form-label" for="input-custom-quote">
        <span>{{ t('customQuoteLabel') }}</span>
      </label>
      <input 
        id="input-custom-quote"
        type="text" 
        class="form-input" 
        v-model="formData.quote" 
        :placeholder="t('customQuotePlaceholder')"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue';
import { t, currentLang, quotePresets, countPresets } from '../utils/i18n';
import { compressImageFile } from '../utils/imageUtils';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  authState: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['notify', 'save-org-defaults', 'new-entry', 'switch-tab']);

const fileInput = ref(null);
const logoFileInput = ref(null);
const framerWindowRef = ref(null);

// Facebook PhotoCard styles
const templates = [
  { id: 'bancharampur-classic', nameKey: 'tplHero', icon: '🩸', descKey: 'tplHeroDesc' },
  { id: 'modern', nameKey: 'tplTribute', icon: '✨', descKey: 'tplTributeDesc' },
  { id: 'certificate', nameKey: 'tplCertificate', icon: '📜', descKey: 'tplCertificateDesc' },
  { id: 'story', nameKey: 'tplStory', icon: '📱', descKey: 'tplStoryDesc' },
  { id: 'minimal', nameKey: 'tplEditorial', icon: '📰', descKey: 'tplEditorialDesc' }
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const activeCountPresets = computed(() => {
  return countPresets[currentLang.value] || countPresets.en;
});

const activeQuotesList = computed(() => {
  return quotePresets[currentLang.value] || quotePresets.en;
});

const currentTemplateName = computed(() => {
  const found = templates.find(t => t.id === props.formData.templateId);
  return found ? t(found.nameKey) : '';
});

function selectTemplate(id) {
  props.formData.templateId = id;
}

function triggerFileInput() {
  if (fileInput.value) fileInput.value.click();
}

function triggerLogoInput() {
  if (logoFileInput.value) logoFileInput.value.click();
}

async function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    emit('notify', currentLang.value === 'bn' ? 'অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন!' : 'Please select an image file!');
    return;
  }

  try {
    const compressed = await compressImageFile(file, 1200, 1200, 0.88);
    props.formData.donorPhoto = compressed;
    props.formData.photoZoom = 1;
    props.formData.photoPanX = 0;
    props.formData.photoPanY = 0;
    emit('notify', t('toastPhotoLoaded'));
  } catch (err) {
    const reader = new FileReader();
    reader.onload = (event) => {
      props.formData.donorPhoto = event.target.result;
      props.formData.photoZoom = 1;
      props.formData.photoPanX = 0;
      props.formData.photoPanY = 0;
      emit('notify', t('toastPhotoLoaded'));
    };
    reader.readAsDataURL(file);
  }
}

async function handleLogoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const compressed = await compressImageFile(file, 600, 600, 0.92);
    props.formData.orgLogo = compressed;
    emit('notify', t('toastLogoLoaded'));
    if (props.authState.authenticated) {
      emit('save-org-defaults');
    }
  } catch (err) {
    const reader = new FileReader();
    reader.onload = (event) => {
      props.formData.orgLogo = event.target.result;
      emit('notify', t('toastLogoLoaded'));
      if (props.authState.authenticated) {
        emit('save-org-defaults');
      }
    };
    reader.readAsDataURL(file);
  }
}

function resetLogoToDefault() {
  props.formData.orgLogo = '';
  emit('notify', currentLang.value === 'bn' ? 'লোগো মুছে ফেলা হয়েছে!' : 'Logo removed!');
  if (props.authState.authenticated) {
    emit('save-org-defaults');
  }
}

// Interactive Direct Drag & Pan for Live Photo Framer
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let initialPanX = 0;
let initialPanY = 0;

function startDrag(e) {
  isDragging = true;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  initialPanX = props.formData.photoPanX || 0;
  initialPanY = props.formData.photoPanY || 0;

  window.addEventListener('mousemove', onDragging);
  window.addEventListener('mouseup', stopDrag);
}

function onDragging(e) {
  if (!isDragging) return;
  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;
  const zoom = props.formData.photoZoom || 1;
  props.formData.photoPanX = Math.round(initialPanX + (dx / zoom));
  props.formData.photoPanY = Math.round(initialPanY + (dy / zoom));
}

function stopDrag() {
  if (!isDragging) return;
  isDragging = false;
  window.removeEventListener('mousemove', onDragging);
  window.removeEventListener('mouseup', stopDrag);
}

function startTouchDrag(e) {
  if (!e.touches || e.touches.length === 0) return;
  isDragging = true;
  dragStartX = e.touches[0].clientX;
  dragStartY = e.touches[0].clientY;
  initialPanX = props.formData.photoPanX || 0;
  initialPanY = props.formData.photoPanY || 0;

  window.addEventListener('touchmove', onTouchDragging, { passive: false });
  window.addEventListener('touchend', stopTouchDrag);
}

function onTouchDragging(e) {
  if (!isDragging || !e.touches || e.touches.length === 0) return;
  if (e.cancelable) e.preventDefault();
  const dx = e.touches[0].clientX - dragStartX;
  const dy = e.touches[0].clientY - dragStartY;
  const zoom = props.formData.photoZoom || 1;
  props.formData.photoPanX = Math.round(initialPanX + (dx / zoom));
  props.formData.photoPanY = Math.round(initialPanY + (dy / zoom));
}

function stopTouchDrag() {
  if (!isDragging) return;
  isDragging = false;
  window.removeEventListener('touchmove', onTouchDragging);
  window.removeEventListener('touchend', stopTouchDrag);
}

onUnmounted(() => {
  window.removeEventListener('mousemove', onDragging);
  window.removeEventListener('mouseup', stopDrag);
  window.removeEventListener('touchmove', onTouchDragging);
  window.removeEventListener('touchend', stopTouchDrag);
});

function adjustZoom(amount) {
  let curr = props.formData.photoZoom || 1;
  let next = Math.max(0.5, Math.min(3.0, Math.round((curr + amount) * 100) / 100));
  props.formData.photoZoom = next;
}

function nudgePan(dx, dy) {
  props.formData.photoPanX = (props.formData.photoPanX || 0) + dx;
  props.formData.photoPanY = (props.formData.photoPanY || 0) + dy;
}

function removeDonorPhoto() {
  props.formData.donorPhoto = '';
  props.formData.photoZoom = 1;
  props.formData.photoPanX = 0;
  props.formData.photoPanY = 0;
}

function resetPhotoAlign() {
  props.formData.photoZoom = 1;
  props.formData.photoPanX = 0;
  props.formData.photoPanY = 0;
}

function onQuotePresetChange(e) {
  if (e.target.value) {
    props.formData.quote = e.target.value;
  }
}

function startNewDonorEntry() {
  // Clears ONLY personal details:
  // Keeps organization name, subtitle, slogan, quotes, logo, and chosen template!
  props.formData.id = '';
  props.formData.donorName = '';
  props.formData.bloodGroup = 'O+';
  props.formData.donationCount = currentLang.value === 'bn' ? '১ম বার' : '1st Time';
  props.formData.donationDate = new Date().toISOString().split('T')[0];
  props.formData.referenceName = '';
  props.formData.donorPhoto = '';
  props.formData.photoZoom = 1;
  props.formData.photoPanX = 0;
  props.formData.photoPanY = 0;
  emit('notify', t('toastClearedPersonal'));
}
</script>

<style scoped>
.editor-form-card {
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

@media (max-width: 1024px) {
  .editor-form-card {
    max-height: none;
  }
}

.title-action-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-new-entry {
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: var(--radius-sm);
}

/* Compact Template Section (Much smaller vertical height) */
.compact-template-section {
  margin-bottom: 1rem;
}

.compact-label {
  margin-bottom: 0.4rem;
}

.active-tpl-badge-compact {
  font-size: 0.72rem;
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  font-weight: 700;
}

[data-theme="dark"] .active-tpl-badge-compact {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  border-color: rgba(239, 68, 68, 0.4);
}

.templates-grid-compact {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.template-card-compact {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  background: var(--bg-card);
  border: 1px solid var(--input-border);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.template-card-compact:hover {
  background: #f1f5f9;
  color: var(--text-main);
  border-color: #ef4444;
}

[data-theme="dark"] .template-card-compact {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
}

[data-theme="dark"] .template-card-compact:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.template-card-compact.active {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  border-color: #ef4444;
  color: #fff;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
}

.tpl-icon-compact {
  font-size: 0.95rem;
}

/* Form Section Title */
.form-section-title {
  font-size: 0.92rem;
  font-weight: 700;
  color: #b91c1c;
  margin: 1.1rem 0 0.65rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid var(--border-glass);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
}

[data-theme="dark"] .form-section-title {
  color: #fca5a5;
}

.btn-save-org-mini {
  background: rgba(217, 119, 6, 0.1);
  border: 1px solid rgba(217, 119, 6, 0.3);
  color: #b45309;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  cursor: pointer;
  transition: var(--transition);
}

.btn-save-org-mini:hover {
  background: rgba(217, 119, 6, 0.2);
  border-color: #d97706;
}

[data-theme="dark"] .btn-save-org-mini {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: #fef08a;
}

/* Org Logo Control */
.org-logo-control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-card-hover);
  padding: 0.65rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-glass);
}

.org-logo-preview-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ef4444;
  background: #ffffff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.org-logo-thumb {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.org-logo-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.req {
  color: #ef4444;
}

.sel-blood-val {
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: #ef4444;
  font-size: 1rem;
}

.highlight-box {
  background: rgba(245, 158, 11, 0.06);
  border: 1px dashed rgba(245, 158, 11, 0.3);
  padding: 0.75rem;
  border-radius: var(--radius-md);
}

.input-hint {
  display: block;
  font-size: 0.75rem;
  color: var(--text-dim);
  margin-top: 0.35rem;
  line-height: 1.3;
}

.hidden-file-input {
  display: none;
}

.upload-icon {
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
}

.photo-upload-prompt {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
}

.upload-sub {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.photo-section-group {
  margin-top: 0.5rem;
}

.photo-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}

.photo-live-status {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
}

.btn-quick-preview-tab {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #b91c1c;
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-quick-preview-tab:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

[data-theme="dark"] .btn-quick-preview-tab {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.2);
}

/* Interactive Live Framing Box */
.interactive-framer-card {
  background: var(--bg-card-hover);
  border: 1px solid var(--border-glass);
  border-radius: var(--radius-lg);
  padding: 0.85rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.05);
}

.framer-header-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.framer-hint-tag {
  font-size: 0.74rem;
  font-weight: 700;
  color: #b91c1c;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

[data-theme="dark"] .framer-hint-tag {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.2);
}

.btn-framer-change {
  background: transparent;
  border: 1px solid var(--border-glass);
  color: var(--text-muted);
  font-size: 0.74rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
}

.btn-framer-change:hover {
  background: var(--bg-card);
  color: var(--text-main);
  border-color: #ef4444;
}

.framer-stage-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.25rem 0;
}

/* Matches the exact aspect ratio of the poster photo frame (250 / 310) */
.framer-window {
  position: relative;
  width: 220px;
  height: 272px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(239, 68, 68, 0.3);
  overflow: hidden;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
}

.framer-window:active {
  cursor: grabbing;
}

.framer-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  transform-origin: center center;
  will-change: transform;
}

/* Translucent face centering guide & rule of thirds */
.framer-grid-guide {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.grid-line {
  position: absolute;
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
}

.grid-v1 { left: 33.33%; top: 0; bottom: 0; width: 1px; }
.grid-v2 { left: 66.66%; top: 0; bottom: 0; width: 1px; }
.grid-h1 { top: 33.33%; left: 0; right: 0; height: 1px; }
.grid-h2 { top: 66.66%; left: 0; right: 0; height: 1px; }

.face-target-oval {
  position: absolute;
  top: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 105px;
  height: 135px;
  border-radius: 50%;
  border: 1.5px dashed rgba(239, 68, 68, 0.65);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.3);
}

.framer-controls-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.framer-ctrl-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
}

.ctrl-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}

.btn-step-zoom {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  color: var(--text-main);
  font-size: 1.05rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  flex-shrink: 0;
}

.btn-step-zoom:hover {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}

.framer-zoom-slider {
  flex: 1;
  min-width: 0;
}

.ctrl-val-pill {
  font-size: 0.75rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: #b90e17;
  background: rgba(239, 68, 68, 0.1);
  padding: 0.15rem 0.45rem;
  border-radius: 6px;
  min-width: 42px;
  text-align: center;
}

[data-theme="dark"] .ctrl-val-pill {
  color: #fca5a5;
  background: rgba(239, 68, 68, 0.2);
}

.framer-actions-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
}

.nudge-pad {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-nudge {
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
}

.btn-nudge:hover {
  background: var(--bg-card-hover);
  border-color: #ef4444;
  transform: translateY(-1px);
}

.framer-sub-btns {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.btn-remove-photo {
  color: #ef4444;
  padding: 0.35rem 0.6rem;
}

.btn-remove-photo:hover {
  background: #fee2e2;
  border-color: #ef4444;
}
</style>
