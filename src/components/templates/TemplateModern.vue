<template>
  <div class="tm-root" ref="posterEl">
    <!-- Curved Top Header (Photoshop Ribbon Style) -->
    <header class="tm-header">
      <div class="tm-header-content">
        <div class="tm-logo-wrap">
          <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="tm-logo-img" />
          <div v-else class="tm-logo-emblem">
            <span>🩸</span>
          </div>
        </div>
        <div class="tm-header-text">
          <h1 class="tm-org-title">{{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'Organization Name') }}</h1>
          <div v-if="data.orgSubtitle" class="tm-org-subtitle">{{ data.orgSubtitle }}</div>
          <div class="tm-header-pill">
            <span class="tm-pill-icon">❤️</span>
            <span class="tm-pill-text">{{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Beside critical patients in need of blood') }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Center Stage with Studio Photo & Overlapping Badges -->
    <main class="tm-main">
      <div class="tm-photo-hero-stage">
        <!-- Main Portrait Photo Frame -->
        <div class="tm-photo-frame">
          <img 
            v-if="donorPhotoSrc"
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="tm-donor-photo"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
          <div v-else class="tm-photo-placeholder">
            <svg class="placeholder-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
            <span class="placeholder-prompt">{{ isBn ? 'ছবি যুক্ত করুন' : 'Add Photo' }}</span>
          </div>
        </div>

        <!-- 1. Top-Right Overlapping Blood Group Circle -->
        <div class="tm-blood-circle">
          <div class="tm-bg-val">{{ data.bloodGroup || 'O+' }}</div>
          <div class="tm-bg-tag">{{ isBn ? 'GROUP' : 'GROUP' }}</div>
        </div>

        <!-- 2. Bottom-Left Overlapping Date Pill -->
        <div class="tm-date-pill">
          <span class="tm-cal-icon">📅</span>
          <span class="tm-date-text">{{ formattedDate }}</span>
        </div>

        <!-- 3. Bottom-Right Overlapping Count Pill -->
        <div class="tm-count-pill">
          <span class="tm-star-icon">★</span>
          <span class="tm-count-text">{{ data.donationCount || (isBn ? '১ম বার' : '1st Time') }}</span>
        </div>
      </div>

      <!-- Sculpted Donor Name Plaque -->
      <div class="tm-donor-plaque">
        <div class="tm-honor-ribbon">
          <span class="ribbon-star">★</span>
          <span class="ribbon-text">{{ isBn ? 'HONORABLE BLOOD DONOR' : 'HONORABLE BLOOD DONOR' }}</span>
          <span class="ribbon-star">★</span>
        </div>

        <h2 class="tm-donor-name">
          {{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}
        </h2>

        <p class="tm-donor-quote">
          “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
        </p>

        <!-- Optional Collector/Reference -->
        <div v-if="hasReference" class="tm-ref-box">
          <span class="ref-label">🤝 {{ isBn ? 'সংগ্রাহক:' : 'Ref:' }}</span>
          <span class="ref-val">{{ data.referenceName }}</span>
        </div>
      </div>
    </main>

    <!-- Solid Bottom Charcoal/Navy Footer -->
    <footer class="tm-footer">
      <div class="tm-footer-text">
        {{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান' : 'Voluntary Blood Donation • Save Lives') }}
      </div>
    </footer>
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
  if (!props.data.donationDate) return '2026-10-07';
  return props.data.donationDate;
});
</script>

<style scoped>
.tm-root {
  position: relative;
  width: 100%;
  aspect-ratio: 10 / 14.2;
  background: radial-gradient(ellipse at 50% 25%, #ffffff 0%, #faf8f5 55%, #f4eae6 100%);
  color: #0f172a;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
  border: 4px solid #b00c14;
}

/* TOP CURVED HEADER (Illustrator style) */
.tm-header {
  position: relative;
  background: linear-gradient(135deg, #7c0b11 0%, #a80b13 50%, #c4121b 100%);
  padding: 1.1rem 1.3rem 1.4rem 1.3rem;
  box-sizing: border-box;
  border-bottom-left-radius: 26px;
  border-bottom-right-radius: 26px;
  box-shadow: 0 8px 24px rgba(168, 11, 19, 0.35);
  z-index: 5;
}

.tm-header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tm-logo-wrap {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  background: #ffffff;
  padding: 3px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28), 0 0 0 2px rgba(254, 240, 138, 0.85);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tm-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.tm-logo-emblem {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fee2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}

.tm-header-text {
  flex: 1;
  min-width: 0;
}

.tm-org-title {
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  font-size: 1.4rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.35);
  word-break: break-word;
}

.tm-org-subtitle {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fef08a;
  margin-top: 0.15rem;
}

.tm-header-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(254, 240, 138, 0.65);
  padding: 0.22rem 0.8rem;
  border-radius: 999px;
  margin-top: 0.4rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.tm-pill-icon {
  font-size: 0.75rem;
}

.tm-pill-text {
  font-size: 0.76rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
}

/* MAIN BODY */
.tm-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.4rem;
  position: relative;
  z-index: 2;
}

/* HERO PHOTO STAGE */
.tm-photo-hero-stage {
  position: relative;
  width: 255px;
  height: 285px;
  margin-bottom: 0.9rem;
  display: flex;
  justify-content: center;
}

.tm-photo-frame {
  width: 235px;
  height: 270px;
  border-radius: 20px;
  overflow: hidden;
  border: 4px solid #b00c14;
  outline: 2px solid #ffffff;
  outline-offset: -2px;
  box-shadow: 0 16px 36px rgba(176, 12, 20, 0.28), 0 4px 14px rgba(0, 0, 0, 0.12);
  background: #f8fafc;
}

.tm-donor-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.tm-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #94a3b8;
  gap: 0.6rem;
}

.placeholder-avatar-svg {
  width: 76px;
  height: 76px;
  opacity: 0.6;
}

.placeholder-prompt {
  font-size: 0.8rem;
  font-weight: 700;
  color: #b00c14;
  background: #ffffff;
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  border: 1px dashed #fca5a5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

/* 1. TOP RIGHT BLOOD GROUP CIRCLE */
.tm-blood-circle {
  position: absolute;
  top: -16px;
  right: -8px;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #e11d48 0%, #be123c 45%, #881337 100%);
  border: 3.5px solid #ffffff;
  box-shadow: 0 8px 22px rgba(190, 18, 60, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.tm-bg-val {
  font-family: 'Outfit', sans-serif;
  font-size: 2.1rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.tm-bg-tag {
  font-size: 0.54rem;
  font-weight: 900;
  letter-spacing: 0.8px;
  color: #fef08a;
  text-transform: uppercase;
}

/* 2. BOTTOM LEFT DATE PILL */
.tm-date-pill {
  position: absolute;
  bottom: 0px;
  left: -2px;
  background: #0f172a;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.35);
  z-index: 10;
}

.tm-cal-icon {
  font-size: 0.85rem;
}

.tm-date-text {
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
  font-size: 0.88rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.3px;
}

/* 3. BOTTOM RIGHT COUNT PILL */
.tm-count-pill {
  position: absolute;
  bottom: 0px;
  right: -2px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 6px 16px rgba(217, 119, 6, 0.4);
  z-index: 10;
}

.tm-star-icon {
  font-size: 0.85rem;
  color: #ffffff;
}

.tm-count-text {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 0.88rem;
  font-weight: 800;
  line-height: 1;
}

/* DONOR PLAQUE CARD */
.tm-donor-plaque {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border: 1.5px solid #fecaca;
  border-top: 3.5px solid #b00c14;
  border-radius: 16px;
  padding: 0.8rem 1.2rem;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 0 8px 24px rgba(176, 12, 20, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tm-honor-ribbon {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.8px;
  color: #b00c14;
  text-transform: uppercase;
}

.ribbon-star {
  color: #f59e0b;
}

.tm-donor-name {
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-size: 2.1rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
  margin: 0.2rem 0 0.15rem 0;
  letter-spacing: -0.2px;
}

.tm-donor-quote {
  font-size: 0.85rem;
  font-style: italic;
  color: #475569;
  line-height: 1.35;
  margin: 0.15rem 0 0.3rem 0;
}

.tm-ref-box {
  background: #f8fafc;
  border: 1px dashed #cbd5e1;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  display: inline-flex;
  gap: 0.35rem;
  margin-top: 0.2rem;
}

.ref-label {
  font-weight: 700;
  color: #b00c14;
}

.ref-val {
  font-weight: 600;
  color: #1e293b;
}

/* SOLID DARK FOOTER BAR */
.tm-footer {
  background: #0f172a;
  padding: 0.65rem 1rem;
  text-align: center;
  box-shadow: 0 -4px 14px rgba(0, 0, 0, 0.15);
  border-top: 2px solid #b00c14;
  z-index: 5;
}

.tm-footer-text {
  font-size: 0.88rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.4px;
}
</style>
