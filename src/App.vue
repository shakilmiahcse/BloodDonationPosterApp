<template>
  <div class="app-root">
    <!-- Header -->
    <header class="app-header">
      <div class="brand-container">
        <div class="brand-icon-box">🩸</div>
        <div class="brand-text">
          <h1>{{ t('appTitle') }}</h1>
          <p>{{ t('appSubtitle') }}</p>
        </div>
      </div>

      <div class="header-actions">
        <!-- Language Switcher Button (Default: English) -->
        <button 
          class="btn btn-secondary btn-sm lang-toggle-btn" 
          @click="toggleAppLanguage"
          id="btn-language-toggle"
          :title="currentLang === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'"
        >
          <span class="lang-icon">🌐</span>
          <span class="lang-text">{{ currentLang === 'en' ? 'বাংলা' : 'English' }}</span>
        </button>

        <!-- Records Button -->
        <button 
          class="btn btn-secondary btn-sm" 
          @click="showRecordsModal = true"
          id="btn-open-records"
        >
          <span>📁 {{ t('recordsTab') }}</span>
        </button>

        <!-- Auth Status Button (Compact, doesn't immediately log out on click) -->
        <div 
          class="badge-auth-status" 
          :class="authState.authenticated ? 'logged-in' : 'guest'"
          @click="handleAuthClick"
          id="btn-auth-toggle"
        >
          <span v-if="authState.authenticated">
            🟢 {{ authState.user?.name || authState.user?.username }}
          </span>
          <span v-else>
            ⚪ {{ t('loginBtn') }}
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
          <span>{{ t('editorTab') }}</span>
        </button>

        <button 
          class="mobile-tab-btn" 
          :class="{ active: activeMobileTab === 'preview' }"
          @click="activeMobileTab = 'preview'"
          id="tab-btn-preview"
        >
          <span>👁️</span>
          <span>{{ t('previewTab') }}</span>
        </button>

        <button 
          class="mobile-tab-btn" 
          @click="showRecordsModal = true"
          id="tab-btn-records"
        >
          <span>📁</span>
          <span>{{ t('recordsTab') }}</span>
        </button>

        <button 
          class="mobile-tab-btn" 
          @click="handleAuthClick"
          id="tab-btn-auth"
        >
          <span>{{ authState.authenticated ? '👤' : '🔐' }}</span>
          <span>{{ authState.authenticated ? t('profileBtn') : t('loginTab') }}</span>
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
          :authState="authState"
          @save-org-defaults="saveOrgDefaults"
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
          @open-auth="openAuthModal"
          @notify="showToast"
        />
      </section>
    </div>

    <!-- Auth Modal (Registration & Login) -->
    <AuthModal 
      v-if="showAuthModal" 
      :initialTab="authModalTab"
      @close="showAuthModal = false"
      @auth-success="onAuthSuccess"
      @notify="showToast"
    />

    <!-- User Profile & Settings Menu (Opens when clicking user badge) -->
    <UserMenuModal
      v-if="showUserMenu && authState.authenticated"
      :user="authState.user || {}"
      :orgName="formData.orgName"
      @close="showUserMenu = false"
      @logout="performLogout"
      @save-defaults="saveOrgDefaults"
    />

    <!-- Records Drawer Modal -->
    <RecordsDrawer 
      v-if="showRecordsModal" 
      :authState="authState"
      @close="showRecordsModal = false"
      @open-auth="openAuthModal('login')"
      @load-record="loadRecord"
      @notify="showToast"
    />

    <!-- Toast Notification Container -->
    <div class="toast-container" v-if="toasts.length > 0">
      <div v-for="tItem in toasts" :key="tItem.id" class="toast">
        {{ tItem.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import EditorForm from './components/EditorForm.vue';
import PosterPreview from './components/PosterPreview.vue';
import AuthModal from './components/AuthModal.vue';
import UserMenuModal from './components/UserMenuModal.vue';
import RecordsDrawer from './components/RecordsDrawer.vue';
import { api } from './utils/api';
import { t, currentLang, toggleLanguage } from './utils/i18n';

const activeMobileTab = ref('preview');
const showAuthModal = ref(false);
const showUserMenu = ref(false);
const authModalTab = ref('login');
const showRecordsModal = ref(false);

const authState = reactive({
  authenticated: false,
  user: null
});

// Initial form state with true organization name and logo
const defaultOrgLogo = '/default_org_logo.png';

const formData = reactive({
  id: '',
  templateId: 'bancharampur-classic',
  orgName: 'চরশিবপুর উত্তরপাড়া মানবসেবা যুব সংঘ',
  orgSubtitle: '',
  orgLogo: defaultOrgLogo,
  slogan: 'মানবতার সেবায় রক্তদান',
  heroQuote: 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে',
  quote: 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার',
  donorName: 'মোঃ জামাল উদ্দিন',
  bloodGroup: 'O+',
  donationCount: '১ম বার',
  donationDate: '2026-10-07',
  referenceName: '', // Empty by default
  donorPhoto: '/sample_donor.jfif',
  photoZoom: 1,
  photoPanX: 0,
  photoPanY: 0,
  dateFormat: 'numeric'
});

// Toast system
const toasts = ref([]);
function showToast(text) {
  const id = Date.now() + Math.random();
  toasts.value.push({ id, text });
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  }, 3500);
}

function toggleAppLanguage() {
  toggleLanguage();
  showToast(currentLang.value === 'en' ? 'Switched to English' : 'বাংলা ভাষায় পরিবর্তিত হয়েছে');
}

onMounted(async () => {
  const auth = await api.checkAuth();
  authState.authenticated = auth.authenticated;
  authState.user = auth.user;

  // Restore user's saved organization settings and logo
  if (auth.authenticated && auth.user?.orgSettings) {
    applyUserOrgSettings(auth.user.orgSettings);
  }
});

function applyUserOrgSettings(settings) {
  if (!settings) return;
  if (settings.templateId) formData.templateId = settings.templateId;
  if (settings.orgName) formData.orgName = settings.orgName;
  if (settings.orgSubtitle) formData.orgSubtitle = settings.orgSubtitle;
  if (settings.orgLogo) formData.orgLogo = settings.orgLogo;
  if (settings.slogan) formData.slogan = settings.slogan;
  if (settings.heroQuote) formData.heroQuote = settings.heroQuote;
  if (settings.quote) formData.quote = settings.quote;
}

function handleAuthClick() {
  if (authState.authenticated) {
    // DO NOT logout directly! Open user profile & settings menu modal
    showUserMenu.value = true;
  } else {
    authModalTab.value = 'login';
    showAuthModal.value = true;
  }
}

function performLogout() {
  api.logout();
  authState.authenticated = false;
  authState.user = null;
  showToast(t('toastLoggedOut'));
}

function openAuthModal(tab = 'login') {
  authModalTab.value = tab;
  showAuthModal.value = true;
}

function onAuthSuccess(user) {
  authState.authenticated = true;
  authState.user = user;
  if (user?.orgSettings) {
    applyUserOrgSettings(user.orgSettings);
  }
}

async function saveOrgDefaults() {
  const settings = {
    templateId: formData.templateId,
    orgName: formData.orgName,
    orgSubtitle: formData.orgSubtitle,
    orgLogo: formData.orgLogo,
    slogan: formData.slogan,
    heroQuote: formData.heroQuote,
    quote: formData.quote
  };
  await api.saveSettings(settings);
  showToast(currentLang.value === 'bn' ? 'সংগঠন ও লোগোর তথ্য সেভ হয়েছে!' : 'Organization branding & defaults saved!');
}

async function saveDonorRecord() {
  const res = await api.saveRecord(formData);
  if (res.success) {
    formData.id = res.record.id;
    showToast(t('toastSaved'));
  } else {
    showToast(res.message || 'Failed to save record.');
  }
}

function loadRecord(rec) {
  formData.id = rec.id || '';
  formData.templateId = rec.templateId || 'bancharampur-classic';
  formData.donorName = rec.donorName || '';
  formData.bloodGroup = rec.bloodGroup || 'O+';
  formData.donationCount = rec.donationCount || '1st Time';
  formData.donationDate = rec.donationDate || '';
  formData.referenceName = rec.referenceName || '';
  if (rec.orgName) formData.orgName = rec.orgName;
  if (rec.orgSubtitle) formData.orgSubtitle = rec.orgSubtitle;
  if (rec.orgLogo) formData.orgLogo = rec.orgLogo;
  if (rec.slogan) formData.slogan = rec.slogan;
  if (rec.heroQuote) formData.heroQuote = rec.heroQuote;
  if (rec.quote) formData.quote = rec.quote;
  if (rec.donorPhoto) {
    formData.donorPhoto = rec.donorPhoto;
  }
  activeMobileTab.value = 'preview';
}
</script>

<style scoped>
.lang-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.lang-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: #ef4444;
}

@media (max-width: 1023px) {
  .mobile-hidden {
    display: none !important;
  }
}
</style>
