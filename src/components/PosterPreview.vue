<template>
  <div class="canvas-wrapper">
    <!-- Top Action Toolbar -->
    <div class="export-actions-bar">
      <!-- High-Res PNG Download -->
      <button 
        class="btn btn-primary" 
        :disabled="isGenerating"
        @click="downloadImage('png')"
        id="btn-download-png"
      >
        <span v-if="!isGenerating">{{ t('downloadPngBtn') }}</span>
        <span v-else>{{ t('downloadingBtn') }}</span>
      </button>

      <!-- Web Share / Direct WhatsApp Share -->
      <button 
        class="btn btn-whatsapp" 
        :disabled="isGenerating"
        @click="shareDirectWhatsApp"
        id="btn-whatsapp-share"
        :title="t('whatsappBtn')"
      >
        <span>{{ t('whatsappBtn') }}</span>
      </button>

      <!-- Native Mobile Share API -->
      <button 
        v-if="canWebShare"
        class="btn btn-secondary btn-sm" 
        :disabled="isGenerating"
        @click="shareNative"
        id="btn-native-share"
        :title="t('mobileShareBtn')"
      >
        <span>{{ t('mobileShareBtn') }}</span>
      </button>

      <!-- Copy Caption for Social Media -->
      <button 
        class="btn btn-secondary btn-sm" 
        @click="copyCaptionText"
        id="btn-copy-caption"
        :title="t('copyCaptionBtn')"
      >
        <span>{{ t('copyCaptionBtn') }}</span>
      </button>

      <!-- Save Record to Account (Multi-user friendly) -->
      <button 
        class="btn btn-success btn-sm" 
        :disabled="isSaving"
        @click="handleSaveRecord"
        id="btn-save-record"
      >
        <span v-if="!isSaving">
          {{ authState.authenticated ? t('saveRecordBtn') : t('saveLoginPrompt') }}
        </span>
        <span v-else>{{ t('savingBtn') }}</span>
      </button>
    </div>

    <!-- Active Template Canvas Container -->
    <div class="preview-poster-viewport" id="poster-capture-area" ref="captureArea">
      <component 
        :is="currentTemplateComponent" 
        :data="formData" 
      />
    </div>

    <!-- User-Friendly Notice (No Technical Terms) -->
    <div class="preview-footer-tips">
      <p v-if="!authState.authenticated" class="guest-tip">
        {{ t('guestNotice') }}
      </p>
      <p v-else class="auth-tip">
        {{ t('authNotice') }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import * as htmlToImage from 'html-to-image';
import confetti from 'canvas-confetti';
import { generateSocialCaption } from '../utils/bengaliUtils';
import { t, currentLang } from '../utils/i18n';

// Templates
import TemplateClassic from './templates/TemplateClassic.vue';
import TemplateModern from './templates/TemplateModern.vue';
import TemplateCertificate from './templates/TemplateCertificate.vue';
import TemplateStory from './templates/TemplateStory.vue';
import TemplateMinimal from './templates/TemplateMinimal.vue';

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

const emit = defineEmits(['save-record', 'open-auth', 'notify']);

const captureArea = ref(null);
const isGenerating = ref(false);
const isSaving = ref(false);
const canWebShare = ref(false);

onMounted(() => {
  canWebShare.value = typeof navigator !== 'undefined' && !!navigator.share;
});

const currentTemplateComponent = computed(() => {
  switch (props.formData.templateId) {
    case 'modern':
      return TemplateModern;
    case 'certificate':
      return TemplateCertificate;
    case 'story':
      return TemplateStory;
    case 'minimal':
      return TemplateMinimal;
    case 'bancharampur-classic':
    default:
      return TemplateClassic;
  }
});

// Confetti animation
function fireConfetti() {
  try {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#ef4444', '#dc2626', '#f59e0b', '#ffffff']
    });
  } catch (e) {}
}

