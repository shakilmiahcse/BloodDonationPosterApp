<template>
  <div class="cert-poster">
    <!-- Ornate Double Border -->
    <div class="cert-inner-border">
      <!-- Corner Ornaments -->
      <div class="corner corner-tl">❖</div>
      <div class="corner corner-tr">❖</div>
      <div class="corner corner-bl">❖</div>
      <div class="corner corner-br">❖</div>

      <!-- Header with Circular Org Logo -->
      <header class="cert-header">
        <div class="cert-logo-row">
          <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="cert-org-logo" />
          <span v-else class="cert-logo-placeholder">🩸</span>
        </div>
        <div class="cert-badge">🏅 {{ isBn ? 'সম্মাননা ও কৃতজ্ঞতা স্মারক' : 'CERTIFICATE OF HONOR & GRATITUDE' }}</div>
        <h1 class="cert-org-name">{{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'Organization Name') }}</h1>
        <p v-if="data.heroQuote" class="cert-motto">“{{ data.heroQuote }}”</p>
      </header>

      <!-- Body -->
      <main class="cert-body">
        <div class="cert-intro">{{ isBn ? 'মানবতার কল্যাণে নিঃস্বার্থ রক্তদানের জন্য পরম শ্রদ্ধায় নিবেদিত' : 'Presented with deep respect and appreciation for selfless voluntary blood donation' }}</div>

        <!-- Center Layout: Photo & Official Seal -->
        <div class="cert-center-row">
          <div class="cert-photo-wrapper">
            <div class="cert-photo-frame">
              <img 
                v-if="donorPhotoSrc"
                :src="donorPhotoSrc" 
                alt="Donor" 
                class="cert-photo"
                :style="{
                  transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
                }"
              />
              <div v-else class="cert-photo-placeholder">
                <svg class="placeholder-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                </svg>
                <span class="placeholder-prompt">{{ isBn ? 'ছবি যুক্ত করুন' : 'Add Photo' }}</span>
              </div>
            </div>
            <div class="cert-count-ribbon">
              {{ data.donationCount || (isBn ? '১ম বার রক্তদান সম্পন্ন' : '1st Blood Donation') }}
            </div>
          </div>

          <!-- Blood Group Stamp / Seal -->
          <div class="cert-seal">
            <div class="seal-inner">
              <div class="seal-text-top">{{ isBn ? 'ব্লাড গ্রুপ' : 'BLOOD GROUP' }}</div>
              <div class="seal-group">{{ data.bloodGroup || 'O+' }}</div>
              <div class="seal-text-bottom">★ {{ isBn ? 'প্রমাণিত' : 'VERIFIED' }} ★</div>
            </div>
          </div>
        </div>

        <!-- Donor Honorific Title -->
        <div class="donor-name-box">
          <div class="honor-prefix">{{ isBn ? 'সম্মানিত রক্তযোদ্ধা' : 'Honorable Blood Donor' }}</div>
          <h2 class="honor-name">{{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}</h2>
        </div>

        <!-- Certificate Declaration Message -->
        <p class="cert-statement">
          {{ isBn ? 'আপনার দানকৃত অমূল্য রক্ত একটি মুমূর্ষু প্রাণের বাঁচার নতুন আশা যুগিয়েছে। আপনার এই মহৎ আত্মত্যাগকে স্মরণীয় করে রাখতে আমাদের এই বিনম্র শ্রদ্ধাঞ্জলি।' : 'Your noble contribution of life-saving blood brings new hope to patients in need. We express our heartfelt gratitude for your heroic generosity.' }}
        </p>
      </main>

      <!-- Footer & Signatures -->
      <footer class="cert-footer">
        <div class="sign-block left">
          <div class="sign-val">{{ formattedDate }}</div>
          <div class="sign-line"></div>
          <div class="sign-title">{{ isBn ? 'রক্তদানের তারিখ' : 'Date of Donation' }}</div>
        </div>

        <div class="sign-block center">
          <div class="stamp-icon">🩸</div>
          <div class="stamp-motto">{{ data.quote || (isBn ? 'রক্তদান জীবনের শ্রেষ্ঠ উপহার' : 'The Greatest Gift of Life') }}</div>
        </div>

        <div class="sign-block right">
          <div class="sign-val">{{ hasReference ? data.referenceName : (data.orgName || (isBn ? 'কর্তৃপক্ষ' : 'Authority')) }}</div>
          <div class="sign-line"></div>
          <div class="sign-title">{{ hasReference ? (isBn ? 'রেফারেন্স / সংগ্রাহক' : 'Referred By') : (isBn ? 'স্বাক্ষর ও পরিচালনা' : 'Authorized Signature') }}</div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { currentLang } from '../../utils/i18n';
import { formatBengaliDate } from '../../utils/bengaliUtils';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const isBn = computed(() => currentLang.value === 'bn');

const logoSrc = computed(() => {
  return props.data.orgLogo || '';
});

const donorPhotoSrc = computed(() => {
  return props.data.donorPhoto || '';
});

const hasReference = computed(() => {
  return typeof props.data.referenceName === 'string' && props.data.referenceName.trim().length > 0;
});

const formattedDate = computed(() => {
  if (!props.data.donationDate) return '07-10-2026';
  if (isBn.value) {
    return formatBengaliDate(props.data.donationDate, 'full');
  }
  return props.data.donationDate;
});
</script>

<style scoped>
.cert-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 10 / 14.1;
  background: #7f1d1d;
  color: #1e293b;
  padding: 8px;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', serif;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
}

