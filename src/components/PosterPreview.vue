<template>
  <div class="canvas-wrapper">
    <!-- Top Action Toolbar -->
    <div class="export-actions-bar">
      <!-- High-Res PNG Download - Full Width Primary -->
      <button 
        class="btn btn-primary btn-download-main" 
        :disabled="isGenerating"
        @click="downloadImage('png')"
        id="btn-download-png"
      >
        <span v-if="!isGenerating">{{ t('downloadPngBtn') }}</span>
        <span v-else>⏳ {{ t('downloadingBtn') }}</span>
      </button>

      <!-- Sub Actions Responsive Grid (2x2 on mobile, 4-inline on desktop) -->
      <div class="export-sub-actions">
        <!-- Direct WhatsApp Share -->
        <button 
          class="btn btn-whatsapp sub-action-btn" 
          :disabled="isGenerating"
          @click="shareDirectWhatsApp"
          id="btn-whatsapp-share"
          :title="t('whatsappBtn')"
        >
          <span class="btn-text">{{ t('whatsappBtn') }}</span>
        </button>

        <!-- Social Share (Native Web Share on mobile) -->
        <button 
          v-if="canWebShare"
          class="btn btn-secondary btn-sm sub-action-btn" 
          :disabled="isGenerating"
          @click="shareNative"
          id="btn-native-share"
          :title="t('mobileShareBtn')"
        >
          <span class="btn-text">{{ t('mobileShareBtn') }}</span>
        </button>

        <!-- Copy Caption for Social Media -->
        <button 
          class="btn btn-secondary btn-sm sub-action-btn" 
          @click="copyCaptionText"
          id="btn-copy-caption"
          :title="t('copyCaptionBtn')"
        >
          <span class="btn-text">{{ t('copyCaptionBtn') }}</span>
        </button>

        <!-- Save Record to Account -->
        <button 
          class="btn btn-success btn-sm sub-action-btn" 
          :disabled="isSaving"
          @click="handleSaveRecord"
          id="btn-save-record"
        >
          <span v-if="!isSaving" class="btn-text">
            {{ authState.authenticated ? t('saveRecordBtn') : t('saveLoginPrompt') }}
          </span>
          <span v-else class="btn-text">⏳ {{ t('savingBtn') }}</span>
        </button>
      </div>
    </div>

    <!-- Scalable Preview Stage: Renders internally at canonical 540px and scales down cleanly on mobile -->
    <div 
      class="poster-preview-stage" 
      ref="previewStageRef"
      :style="{ height: stageHeight ? `${stageHeight}px` : 'auto' }"
    >
      <div 
        class="poster-scale-wrapper"
        :style="{
          width: `${Math.round(CANONICAL_WIDTH * previewScale)}px`,
          height: stageHeight ? `${stageHeight}px` : 'auto',
          overflow: 'hidden'
        }"
      >
        <div 
          class="poster-scaled-box"
          :style="{
            width: `${CANONICAL_WIDTH}px`,
            transform: `scale(${previewScale})`,
            transformOrigin: 'top left'
          }"
        >
          <div 
            class="preview-poster-viewport" 
            id="poster-capture-area" 
            ref="captureArea"
            :style="{
              width: `${CANONICAL_WIDTH}px`,
              minWidth: `${CANONICAL_WIDTH}px`,
              maxWidth: `${CANONICAL_WIDTH}px`
            }"
          >
            <component 
              :is="currentTemplateComponent" 
              :data="formData" 
            />
          </div>
        </div>
      </div>
    </div>

    <!-- User-Friendly Notice -->
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
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

const CANONICAL_WIDTH = 540;

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

const previewStageRef = ref(null);
const captureArea = ref(null);
const previewScale = ref(1);
const stageHeight = ref(null);

const isGenerating = ref(false);
const isSaving = ref(false);
const canWebShare = ref(false);

let resizeObserver = null;

function updateScale() {
  if (!previewStageRef.value || !captureArea.value) return;

  // Accurately compute available container width without CSS Grid flex-grow traps
  const parentWidth = previewStageRef.value.parentElement?.clientWidth;
  const windowAvailable = typeof window !== 'undefined' ? (window.innerWidth - 32) : CANONICAL_WIDTH;
  const containerWidth = Math.min(parentWidth || windowAvailable, windowAvailable);

  const scale = Math.min(1, Math.max(0.35, containerWidth / CANONICAL_WIDTH));
  previewScale.value = scale;

  const targetEl = captureArea.value.firstElementChild || captureArea.value;
  const unscaledHeight = targetEl.offsetHeight || Math.round(CANONICAL_WIDTH * 1.41);
  stageHeight.value = Math.round(unscaledHeight * scale);
}