// Download image as PNG / JPEG
async function downloadImage(format = 'png') {
  if (!captureArea.value) return;
  isGenerating.value = true;
  emit('notify', t('downloadingBtn'));

  try {
    // Target the actual poster element directly (avoid viewport margin-auto & outer shadows)
    const targetEl = captureArea.value.firstElementChild || captureArea.value;
    const rect = targetEl.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    const scale = 2; // Sharp 2x HD output (much faster export)
    const options = {
      quality: 0.95,
      pixelRatio: scale,
      width: width,
      height: height,
      canvasWidth: width * scale,
      canvasHeight: height * scale,
      cacheBust: false,
      style: {
        margin: '0',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '0',
        marginBottom: '0',
        padding: '0',
        transform: 'none',
        boxShadow: 'none',
        left: '0',
        top: '0',
        position: 'static'
      }
    };

    let dataUrl;
    if (format === 'jpeg' || format === 'jpg') {
      dataUrl = await htmlToImage.toJpeg(targetEl, options);
    } else {
      dataUrl = await htmlToImage.toPng(targetEl, options);
    }

    const donorNameClean = (props.formData.donorName || 'donor').replace(/\s+/g, '_');
    const filename = `blood_donor_${donorNameClean}_${Date.now()}.${format}`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 150);

    fireConfetti();
    emit('notify', t('toastDownloaded'));
  } catch (error) {
    console.error('Image export error:', error);
    emit('notify', 'Image generation error. Please try again.');
  } finally {
    isGenerating.value = false;
  }
}

// WhatsApp Direct Share
function shareDirectWhatsApp() {
  const caption = generateSocialCaption(props.formData, currentLang.value);
  const encodedText = encodeURIComponent(caption);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
  emit('notify', 'Opening WhatsApp...');
}

// Native Web Share (Mobile)
async function shareNative() {
  if (!captureArea.value || !navigator.share) return;
  isGenerating.value = true;

  try {
    const targetEl = captureArea.value.firstElementChild || captureArea.value;
    const rect = targetEl.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);

    const blob = await htmlToImage.toBlob(targetEl, {
      pixelRatio: 2,
      width: width,
      height: height,
      quality: 0.95,
      style: {
        margin: '0',
        marginLeft: '0',
        marginRight: '0',
        marginTop: '0',
        marginBottom: '0',
        transform: 'none',
        boxShadow: 'none',
        left: '0',
        top: '0',
        position: 'static'
      }
    });
    const filename = `blood_donor_${Date.now()}.png`;
    const file = new File([blob], filename, { type: 'image/png' });

    const caption = generateSocialCaption(props.formData, currentLang.value);

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Blood Donor Poster',
        text: caption
      });
      emit('notify', 'Shared successfully!');
    } else {
      await navigator.share({
        title: 'Blood Donor Poster',
        text: caption
      });
    }
  } catch (e) {
    if (e.name !== 'AbortError') {
      console.warn('Native share error:', e);
      shareDirectWhatsApp();
    }
  } finally {
    isGenerating.value = false;
  }
}

// Copy Wish Caption
async function copyCaptionText() {
  const caption = generateSocialCaption(props.formData, currentLang.value);
  try {
    await navigator.clipboard.writeText(caption);
    emit('notify', t('toastCopied'));
  } catch (e) {
    const textArea = document.createElement('textarea');
    textArea.value = caption;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    emit('notify', t('toastCopied'));
  }
}

// Handle Record Saving
function handleSaveRecord() {
  if (!props.authState.authenticated) {
    emit('open-auth', 'register');
  } else {
    emit('save-record');
  }
}
</script>

<style scoped>
.preview-footer-tips {
  margin-top: 1rem;
  max-width: 540px;
  text-align: center;
  font-size: 0.85rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.guest-tip {
  color: #94a3b8;
  line-height: 1.4;
}

.auth-tip {
  color: #34d399;
  line-height: 1.4;
}
</style>
