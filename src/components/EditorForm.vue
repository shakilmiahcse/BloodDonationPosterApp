<template>
  <div class="glass-card editor-form-card">
    <div class="card-title-row">
      <h2><span>🎨</span> পোস্টার এডিটর</h2>
      <span class="active-tpl-badge">{{ currentTemplateName }}</span>
    </div>

    <!-- Template Selector Section -->
    <div class="form-group">
      <label class="form-label">
        <span>১. টেমপ্লেট নির্বাচন করুন</span>
        <span class="optional-tag">৫টি স্টাইল</span>
      </label>

      <div class="templates-grid">
        <div 
          v-for="tpl in templates" 
          :key="tpl.id"
          class="template-card"
          :class="{ active: formData.templateId === tpl.id }"
          @click="selectTemplate(tpl.id)"
          :id="'tpl-select-' + tpl.id"
        >
          <div class="template-thumb-icon">{{ tpl.icon }}</div>
          <div class="template-title">{{ tpl.name }}</div>
          <div class="template-badge">{{ tpl.desc }}</div>
        </div>
      </div>
    </div>

    <!-- Donor Information Section -->
    <div class="form-section-title">
      <span>👤 রক্তদাতার বিবরণ</span>
    </div>

    <!-- Donor Name -->
    <div class="form-group">
      <label class="form-label" for="input-donor-name">
        <span>রক্তদাতার নাম <strong class="req">*</strong></span>
      </label>
      <input 
        id="input-donor-name"
        type="text" 
        class="form-input" 
        v-model="formData.donorName" 
        placeholder="উদা: মোঃ জামাল উদ্দিন"
      />
    </div>

    <!-- Blood Group Picker -->
    <div class="form-group">
      <label class="form-label">
        <span>রক্তের গ্রুপ <strong class="req">*</strong></span>
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
        <span>রক্তদানের সংখ্যা / কততম বার</span>
      </label>
      <div class="count-chips-container">
        <button 
          v-for="c in countPresets" 
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
        placeholder="কাস্টম লিখুন: উদা: ১মবার, ১০মবার..."
      />
    </div>

    <!-- Donation Date -->
    <div class="form-group">
      <label class="form-label" for="input-date">
        <span>রক্তদানের তারিখ</span>
      </label>
      <input 
        id="input-date"
        type="date" 
        class="form-input" 
        v-model="formData.donationDate"
      />
    </div>

    <!-- Optional Reference Name (Requested specifically by user) -->
    <div class="form-group highlight-box">
      <label class="form-label" for="input-reference">
        <span>🤝 রেফারেন্স / সহযোগিতায় নাম</span>
        <span class="optional-tag">ঐচ্ছিক (Optional)</span>
      </label>
      <input 
        id="input-reference"
        type="text" 
        class="form-input" 
        v-model="formData.referenceName" 
        placeholder="উদা: বাঞ্ছারামপুর ব্লাড ব্যাংক টিম / ডাঃ তরিকুল ইসলাম"
      />
      <span class="input-hint">পোস্টারের নিচে রেফারেন্স বা আয়োজকের নাম প্রদর্শিত হবে। ফাঁকা রাখলে দেখানো হবে না।</span>
    </div>

    <!-- Donor Photo Upload & Adjust -->
    <div class="form-section-title">
      <span>📷 রক্তদাতার ছবি</span>
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
          <p class="photo-upload-prompt">ছবি পরিবর্তন করতে ক্লিক করুন</p>
        </div>
        <div v-else class="upload-placeholder">
          <div class="upload-icon">📸</div>
          <p class="photo-upload-prompt">ছবি নির্বাচন করুন (ক্যামেরা বা গ্যালারি)</p>
          <span class="upload-sub">মোবাইল থেকে সরাসরি ছবি আপলোড করা যাবে</span>
        </div>
      </div>

      <!-- Photo Controls (Zoom & Pan) -->
      <div v-if="formData.donorPhoto" class="photo-adjustments">
        <div class="photo-controls-row">
          <label>জুম:</label>
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
          <label>উপরে/নিচে:</label>
          <input 
            type="range" 
            min="-100" 
            max="100" 
            step="2" 
            v-model.number="formData.photoPanY" 
          />
          <button class="btn btn-secondary btn-sm" @click="resetPhotoAlign">রিসেট</button>
        </div>
      </div>
    </div>

    <!-- Organization & Motivational Quotes Section -->
    <div class="form-section-title">
      <span>🏛️ সংগঠন ও অনুপ্রেরণামূলক বাণী</span>
    </div>

    <div class="form-group">
      <label class="form-label" for="input-quote-preset">
        <span>অনুপ্রেরণামূলক উক্তি নির্বাচন</span>
      </label>
      <select 
        id="input-quote-preset" 
        class="form-select" 
        @change="onQuotePresetChange"
      >
        <option value="">উক্তি পছন্দ করুন...</option>
        <option v-for="(q, idx) in quotesList" :key="idx" :value="q">
          {{ q }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label" for="input-custom-quote">
        <span>উক্তি / স্লোগান (কাস্টম)</span>
      </label>
      <input 
        id="input-custom-quote"
        type="text" 
        class="form-input" 
        v-model="formData.quote" 
        placeholder="রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার"
      />
    </div>

    <div class="form-group">
      <label class="form-label" for="input-org-name">
        <span>সংস্থার নাম (ইংরেজি)</span>
      </label>
      <input 
        id="input-org-name"
        type="text" 
        class="form-input" 
        v-model="formData.orgName" 
        placeholder="BANCHARAMPUR BLOOD BANK"
      />
    </div>

    <div class="form-group">
      <label class="form-label" for="input-org-bn">
        <span>সংস্থার নাম (বাংলা)</span>
      </label>
      <input 
        id="input-org-bn"
        type="text" 
        class="form-input" 
        v-model="formData.orgSubtitle" 
        placeholder="বাঞ্ছারামপুর ব্লাড ব্যাংক"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['notify']);

