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

    <div class="form-group">
      <div class="photo-upload-box" @click="triggerFileInput">
        <input 
          type="file" 
          ref="fileInput" 
          accept="image/*" 
          class="hidden-file-input" 
          @change="handlePhotoUpload"
        />
        <div v-if="formData.donorPhoto" class="photo-preview-wrap">
          <img :src="formData.donorPhoto" alt="Preview" class="photo-preview-thumbnail" />
          <p class="photo-upload-prompt">{{ t('changePhotoPrompt') }}</p>
        </div>
        <div v-else class="upload-placeholder">
          <div class="upload-icon">📸</div>
          <p class="photo-upload-prompt">{{ t('uploadPhotoPrompt') }}</p>
          <span class="upload-sub">{{ t('mobileUploadHint') }}</span>
        </div>
      </div>

      <!-- Photo Controls (Zoom & Pan) -->
      <div v-if="formData.donorPhoto" class="photo-adjustments">
        <div class="photo-controls-row">
          <label>{{ t('zoomLabel') }}</label>
          <input 
            type="range" 
            min="0.8" 
            max="2.5" 
            step="0.05" 
            v-model.number="formData.photoZoom" 
          />
          <span class="ctrl-val">{{ Math.round((formData.photoZoom || 1) * 100) }}%</span>
        </div>

        <div class="photo-controls-row">
          <label>{{ t('panYLabel') }}</label>
          <input 
            type="range" 
            min="-100" 
            max="100" 
            step="2" 
            v-model.number="formData.photoPanY" 
          />
          <button type="button" class="btn btn-secondary btn-sm" @click="resetPhotoAlign">
            {{ t('resetAlign') }}
          </button>
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
          <img :src="formData.orgLogo || defaultOrgLogo" alt="Org Logo" class="org-logo-thumb" />
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
            v-if="formData.orgLogo && formData.orgLogo !== defaultOrgLogo" 
            type="button" 
            class="btn btn-secondary btn-sm" 
            @click="resetLogoToDefault"
          >
            🔄 {{ t('resetLogoPrompt') }}
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
import { ref, computed } from 'vue';
import { t, currentLang, quotePresets, countPresets } from '../utils/i18n';
import { compressImageFile } from '../utils/imageUtils';
import defaultOrgLogo from '../assets/default_org_logo.png';

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

const emit = defineEmits(['notify', 'save-org-defaults', 'new-entry']);

const fileInput = ref(null);
const logoFileInput = ref(null);

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
  props.formData.orgLogo = defaultOrgLogo;
  emit('notify', currentLang.value === 'bn' ? 'ডিফল্ট লোগো রিসেট হয়েছে!' : 'Reset to default logo!');
  if (props.authState.authenticated) {
    emit('save-org-defaults');
  }
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
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(239, 68, 68, 0.4);
  font-weight: 700;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
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
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-color: rgba(239, 68, 68, 0.4);
}

.template-card-compact.active {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(185, 28, 28, 0.5));
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
  color: #fca5a5;
  margin: 1.1rem 0 0.65rem;
  padding-bottom: 0.35rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
}

.btn-save-org-mini {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fef08a;
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  cursor: pointer;
  transition: var(--transition);
}

.btn-save-org-mini:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: #fef08a;
}

/* Org Logo Control */
.org-logo-control-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.65rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  color: #f8fafc;
}

.upload-sub {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.photo-adjustments {
  margin-top: 0.5rem;
}

.ctrl-val {
  font-size: 0.75rem;
  font-family: 'Outfit', sans-serif;
  color: #cbd5e1;
  min-width: 40px;
}
</style>
