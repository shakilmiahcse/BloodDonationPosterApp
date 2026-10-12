<template>
  <div class="app-root">
    <!-- Header -->
    <header class="app-header">
      <div class="brand-container">
        <div class="brand-icon-box">🩸</div>
        <div class="brand-text">
          <h1>রক্তদান পোস্টার মেকার</h1>
          <p>ব্লাড ডোনেশন পোস্টার ও রেকর্ড সিস্টেম</p>
        </div>
      </div>

      <div class="header-actions">
        <!-- Records Button -->
        <button 
          class="btn btn-secondary btn-sm" 
          @click="showRecordsModal = true"
          id="btn-open-records"
        >
          <span>📁 রেকর্ডস</span>
        </button>

        <!-- Auth Status Button -->
        <div 
          class="badge-auth-status" 
          :class="authState.authenticated ? 'logged-in' : 'guest'"
          @click="handleAuthClick"
          id="btn-auth-toggle"
        >
          <span v-if="authState.authenticated">
            🟢 অ্যাডমিন ({{ authState.user?.name || 'লগআউট' }})
          </span>
          <span v-else>
            ⚪ গেস্ট (লগইন)
          </span>
        </div>
      </div>
    </header>

    <!-- Mobile Nav Tabs -->
    <div class="app-container">
      <nav class="mobile-nav-tabs">
        <button 
          class="mobile-tab-btn" 
          :class="{ active: activeMobileTab === 'editor' }"
          @click="activeMobileTab = 'editor'"
          id="tab-btn-editor"
        >
          <span>✏️</span>
          <span>এডিটর</span>
        </button>

        <button 
          class="mobile-tab-btn" 
          :class="{ active: activeMobileTab === 'preview' }"
          @click="activeMobileTab = 'preview'"
          id="tab-btn-preview"
        >
          <span>👁️</span>
          <span>পোস্টার প্রিভিউ</span>
        </button>

        <button 
          class="mobile-tab-btn" 
          @click="showRecordsModal = true"
          id="tab-btn-records"
        >
          <span>📁</span>
          <span>রেকর্ডস</span>
        </button>

        <button 
          class="mobile-tab-btn" 
          @click="handleAuthClick"
          id="tab-btn-auth"
        >
          <span>{{ authState.authenticated ? '👤' : '🔐' }}</span>
          <span>{{ authState.authenticated ? 'অ্যাকাউন্ট' : 'লগইন' }}</span>
        </button>
      </nav>

      <!-- Main Columns -->
      <!-- Editor Column -->
      <section 
        class="editor-column" 
        :class="{ 'mobile-hidden': activeMobileTab !== 'editor' }"
      >
        <EditorForm 
          :formData="formData" 
          @notify="showToast" 
        />
      </section>

      <!-- Preview Column -->
      <section 
        class="preview-column" 
        :class="{ 'mobile-hidden': activeMobileTab !== 'preview' }"
      >
        <PosterPreview 
          :formData="formData" 
          :authState="authState" 
          @save-record="saveDonorRecord" 
          @open-login="openLoginWithMessage"
          @notify="showToast"
        />
      </section>
    </div>

    <!-- Modals -->
    <LoginModal 
      v-if="showLoginModal" 
      :message="loginModalMsg"
      @close="showLoginModal = false"
      @login-success="onLoginSuccess"
      @notify="showToast"
    />

    <RecordsDrawer 
      v-if="showRecordsModal" 
      :authState="authState"
      @close="showRecordsModal = false"
      @open-login="openLoginWithMessage"
      @load-record="loadRecord"
      @notify="showToast"
    />

    <!-- Toast Notification Container -->
    <div class="toast-container" v-if="toasts.length > 0">
      <div v-for="t in toasts" :key="t.id" class="toast">
        {{ t.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import EditorForm from './components/EditorForm.vue';
import PosterPreview from './components/PosterPreview.vue';
import LoginModal from './components/LoginModal.vue';
import RecordsDrawer from './components/RecordsDrawer.vue';
import { api } from './utils/api';

const activeMobileTab = ref('preview'); // Default to preview so user sees the impressive poster right away!
const showLoginModal = ref(false);
const showRecordsModal = ref(false);
const loginModalMsg = ref('');

const authState = reactive({
  authenticated: false,
  user: null
});

// Form state initialized with the sample image details provided by user
const formData = reactive({
  id: '',
  templateId: 'bancharampur-classic', // Default template matching sample
  orgName: 'BANCHARAMPUR BLOOD BANK',
  orgSubtitle: 'বাঞ্ছারামপুর ব্লাড ব্যাংক',
  slogan: 'রক্ত দেওয়ার জন্যেই আমরা',
  heroQuote: 'রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে',
  quote: 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার',
  donorName: 'মোঃ জামাল উদ্দিন',
  bloodGroup: 'O+',
  donationCount: '১ম বার',
  donationDate: '2026-10-07',
  referenceName: 'বাঞ্ছারামপুর ব্লাড ব্যাংক', // Optional reference
  donorPhoto: '/sample_donor.jfif',
  photoZoom: 1,
  photoPanX: 0,
  photoPanY: 0,
  dateFormat: 'numeric'
});

// Toasts
const toasts = ref([]);
function showToast(text) {
  const id = Date.now() + Math.random();
  toasts.value.push({ id, text });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 3500);
}

onMounted(async () => {
  const auth = await api.checkAuth();
  authState.authenticated = auth.authenticated;
  authState.user = auth.user;
});

function handleAuthClick() {
  if (authState.authenticated) {
    if (confirm('আপনি কি লগআউট করতে চান?')) {
      api.logout();
      authState.authenticated = false;
      authState.user = null;
      showToast('লগআউট সফল হয়েছে। এখন গেস্ট মোডে আছেন।');
    }
  } else {
    loginModalMsg.value = 'ডোনারদের ডাটা সার্ভারের records.json ফাইলে সংরক্ষণ এবং রেকর্ড লিস্ট দেখতে লগইন করুন।';
    showLoginModal.value = true;
  }
}

function openLoginWithMessage(msg) {
  loginModalMsg.value = msg || '';
  showLoginModal.value = true;
}

function onLoginSuccess(user) {
  authState.authenticated = true;
  authState.user = user;
}

async function saveDonorRecord() {
  const res = await api.saveRecord(formData);
  if (res.success) {
    formData.id = res.record.id;
    showToast('✅ রক্তদাতার রেকর্ড records.json ফাইলে সফলভাবে সংরক্ষিত হয়েছে!');
  } else {
    showToast('⚠️ ' + (res.message || 'সেভ করা সম্ভব হয়নি।'));
  }
}

function loadRecord(rec) {
  formData.id = rec.id || '';
  formData.templateId = rec.templateId || 'bancharampur-classic';
  formData.donorName = rec.donorName || '';
  formData.bloodGroup = rec.bloodGroup || 'O+';
  formData.donationCount = rec.donationCount || '১ম বার';
  formData.donationDate = rec.donationDate || '';
  formData.referenceName = rec.referenceName || '';
  formData.orgName = rec.orgName || 'BANCHARAMPUR BLOOD BANK';
  formData.orgSubtitle = rec.orgSubtitle || 'বাঞ্ছারামপুর ব্লাড ব্যাংক';
  formData.slogan = rec.slogan || 'রক্ত দেওয়ার জন্যেই আমরা';
  formData.heroQuote = rec.heroQuote || 'রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে';
  formData.quote = rec.quote || 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার';
  if (rec.donorPhoto) {
    formData.donorPhoto = rec.donorPhoto;
  }
  activeMobileTab.value = 'preview';
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .mobile-hidden {
    display: none !important;
  }
}
</style>
