<template>
  <div class="app-root">
    <!-- Header -->
    <header class="app-header">
      <div class="brand-container">
        <div class="brand-icon-box">🩸</div>
        <div class="brand-text">
          <h1>{{ t('appTitle') }}</h1>
          <p class="brand-subtitle hide-on-mobile">{{ t('appSubtitle') }}</p>
        </div>
      </div>

      <div class="header-actions">
        <!-- Theme Switcher Button -->
        <button 
          class="btn btn-secondary btn-sm header-action-btn theme-toggle-btn" 
          @click="toggleTheme"
          id="btn-theme-toggle"
          :title="currentTheme === 'dark' ? (currentLang === 'bn' ? 'লাইট মোডে পরিবর্তন করুন' : 'Switch to Light Mode') : (currentLang === 'bn' ? 'ডার্ক মোডে পরিবর্তন করুন' : 'Switch to Dark Mode')"
        >
          <span class="theme-icon">{{ currentTheme === 'dark' ? '☀️' : '🌙' }}</span>
          <span class="theme-text hide-on-mobile">{{ currentTheme === 'dark' ? (currentLang === 'bn' ? 'লাইট' : 'Light') : (currentLang === 'bn' ? 'ডার্ক' : 'Dark') }}</span>
        </button>

        <!-- Language Switcher Button -->
        <button 
          class="btn btn-secondary btn-sm header-action-btn lang-toggle-btn" 
          @click="toggleAppLanguage"
          id="btn-language-toggle"
          :title="currentLang === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'"
        >
          <span class="lang-icon">🌐</span>
          <span class="lang-text hide-on-mobile">{{ currentLang === 'en' ? 'বাংলা' : 'English' }}</span>
          <span class="lang-text-short show-on-mobile">{{ currentLang === 'en' ? 'বাং' : 'EN' }}</span>
        </button>

        <!-- Records Button (Desktop only - mobile already has Records in bottom nav tabs) -->
        <button 
          class="btn btn-secondary btn-sm header-action-btn desktop-only-btn" 
          @click="showRecordsModal = true"
          id="btn-open-records"
        >
          <span>📁 {{ t('recordsTab') }}</span>
        </button>

        <!-- Auth Status Button -->
        <div 
          class="badge-auth-status" 
          :class="authState.authenticated ? 'logged-in' : 'guest'"
          @click="handleAuthClick"
          id="btn-auth-toggle"
          :title="authState.authenticated ? (authState.user?.name || authState.user?.username) : t('loginBtn')"
        >
          <span v-if="authState.authenticated" class="auth-name-tag">
            🟢 <span class="auth-name-text">{{ authState.user?.name || authState.user?.username }}</span>
          </span>
          <span v-else>
            ⚪ <span class="hide-on-mobile">{{ t('loginBtn') }}</span><span class="show-on-mobile">{{ currentLang === 'bn' ? 'লগইন' : 'Login' }}</span>
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
          <span>{{ authState.authenticated ? (currentLang === 'bn' ? 'প্রোফাইল' : 'Profile') : (currentLang === 'bn' ? 'লগইন' : 'Login') }}</span>
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

// Clean initial form state for production (No default dummy name, photo, or logo)
const formData = reactive({
  id: '',
  templateId: 'bancharampur-classic',
  orgName: '',
  orgSubtitle: '',
  orgLogo: '',
  slogan: '',
  heroQuote: '',
  quote: '',
  donorName: '',
  bloodGroup: 'O+',
  donationCount: '১ম বার',
  donationDate: new Date().toISOString().split('T')[0],
  referenceName: '',
  donorPhoto: '',
  photoZoom: 1,
  photoPanX: 0,
  photoPanY: 0,
  dateFormat: 'numeric'
});

// Theme system (Default: Light Mode)
const currentTheme = ref(localStorage.getItem('blood_app_theme') || 'light');

function applyTheme(theme) {
  currentTheme.value = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('blood_app_theme', theme);
}

function toggleTheme() {
  const next = currentTheme.value === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  if (currentLang.value === 'bn') {
    showToast(next === 'dark' ? '🌙 ডার্ক মোড চালু হয়েছে' : '☀️ লাইট মোড চালু হয়েছে');
  } else {
    showToast(next === 'dark' ? '🌙 Dark Mode activated' : '☀️ Light Mode activated');
  }
}

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
  // Ensure default Light theme or restored user preference is applied
  applyTheme(currentTheme.value);

  const auth = await api.checkAuth();
  authState.authenticated = auth.authenticated;
  authState.user = auth.user;

  // Restore user's saved organization settings ONLY IF logged in
  if (auth.authenticated && auth.user?.orgSettings) {
    applyUserOrgSettings(auth.user.orgSettings);
  } else {
    // Guest mode: ensure no information is saved or pre-filled
    formData.orgName = '';
    formData.orgSubtitle = '';
    formData.orgLogo = '';
    formData.slogan = '';
    formData.heroQuote = '';
    formData.quote = '';
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
  // Clear all data on logout so nothing remains stored in guest view
  formData.id = '';
  formData.orgName = '';
  formData.orgSubtitle = '';
  formData.orgLogo = '';
  formData.slogan = '';
  formData.heroQuote = '';
  formData.quote = '';
  formData.donorName = '';
  formData.donorPhoto = '';
  formData.referenceName = '';
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
  if (authState.user) {
    authState.user.orgSettings = { ...settings };
  }
  showToast(currentLang.value === 'bn' ? 'সংগঠন ও লোগোর তথ্য সেভ হয়েছে!' : 'Organization branding & defaults saved!');
}

async function saveDonorRecord() {
  const res = await api.saveRecord(formData);
  if (res.success) {
    formData.id = res.record.id;
    // Persist latest org defaults in logged in user state
    if (authState.user) {
      if (!authState.user.orgSettings) authState.user.orgSettings = {};
      authState.user.orgSettings.templateId = formData.templateId;
      authState.user.orgSettings.orgName = formData.orgName;
      authState.user.orgSettings.orgSubtitle = formData.orgSubtitle;
      authState.user.orgSettings.orgLogo = formData.orgLogo;
      authState.user.orgSettings.slogan = formData.slogan;
      authState.user.orgSettings.heroQuote = formData.heroQuote;
      authState.user.orgSettings.quote = formData.quote;
    }
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
.theme-toggle-btn,
.lang-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 700;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}

.theme-icon, .lang-icon {
  font-size: 0.95rem;
}

@media (max-width: 1023px) {
  .mobile-hidden {
    display: none !important;
  }
}
</style>
