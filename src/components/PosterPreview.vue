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
        <span v-if="!isGenerating">📥 পোস্টার ডাউনলোড (PNG)</span>
        <span v-else>⏳ তৈরি হচ্ছে...</span>
      </button>

      <!-- Web Share / Direct WhatsApp Share -->
      <button 
        class="btn btn-whatsapp" 
        :disabled="isGenerating"
        @click="shareDirectWhatsApp"
        id="btn-whatsapp-share"
        title="হোয়াটসঅ্যাপে পাঠান"
      >
        <span>💬 হোয়াটসঅ্যাপ শেয়ার</span>
      </button>

      <!-- Native Mobile Share API -->
      <button 
        v-if="canWebShare"
        class="btn btn-secondary btn-sm" 
        :disabled="isGenerating"
        @click="shareNative"
        id="btn-native-share"
        title="অন্যান্য অ্যাপে শেয়ার"
      >
        <span>📤 সোশ্যাল শেয়ার</span>
      </button>

      <!-- Copy Caption for Social Media -->
      <button 
        class="btn btn-secondary btn-sm" 
        @click="copyCaptionText"
        id="btn-copy-caption"
        title="ফেসবুক/সোশ্যাল মিডিয়া পোস্টের ক্যাপশন কপি করুন"
      >
        <span>📋 ক্যাপশন কপি</span>
      </button>

      <!-- Save Record to JSON (Login Required) -->
      <button 
        class="btn btn-success btn-sm" 
        :disabled="isSaving"
        @click="handleSaveRecord"
        id="btn-save-record"
      >
        <span v-if="!isSaving">💾 {{ authState.authenticated ? 'জেসনে সেভ করুন' : 'ডাটা সেভ (লগইন)' }}</span>
        <span v-else>সেভ হচ্ছে...</span>
      </button>
    </div>

    <!-- Active Template Canvas Container -->
    <div class="preview-poster-viewport" id="poster-capture-area" ref="captureArea">
      <component 
        :is="currentTemplateComponent" 
        :data="formData" 
      />
    </div>

    <!-- Helpful Helper Text -->
    <div class="preview-footer-tips">
      <p v-if="!authState.authenticated" class="guest-tip">
        ℹ️ <strong>গেস্ট মোড:</strong> আপনি আনলিমিটেড পোস্টার ডাউনলোড ও শেয়ার করতে পারবেন। ডাটা জেসন ফাইলে সংরক্ষণ করতে উপরের লগইন বাটনে ক্লিক করুন।
      </p>
      <p v-else class="auth-tip">
        ✅ <strong>অ্যাডমিন মোড:</strong> আপনার তৈরি করা ডোনার রেকর্ড সার্ভারের <code>records.json</code> ফাইলে সংরক্ষিত থাকবে।
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import * as htmlToImage from 'html-to-image';
import confetti from 'canvas-confetti';
import { generateSocialCaption } from '../utils/bengaliUtils';

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

const emit = defineEmits(['save-record', 'open-login', 'notify']);

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

// Trigger celebratory confetti
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
  emit('notify', 'পোস্টার তৈরি হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...');

  try {
    const scale = 2.5; // High definition output
    const options = {
      quality: 0.98,
      pixelRatio: scale,
      cacheBust: true,
      skipFonts: false
    };

    let dataUrl;
    if (format === 'jpeg' || format === 'jpg') {
      dataUrl = await htmlToImage.toJpeg(captureArea.value, options);
    } else {
      dataUrl = await htmlToImage.toPng(captureArea.value, options);
    }

    const donorNameClean = (props.formData.donorName || 'donor').replace(/\s+/g, '_');
    const filename = `blood_donor_${donorNameClean}_${Date.now()}.${format}`;

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();

    fireConfetti();
    emit('notify', '✅ পোস্টার সফলভাবে ডাউনলোড হয়েছে!');
  } catch (error) {
    console.error('Image export error:', error);
    emit('notify', 'পোস্টার তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
  } finally {
    isGenerating.value = false;
  }
}

// WhatsApp Direct Share
function shareDirectWhatsApp() {
  const caption = generateSocialCaption(props.formData);
  const encodedText = encodeURIComponent(caption);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`;
  window.open(whatsappUrl, '_blank');
  emit('notify', 'হোয়াটসঅ্যাপ ওপেন হচ্ছে...');
}

// Native Web Share (for Mobile)
async function shareNative() {
  if (!captureArea.value || !navigator.share) return;
  isGenerating.value = true;
  emit('notify', 'শেয়ার অপশন প্রস্তুত হচ্ছে...');

  try {
    const blob = await htmlToImage.toBlob(captureArea.value, { pixelRatio: 2, quality: 0.95 });
    const filename = `blood_donor_${Date.now()}.png`;
    const file = new File([blob], filename, { type: 'image/png' });

    const caption = generateSocialCaption(props.formData);

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'রক্তদান পোস্টার',
        text: caption
      });
      emit('notify', 'সফলভাবে শেয়ার করা হয়েছে!');
    } else {
      await navigator.share({
        title: 'রক্তদান পোস্টার',
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
  const caption = generateSocialCaption(props.formData);
  try {
    await navigator.clipboard.writeText(caption);
    emit('notify', '📋 পোস্টের ক্যাপশন কপি হয়েছে! ফেসবুকে পেস্ট করতে পারেন।');
  } catch (e) {
    const textArea = document.createElement('textarea');
    textArea.value = caption;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    emit('notify', '📋 পোস্টের ক্যাপশন কপি হয়েছে!');
  }
}

// Handle Record Saving
function handleSaveRecord() {
  if (!props.authState.authenticated) {
    emit('open-login', 'ডাটা জেসন ফাইলে সংরক্ষণ করতে অনুগ্রহ করে প্রথমে লগইন করুন।');
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
  font-size: 0.8rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.guest-tip {
  color: #94a3b8;
}

.auth-tip {
  color: #34d399;
}
</style>
