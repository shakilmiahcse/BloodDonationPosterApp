<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content login-modal">
      <div class="card-title-row">
        <h2>
          <span>🔐</span> অ্যাডমিন লগইন
        </h2>
        <button class="btn btn-secondary btn-icon btn-sm" @click="$emit('close')">✕</button>
      </div>

      <p class="login-intro">
        {{ message || 'ডোনারদের ডাটা সার্ভারের records.json ফাইলে সংরক্ষণ এবং রেকর্ড লিস্ট দেখতে লগইন করুন।' }}
      </p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label class="form-label" for="login-username">ইউজারনেম</label>
          <input 
            id="login-username"
            type="text" 
            class="form-input" 
            v-model="username" 
            placeholder="admin"
            required 
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="login-password">পাসওয়ার্ড</label>
          <input 
            id="login-password"
            type="password" 
            class="form-input" 
            v-model="password" 
            placeholder="••••••••"
            required 
          />
        </div>

        <div v-if="errorMsg" class="login-error-box">
          ⚠️ {{ errorMsg }}
        </div>

        <div class="demo-cred-hint">
          <span>💡 ডিফল্ট ক্রেডেনশিয়াল:</span>
          <code>ইউজারনেম: admin</code> | <code>পাসওয়ার্ড: blood1234</code>
        </div>

        <div class="login-modal-actions">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">বাতিল</button>
          <button type="submit" class="btn btn-primary" :disabled="loading" id="btn-submit-login">
            <span v-if="!loading">লগইন করুন</span>
            <span v-else>যাচাই হচ্ছে...</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../utils/api';

const props = defineProps({
  message: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'login-success', 'notify']);

const username = ref('admin');
const password = ref('blood1234');
const loading = ref(false);
const errorMsg = ref('');

async function handleLogin() {
  loading.value = true;
  errorMsg.value = '';

  try {
    const res = await api.login(username.value, password.value);
    if (res.success) {
      emit('login-success', res.user);
      emit('notify', res.message || 'সফলভাবে লগইন হয়েছে!');
      emit('close');
    } else {
      errorMsg.value = res.message || 'ভুল ইউজারনেম বা পাসওয়ার্ড!';
    }
  } catch (err) {
    errorMsg.value = 'লগইন করতে সমস্যা হচ্ছে। আবার চেষ্টা করুন।';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-modal {
  max-width: 420px;
}

.login-intro {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1.2rem;
  line-height: 1.4;
}

.login-error-box {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  padding: 0.6rem 0.8rem;
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  margin-bottom: 1rem;
}

.demo-cred-hint {
  font-size: 0.75rem;
  color: var(--text-dim);
  background: rgba(255, 255, 255, 0.04);
  padding: 0.5rem;
  border-radius: var(--radius-sm);
  margin-bottom: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
}

.demo-cred-hint code {
  color: #fef08a;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
}

.login-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