.cert-inner-border {
  height: 100%;
  border: 4px double #d97706;
  outline: 2px solid #b91c1c;
  outline-offset: -8px;
  padding: 1.2rem 1.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background: radial-gradient(ellipse at center, #ffffff 40%, #fefcf3 75%, #fef3c7 100%);
}

.corner {
  position: absolute;
  font-size: 1.3rem;
  color: #b45309;
  line-height: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.corner-tl { top: 12px; left: 12px; }
.corner-tr { top: 12px; right: 12px; }
.corner-bl { bottom: 12px; left: 12px; }
.corner-br { bottom: 12px; right: 12px; }

.cert-header {
  text-align: center;
  padding-bottom: 0.2rem;
}

.cert-logo-row {
  margin-bottom: 0.35rem;
  display: flex;
  justify-content: center;
}

.cert-org-logo {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid #d97706;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.cert-logo-placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fee2e2;
  border: 2px solid #b91c1c;
  font-size: 1.6rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.cert-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.8px;
  background: linear-gradient(135deg, #b45309 0%, #d97706 50%, #92400e 100%);
  padding: 0.22rem 1rem;
  border-radius: 999px;
  border: 1px solid #fef08a;
  box-shadow: 0 3px 8px rgba(180, 83, 9, 0.3);
  margin-bottom: 0.3rem;
  text-transform: uppercase;
}

.cert-org-name {
  font-family: 'Tiro Bangla', 'Outfit', serif;
  font-size: 1.6rem;
  font-weight: 900;
  color: #7f1d1d;
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.2px;
}

.cert-motto {
  font-size: 0.85rem;
  font-style: italic;
  font-weight: 600;
  color: #475569;
  margin-top: 0.2rem;
}

.cert-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0.2rem 0;
}

.cert-intro {
  font-size: 0.84rem;
  color: #64748b;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.cert-center-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  margin-bottom: 0.5rem;
}

.cert-photo-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cert-photo-frame {
  width: 155px;
  height: 180px;
  border: 4.5px solid #d97706;
  outline: 2px solid #7f1d1d;
  outline-offset: -2px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
  border-radius: 6px;
  overflow: hidden;
  background: #f1f5f9;
}

.cert-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cert-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #94a3b8;
  gap: 0.35rem;
}

.placeholder-avatar-svg {
  width: 48px;
  height: 48px;
  opacity: 0.6;
}

.placeholder-prompt {
  font-size: 0.7rem;
  font-weight: 600;
  color: #64748b;
  background: #fff;
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  border: 1px dashed #cbd5e1;
}

.cert-count-ribbon {
  position: absolute;
  bottom: -10px;
  background: #b91c1c;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.15rem 0.75rem;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  border: 1px solid #fff;
  white-space: nowrap;
}

.cert-seal {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 3px dashed #b91c1c;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fef2f2;
}

.seal-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #dc2626;
  background: linear-gradient(135deg, #ef4444, #991b1b);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.seal-text-top {
  font-size: 0.58rem;
  font-weight: 600;
}

.seal-group {
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1;
}

.seal-text-bottom {
  font-size: 0.48rem;
  letter-spacing: 0.5px;
}

.donor-name-box {
  margin: 0.5rem 0 0.3rem;
}

.honor-prefix {
  font-size: 0.8rem;
  color: #991b1b;
  font-weight: 600;
}

.honor-name {
  font-family: 'Tiro Bangla', 'Outfit', serif;
  font-size: 1.7rem;
  font-weight: 700;
  color: #7f1d1d;
  line-height: 1.2;
}

.cert-statement {
  font-size: 0.82rem;
  color: #334155;
  max-width: 420px;
  line-height: 1.35;
  margin-top: 0.3rem;
}

.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 0.6rem;
}

.sign-block {
  text-align: center;
  min-width: 100px;
}

.sign-val {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.2rem;
}

.sign-line {
  height: 1px;
  background-color: #94a3b8;
  margin: 0 auto 0.2rem;
  width: 100%;
}

.sign-title {
  font-size: 0.68rem;
  color: #64748b;
  font-weight: 600;
}

.sign-block.center {
  flex: 1;
  padding: 0 0.5rem;
}

.stamp-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.stamp-motto {
  font-size: 0.62rem;
  color: #991b1b;
  font-weight: 600;
}
</style>
