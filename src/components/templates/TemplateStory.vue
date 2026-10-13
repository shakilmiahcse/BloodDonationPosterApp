<template>
  <div class="story-poster-root" ref="posterEl">
    <!-- 1. Top Luminous Studio Canvas -->
    <div class="story-top-canvas">
      <!-- Ambient Studio Spotlight Glow -->
      <div class="story-spotlight-top" aria-hidden="true"></div>

      <!-- Top Branded Floating Capsule -->
      <header class="story-header-capsule">
        <div class="story-logo-medallion">
          <div class="story-logo-gold-ring">
            <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="story-logo-img" />
            <div v-else class="story-logo-fallback">
              <span class="fallback-icon">🩸</span>
            </div>
          </div>
        </div>

        <div class="story-org-info">
          <div class="story-title-row">
            <h1 
              class="story-org-title" 
              :style="{ fontSize: orgNameFontSize }"
              :title="data.orgName || (isBn ? 'সংগঠনের নাম' : 'ORGANIZATION NAME')"
            >
              {{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'ORGANIZATION NAME') }}
            </h1>
            <span class="story-verified-badge" title="Verified Volunteer Org">✓</span>
          </div>

          <div v-if="data.orgSubtitle" class="story-org-subtitle">
            {{ data.orgSubtitle }}
          </div>
        </div>

        <div class="story-hashtag-pill">
          #SaveLife
        </div>
      </header>

      <!-- Slogan Banner Ribbon -->
      <div class="story-motto-banner">
        <span class="motto-accent-quote">“</span>
        <span class="motto-text">
          {{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Standing beside patients in need') }}
        </span>
        <span class="motto-accent-quote">”</span>
      </div>
    </div>

    <!-- 2. Dynamic Photoshop Wave Transition Divider -->
    <div class="story-wave-divider" aria-hidden="true">
      <svg viewBox="0 0 540 80" preserveAspectRatio="none" class="story-wave-svg">
        <defs>
          <linearGradient id="storyWaveRuby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#b91c1c" />
            <stop offset="50%" stop-color="#88080f" />
            <stop offset="100%" stop-color="#550307" />
          </linearGradient>
          <linearGradient id="storyWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#d97706" />
            <stop offset="50%" stop-color="#fef08a" />
            <stop offset="100%" stop-color="#f59e0b" />
          </linearGradient>
        </defs>
        <!-- Shadow wave layer -->
        <path d="M0,25 C140,65 340,10 540,45 L540,80 L0,80 Z" fill="rgba(0, 0, 0, 0.35)" />
        <!-- 3D Gold Accent ridge -->
        <path d="M0,28 C140,68 340,13 540,48 L540,52 C340,17 140,72 0,32 Z" fill="url(#storyWaveGold)" />
        <!-- Main Ruby wave -->
        <path d="M0,32 C140,72 340,17 540,52 L540,80 L0,80 Z" fill="url(#storyWaveRuby)" />
      </svg>
    </div>

    <!-- 3. Center Overlapping Studio Photo Stage -->
    <div class="story-photo-stage">
      <!-- Radial Halo Backlight behind photo -->
      <div class="story-photo-halo" aria-hidden="true"></div>

      <!-- 3D Gold & Ruby Beveled Frame -->
      <div class="story-photo-frame">
        <div class="story-photo-inner">
          <img 
            v-if="donorPhotoSrc"
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="story-donor-img"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
          <div v-else class="story-photo-placeholder">
            <svg class="placeholder-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
            <span class="placeholder-prompt">{{ isBn ? 'ছবি যুক্ত করুন' : 'Add Photo' }}</span>
          </div>
        </div>
      </div>

      <!-- Overlapping Badge 1: 3D Glossy Blood Group Sphere (Top-Right) -->
      <div class="story-blood-badge">
        <div class="story-sphere-glare" aria-hidden="true"></div>
        <span class="sbg-val">{{ data.bloodGroup || 'O+' }}</span>
        <span class="sbg-tag">{{ isBn ? 'ব্লাড গ্রুপ' : 'BLOOD' }}</span>
      </div>

      <!-- Overlapping Badge 2: 3D Gold Ribbon Donation Frequency (Bottom-Left) -->
      <div class="story-count-ribbon">
        <span class="scount-star">★</span>
        <span class="scount-val">{{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Time Donor') }}</span>
        <span class="scount-star">★</span>
      </div>
    </div>

    <!-- 4. Bottom Deep Royal Crimson Section with Glass Recognition Plaque -->
    <div class="story-bottom-canvas">
      <!-- Ambient Curved Light Watermark -->
      <div class="story-watermark-fx" aria-hidden="true">
        <svg viewBox="0 0 540 400" preserveAspectRatio="none" class="story-bg-svg">
          <path d="M-50,150 Q270,300 590,100 L590,400 L-50,400 Z" fill="rgba(0, 0, 0, 0.18)" />
          <path d="M-50,80 Q270,240 590,40" stroke="rgba(251, 191, 36, 0.08)" stroke-width="2" fill="none" />
        </svg>
      </div>

      <!-- Sculpted Glass Donor Recognition Block -->
      <div class="story-donor-block">
        <!-- Golden Star Kicker Ribbon -->
        <div class="story-honor-badge">
          <span class="badge-star">★</span>
          <span class="badge-text">{{ isBn ? '— গর্বিত রক্তযোদ্ধা —' : '— PROUD BLOOD HERO —' }}</span>
          <span class="badge-star">★</span>
        </div>

        <!-- Donor Full Name -->
        <h2 class="story-donor-name" :title="data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name')">
          {{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}
        </h2>

        <!-- Inspirational Quote -->
        <div class="story-quote-box">
          <p class="story-donor-quote">
            “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
          </p>
        </div>

        <!-- Meta Pills Row (Date & Collector) -->
        <div class="story-pills-row">
          <div class="spill-item">
            <span class="spill-icon">📅</span>
            <span class="spill-text">{{ formattedDate }}</span>
          </div>

          <div v-if="hasReference" class="spill-item ref-item">
            <span class="spill-icon">🤝</span>
            <span class="spill-text">{{ isBn ? 'সংগ্রাহক:' : 'Ref:' }} {{ data.referenceName }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Slogan Ribbon Base -->
      <footer class="story-footer-bar">
        <div class="story-footer-line" aria-hidden="true"></div>
        <div class="story-footer-content">
          <span class="footer-drop-icon">🩸</span>
          <span class="footer-motto-text">
            {{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান • জীবন বাঁচান' : 'Donate Blood, Save Lives') }}
          </span>
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
  if (!props.data.donationDate) return isBn.value ? '১২-১০-২০২৬' : '12-10-2026';
  return formatBengaliDate(props.data.donationDate, isBn.value);
});

// Adaptive font sizing so long organization names fit cleanly in 1 line
const orgNameFontSize = computed(() => {
  const len = (props.data.orgName || '').length;
  if (len > 45) return '0.78rem';
  if (len > 32) return '0.88rem';
  if (len > 22) return '1.05rem';
  return '1.22rem';
});
</script>

<style scoped>
.story-poster-root {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  background: #3b0205;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
  border: 4px solid #b91c1c;
}

/* =========================================================
   1. TOP LUMINOUS STUDIO CANVAS (Ivory-Pearl Lighting)
   ========================================================= */
.story-top-canvas {
  position: relative;
  height: 34%;
  background: linear-gradient(175deg, #ffffff 0%, #fdf8f6 55%, #f7ebe8 100%);
  padding: 1rem 1.15rem 0.5rem 1.15rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 2;
}

.story-spotlight-top {
  position: absolute;
  top: -30px;
  left: 20%;
  width: 320px;
  height: 180px;
  background: radial-gradient(ellipse, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

/* Top Branded Floating Capsule */
.story-header-capsule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.65rem;
  background: #ffffff;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: 1.5px solid #fecaca;
  box-shadow: 0 6px 18px rgba(185, 28, 28, 0.12), 0 0 0 1px rgba(254, 202, 202, 0.6);
  z-index: 4;
}

.story-logo-medallion {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.story-logo-gold-ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ffffff;
  padding: 2px;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15), 0 0 0 2px #f59e0b;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.story-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.story-logo-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, #fee2e2 0%, #fecaca 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.fallback-icon {
  font-size: 1.3rem;
}

.story-org-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.story-title-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
}

.story-org-title {
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
  font-weight: 900;
  color: #b90e17;
  line-height: 1.15;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 2px rgba(185, 14, 23, 0.15);
}

.story-verified-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #2563eb;
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 0 1px 4px rgba(37, 99, 235, 0.4);
}

.story-org-subtitle {
  font-size: 0.76rem;
  font-weight: 700;
  color: #475569;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1px;
}

.story-hashtag-pill {
  background: linear-gradient(135deg, #ef4444, #b91c1c);
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(220, 38, 38, 0.35);
  flex-shrink: 0;
  letter-spacing: 0.3px;
}

/* Slogan Banner Ribbon */
.story-motto-banner {
  margin-top: 0.75rem;
  background: rgba(254, 226, 226, 0.65);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 12px;
  padding: 0.4rem 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  box-shadow: 0 2px 8px rgba(185, 28, 28, 0.05);
}

.motto-accent-quote {
  font-family: 'Tiro Bangla', serif;
  font-size: 1.15rem;
  font-weight: 900;
  color: #b90e17;
  line-height: 1;
}

.motto-text {
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-size: 0.95rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* =========================================================
   2. DYNAMIC WAVE DIVIDER (Photoshop Layered Vector)
   ========================================================= */
.story-wave-divider {
  position: absolute;
  top: calc(34% - 20px);
  left: 0;
  width: 100%;
  height: 42px;
  pointer-events: none;
  z-index: 3;
}

.story-wave-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* =========================================================
   3. CENTER OVERLAPPING STUDIO PHOTO STAGE
   ========================================================= */
.story-photo-stage {
  position: absolute;
  top: 24%;
  left: 50%;
  transform: translateX(-50%);
  width: 260px;
  height: 260px;
  z-index: 5;
}

.story-photo-halo {
  position: absolute;
  inset: -14px;
  border-radius: 30px;
  background: radial-gradient(circle, rgba(254, 240, 138, 0.35) 0%, rgba(220, 38, 38, 0.25) 55%, transparent 75%);
  filter: blur(14px);
  pointer-events: none;
}

.story-photo-frame {
  width: 100%;
  height: 100%;
  border-radius: 26px;
  padding: 4px;
  background: linear-gradient(135deg, #fef08a 0%, #d97706 40%, #b45309 80%, #fef08a 100%);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65), 0 0 0 2px rgba(185, 28, 28, 0.4);
  box-sizing: border-box;
}

.story-photo-inner {
  width: 100%;
  height: 100%;
  border-radius: 22px;
  overflow: hidden;
  background: #111827;
  position: relative;
}

.story-donor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
}

.story-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1f2937, #111827);
  color: #94a3b8;
  gap: 0.5rem;
}

.placeholder-avatar-svg {
  width: 72px;
  height: 72px;
  opacity: 0.45;
}

.placeholder-prompt {
  font-size: 0.85rem;
  font-weight: 700;
  color: #cbd5e1;
}

/* Overlapping 1: 3D Glossy Blood Group Sphere (Top-Right) */
.story-blood-badge {
  position: absolute;
  top: -12px;
  right: -16px;
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #ff4b55 0%, #dc2626 55%, #7f0d14 100%);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.55), 0 0 0 3px #ffffff, 0 0 0 5px #d97706;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 7;
  overflow: hidden;
}

.story-sphere-glare {
  position: absolute;
  top: 4px;
  left: 14px;
  width: 34px;
  height: 15px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-25deg);
  pointer-events: none;
}

.sbg-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.95rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 0.95;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}

.sbg-tag {
  font-size: 0.52rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 1px;
}

/* Overlapping 2: 3D Gold Ribbon Donation Frequency (Bottom-Left) */
.story-count-ribbon {
  position: absolute;
  bottom: -10px;
  left: -20px;
  background: linear-gradient(135deg, #d97706 0%, #fbbf24 35%, #f59e0b 70%, #b45309 100%);
  border: 1.5px solid #ffffff;
  padding: 0.32rem 0.85rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.6);
  z-index: 7;
}

.scount-star {
  font-size: 0.85rem;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.scount-val {
  font-size: 0.86rem;
  font-weight: 900;
  color: #451a03;
  letter-spacing: 0.2px;
  white-space: nowrap;
}

/* =========================================================
   4. BOTTOM ROYAL CRIMSON SECTION (Glass Recognition Plaque)
   ========================================================= */
.story-bottom-canvas {
  position: relative;
  flex: 1;
  background: radial-gradient(ellipse at 50% 40%, #850b12 0%, #5c0408 55%, #350104 100%);
  padding: 4.8rem 1.15rem 0.75rem 1.15rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
}

.story-watermark-fx {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.story-bg-svg {
  width: 100%;
  height: 100%;
}

.story-donor-block {
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(251, 191, 36, 0.35);
  border-radius: 20px;
  padding: 0.85rem 1rem 0.95rem 1rem;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  z-index: 4;
}

.story-honor-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.25), transparent);
  padding: 0.15rem 0.75rem;
}

.badge-star {
  color: #fbbf24;
  font-size: 0.75rem;
}

.badge-text {
  font-size: 0.82rem;
  font-weight: 800;
  color: #fde047;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.story-donor-name {
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  margin: 0.25rem 0 0.35rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65), 0 0 14px rgba(254, 202, 202, 0.3);
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-quote-box {
  margin: 0.25rem auto 0 auto;
  max-width: 440px;
}

.story-donor-quote {
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-size: 0.96rem;
  font-weight: 700;
  color: #fef08a;
  line-height: 1.3;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.story-pills-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.65rem;
}

.spill-item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(251, 191, 36, 0.45);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #f8fafc;
}

.spill-icon {
  font-size: 0.76rem;
}

.ref-item {
  color: #fde047;
}

/* Bottom Slogan Ribbon Base */
.story-footer-bar {
  position: relative;
  background: linear-gradient(135deg, #2a0103 0%, #400205 50%, #1e0002 100%);
  padding: 0.65rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(251, 191, 36, 0.35);
  margin-top: 0.65rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
  z-index: 4;
}

.story-footer-line {
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #fbbf24, transparent);
}

.story-footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
}

.footer-drop-icon {
  font-size: 0.85rem;
}

.footer-motto-text {
  font-size: 0.82rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
