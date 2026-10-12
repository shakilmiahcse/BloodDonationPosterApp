<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content auth-modal">
      <div class="card-title-row">
        <h2>
          <span>🔐</span> {{ t('authModalTitle') }}
        </h2>
        <button class="btn btn-secondary btn-icon btn-sm" @click="$emit('close')">✕</button>
      </div>

      <!-- Tab Switcher: Login vs Register -->
      <div class="auth-tabs">
        <button 
          type="button" 
          class="auth-tab-btn" 
          :class="{ active: activeTab === 'login' }"
          @click="switchTab('login')"
          id="tab-auth-login"
        >
          {{ t('loginTabTitle') }}
        </button>
        <button 
          type="button" 
          class="auth-tab-btn" 
          :class="{ active: activeTab === 'register' }"
          @click="switchTab('register')"
          id="tab-auth-register"
        >
          {{ t('registerTabTitle') }}
        </button>
      </div>

      <p class="auth-intro">
        {{ activeTab === 'login' ? t('loginIntro') : t('registerIntro') }}
      </p>

      <!-- LOGIN FORM -->
      <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label class="form-label" for="login-username">{{ t('usernameLabel') }}</label>
          <input 
            id="login-username"
            type="text" 
            class="form-input" 
            v-model="loginUsername" 
            :placeholder="t('usernameLabel')"
            autocomplete="username"
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="login-password">{{ t('passwordLabel') }}</label>
          <input 
            id="login-password"
            type="password" 
            class="form-input" 
            v-model="loginPassword" 
            placeholder="••••••••"
            autocomplete="current-password"
            required 
          />
        </div>

        <div v-if="errorMsg" class="auth-error-box">
          ⚠️ {{ errorMsg }}
        </div>

        <div class="auth-modal-actions">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">{{ t('cancelBtn') }}</button>
          <button type="submit" class="btn btn-primary" :disabled="loading" id="btn-submit-login">
            <span v-if="!loading">{{ t('submitLogin') }}</span>
            <span v-else>...</span>
          </button>
        </div>

        <div class="switch-prompt">
          <span>{{ currentLang === 'bn' ? 'অ্যাকাউন্ট নেই?' : "Don't have an account?" }}</span>
          <button type="button" class="link-btn" @click="switchTab('register')">
            {{ currentLang === 'bn' ? 'নতুন রেজিস্ট্রেশন করুন' : 'Register Now' }}
          </button>
        </div>
      </form>

      <!-- REGISTER FORM -->
      <form v-else @submit.prevent="handleRegister" class="auth-form">
        <div class="form-group">
          <label class="form-label" for="reg-name">{{ t('fullNameLabel') }}</label>
          <input 
            id="reg-name"
            type="text" 
            class="form-input" 
            v-model="regName" 
            :placeholder="currentLang === 'bn' ? 'উদা: মোঃ আরিফুল ইসলাম' : 'e.g. John Organizer'"
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-username">{{ t('usernameLabel') }}</label>
          <input 
            id="reg-username"
            type="text" 
            class="form-input" 
            v-model="regUsername" 
            :placeholder="currentLang === 'bn' ? 'ইউজারনেম (ছোট হাতের অক্ষরে)' : 'Username (lowercase)'"
            autocomplete="username"
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-password">{{ t('passwordLabel') }}</label>
          <input 
            id="reg-password"
            type="password" 
            class="form-input" 
            v-model="regPassword" 
            placeholder="•••••••• (Min 4 characters)"
            autocomplete="new-password"
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="reg-org">
            <span>{{ t('orgNameOptionalLabel') }}</span>
            <span class="optional-tag">{{ t('referenceOptional') }}</span>
          </label>
          <input 
            id="reg-org"
            type="text" 
            class="form-input" 
            v-model="regOrgName" 
            :placeholder="currentLang === 'bn' ? 'উদা: বাঞ্ছারামপুর ব্লাড ব্যাংক' : 'e.g. Bancharampur Blood Bank'"
          />
        </div>

        <div v-if="errorMsg" class="auth-error-box">
          ⚠️ {{ errorMsg }}
        </div>

        <div class="auth-modal-actions">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">{{ t('cancelBtn') }}</button>
          <button type="submit" class="btn btn-primary" :disabled="loading" id="btn-submit-register">
            <span v-if="!loading">{{ t('submitRegister') }}</span>
            <span v-else>...</span>
          </button>
        </div>

        <div class="switch-prompt">
          <span>{{ currentLang === 'bn' ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'Already have an account?' }}</span>
          <button type="button" class="link-btn" @click="switchTab('login')">
            {{ currentLang === 'bn' ? 'এখানে লগইন করুন' : 'Log in here' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../utils/api';
import { t, currentLang } from '../utils/i18n';

const props = defineProps({
  initialTab: {
    type: String,
    default: 'login'
  }
});

const emit = defineEmits(['close', 'auth-success', 'notify']);

const activeTab = ref(props.initialTab);
const loading = ref(false);
const errorMsg = ref('');

// Completely empty defaults - no prefilled username or password
const loginUsername = ref('');
const loginPassword = ref('');

const regName = ref('');
const regUsername = ref('');
const regPassword = ref('');
const regOrgName = ref('');

function switchTab(tab) {
  activeTab.value = tab;
  errorMsg.value = '';
}

async function handleLogin() {
  loading.value = true;
  errorMsg.value = '';

  try {
    const res = await api.login(loginUsername.value.trim(), loginPassword.value);
    if (res.success) {
      emit('auth-success', res.user);
      emit('notify', currentLang.value === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Login successful!');
      emit('close');
    } else {
      errorMsg.value = res.message || 'Invalid username or password.';
    }
  } catch (err) {
    errorMsg.value = 'Login error. Please try again.';
  } finally {
    loading.value = false;
  }
}

async function handleRegister() {
  loading.value = true;
  errorMsg.value = '';

  try {
    const res = await api.register({
      name: regName.value.trim(),
      username: regUsername.value.trim(),
      password: regPassword.value,
      orgName: regOrgName.value.trim()
    });
    if (res.success) {
      emit('auth-success', res.user);
      emit('notify', currentLang.value === 'bn' ? 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!' : 'Account created successfully!');
      emit('close');
    } else {
      errorMsg.value = res.message || 'Registration failed.';
    }
  } catch (err) {
    errorMsg.value = 'Registration error. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.auth-modal {
  max-width: 440px;
}

.auth-tabs {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
  padding: 0.25rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.auth-tab-btn {
  flex: 1;
  padding: 0.55rem 0.5rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-family: inherit;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
}

.auth-tab-btn.active {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  color: #fff;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.auth-intro {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.2rem;
  line-height: 1.4;
}

.auth-error-box {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.auth-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.switch-prompt {
  text-align: center;
  font-size: 0.8rem;
  color: var(--text-dim);
  margin-top: 1.2rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.link-btn {
  background: none;
  border: none;
  color: #fca5a5;
  font-weight: 700;
  cursor: pointer;
  margin-left: 0.4rem;
  text-decoration: underline;
}

.link-btn:hover {
  color: #fff;
}
</style>
