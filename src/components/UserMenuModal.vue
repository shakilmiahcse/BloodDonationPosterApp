<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content user-menu-modal">
      <div class="card-title-row">
        <h2>
          <span>👤</span> {{ t('userMenuTitle') }}
        </h2>
        <button class="btn btn-secondary btn-icon btn-sm" @click="$emit('close')">✕</button>
      </div>

      <div class="user-info-box">
        <div class="user-avatar-circle">
          <span>{{ (user?.name || user?.username || 'U')[0].toUpperCase() }}</span>
        </div>
        <div class="user-text-meta">
          <h3 class="user-display-name">{{ user?.name || user?.username }}</h3>
          <span class="user-username-tag">@{{ user?.username }}</span>
        </div>
      </div>

      <div class="current-org-card">
        <div class="org-card-header">
          <span class="org-icon">🏛️</span>
          <span class="org-label">{{ t('savedOrgLabel') }}:</span>
        </div>
        <p class="org-current-name">{{ orgName || 'চরশিবপুর উত্তরপাড়া মানবসেবা যুব সংঘ' }}</p>
      </div>

      <div class="user-menu-actions">
        <button type="button" class="btn btn-primary btn-block" @click="handleSaveDefaults">
          <span>💾</span>
          <span>{{ t('saveCurrentSettingsBtn') }}</span>
        </button>

        <button type="button" class="btn btn-danger btn-block" @click="handleLogout">
          <span>🚪</span>
          <span>{{ t('logoutBtn') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { t } from '../utils/i18n';

const props = defineProps({
  user: {
    type: Object,
    required: true
  },
  orgName: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'logout', 'save-defaults']);

function handleSaveDefaults() {
  emit('save-defaults');
  emit('close');
}

function handleLogout() {
  emit('logout');
  emit('close');
}
</script>

<style scoped>
.user-menu-modal {
  max-width: 400px;
}

.user-info-box {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.user-avatar-circle {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #991b1b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
}

.user-display-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-main);
  line-height: 1.2;
}

.user-username-tag {
  font-size: 0.8rem;
  color: #dc2626;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
}

[data-theme="dark"] .user-username-tag {
  color: #fca5a5;
}

.current-org-card {
  padding: 0.85rem;
  background: rgba(217, 119, 6, 0.08);
  border: 1px solid rgba(217, 119, 6, 0.25);
  border-radius: var(--radius-md);
  margin-bottom: 1.5rem;
}

.org-card-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #b45309;
  margin-bottom: 0.25rem;
  font-weight: 700;
}

[data-theme="dark"] .org-card-header {
  color: #fef08a;
}

.org-current-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-main);
}

.user-menu-actions {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.btn-block {
  width: 100%;
}

.btn-danger {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #dc2626;
  font-weight: 700;
}

[data-theme="dark"] .btn-danger {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.35);
  color: #fca5a5;
}

.btn-danger:hover {
  background: #ef4444;
  color: #fff;
}
</style>