onMounted(() => {
  canWebShare.value = typeof navigator !== 'undefined' && !!navigator.share;
  
  nextTick(() => {
    updateScale();
  });

  window.addEventListener('resize', updateScale);
  if (typeof ResizeObserver !== 'undefined' && previewStageRef.value?.parentElement) {
    resizeObserver = new ResizeObserver(() => {
      updateScale();
    });
    resizeObserver.observe(previewStageRef.value.parentElement);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScale);
  if (resizeObserver) resizeObserver.disconnect();
});

watch(() => props.formData.templateId, () => {
  nextTick(() => {
    updateScale();
  });
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

// Download image as high-res PNG / JPEG
// Guarantees identical canonical 1080px resolution on Mobile, Tablet & Desktop
async function downloadImage(format = 'png') {
  if (!captureArea.value) return;
  isGenerating.value = true;
  emit('notify', t('downloadingBtn'));

  try {
    // 1. Save and temporarily reset preview scale to 1 for unscaled coordinate capture
    const prevScale = previewScale.value;
    previewScale.value = 1;
    await nextTick();

    // 2. Measure target element at 1:1 scale
    const targetEl = captureArea.value.firstElementChild || captureArea.value;
    const canonicalWidth = CANONICAL_WIDTH;
    const canonicalHeight = targetEl.offsetHeight || Math.round(CANONICAL_WIDTH * 1.41);

    const scale = 2; // Sharp 2x HD output (1080px wide on ALL devices)
    const options = {
      quality: 0.95,
      pixelRatio: scale,
      width: canonicalWidth,
      height: canonicalHeight,
      canvasWidth: canonicalWidth,
      canvasHeight: canonicalHeight,
      cacheBust: false,
      skipFonts: true, // Prevents cross-origin cssRules SecurityError with Google Fonts
      style: {
        margin: '0',
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

    // Restore preview scale
    previewScale.value = prevScale;

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
    updateScale();
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

// Native Web Share (Mobile) - exports high-res canonical image
async function shareNative() {
  if (!captureArea.value || !navigator.share) return;
  isGenerating.value = true;

  try {
    const prevScale = previewScale.value;
    previewScale.value = 1;
    await nextTick();

    const targetEl = captureArea.value.firstElementChild || captureArea.value;
    const canonicalWidth = CANONICAL_WIDTH;
    const canonicalHeight = targetEl.offsetHeight || Math.round(CANONICAL_WIDTH * 1.41);

    const blob = await htmlToImage.toBlob(targetEl, {
      pixelRatio: 2,
      width: canonicalWidth,
      height: canonicalHeight,
      canvasWidth: canonicalWidth,
      canvasHeight: canonicalHeight,
      quality: 0.95,
      skipFonts: true,
      style: {
        margin: '0',
        transform: 'none',
        boxShadow: 'none',
        left: '0',
        top: '0',
        position: 'static'
      }
    });

    previewScale.value = prevScale;

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
.canvas-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

/* Action Toolbar */
.export-actions-bar {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: 100%;
  max-width: 540px;
  background: var(--bg-card);
  padding: 0.75rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-glass);
  box-shadow: var(--shadow-md);
  box-sizing: border-box;
}

.btn-download-main {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.96rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  box-shadow: 0 4px 14px var(--primary-glow);
}

.export-sub-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.45rem;
  width: 100%;
}

@media (min-width: 520px) {
  .export-sub-actions {
    grid-template-columns: repeat(4, 1fr);
  }
}

.sub-action-btn {
  padding: 0.55rem 0.45rem;
  font-size: 0.82rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 38px;
}

.sub-action-btn .btn-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Scalable Preview Stage */
.poster-preview-stage {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 16px;
  transition: height 0.15s ease-out;
}

.poster-scale-wrapper {
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.poster-scaled-box {
  width: 540px;
  transform-origin: top left;
  flex-shrink: 0;
  will-change: transform;
}

.preview-poster-viewport {
  width: 540px;
  min-width: 540px;
  max-width: 540px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 40px -10px rgba(15, 23, 42, 0.22), 0 0 25px rgba(220, 38, 38, 0.08);
  box-sizing: border-box;
}

[data-theme="dark"] .preview-poster-viewport {
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(220, 38, 38, 0.2);
}

.preview-footer-tips {
  margin-top: 0.25rem;
  width: 100%;
  max-width: 540px;
  text-align: center;
  font-size: 0.82rem;
  padding: 0.65rem 0.9rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-glass);
  box-sizing: border-box;
}

.guest-tip {
  color: var(--text-dim);
  line-height: 1.4;
}

.auth-tip {
  color: #10b981;
  line-height: 1.4;
  font-weight: 600;
}
</style>