const fileInput = ref(null);

const templates = [
  { id: 'bancharampur-classic', name: 'বাঞ্ছারামপুর ক্লাসিক', icon: '🩸', desc: 'অরিজিনাল স্যাম্পল' },
  { id: 'modern', name: 'মডার্ন ক্রিস্টাল', icon: '✨', desc: 'ডার্ক ও নিয়ন' },
  { id: 'certificate', name: 'সম্মাননা সনদ', icon: '📜', desc: 'কৃতজ্ঞতা স্মারক' },
  { id: 'story', name: 'সোশ্যাল স্টোরি', icon: '📱', desc: 'WhatsApp & FB' },
  { id: 'minimal', name: 'মিনিমাল ক্লিন', icon: '🤍', desc: 'প্রিন্ট ও সিম্পল' }
];

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const countPresets = [
  '১ম বার', '২য় বার', '৩য় বার', '৪র্থ বার', '৫ম বার', '১০ম বার', '২৫তম বার', '৫০তম বার'
];

const quotesList = [
  'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার',
  'রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে',
  'আপনার রক্তে বাঁচুক একটি মূল্যবান প্রাণ',
  'রক্ত দিন, জীবন বাঁচান - মানবতার সেবায় এগিয়ে আসুন',
  'এক ব্যাগ রক্ত, একটি সুন্দর হাসিমুখ',
  'রক্তদানের চেয়ে বড় মানবসেবা আর নেই'
];

const currentTemplateName = computed(() => {
  const found = templates.find(t => t.id === props.formData.templateId);
  return found ? found.name : 'ক্লাসিক';
});

function selectTemplate(id) {
  props.formData.templateId = id;
}

function triggerFileInput() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    emit('notify', 'অনুগ্রহ করে একটি ছবি ফাইল নির্বাচন করুন!');
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    props.formData.donorPhoto = event.target.result;
    props.formData.photoZoom = 1;
    props.formData.photoPanX = 0;
    props.formData.photoPanY = 0;
    emit('notify', 'ছবি সফলভাবে লোড হয়েছে!');
  };
  reader.readAsDataURL(file);
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

.active-tpl-badge {
  font-size: 0.75rem;
  background: rgba(220, 38, 38, 0.2);
  color: #fca5a5;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(220, 38, 38, 0.35);
  font-weight: 700;
}

.form-section-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #fca5a5;
  margin: 1.25rem 0 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
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
  font-size: 0.7rem;
  color: var(--text-dim);
  margin-top: 0.35rem;
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
