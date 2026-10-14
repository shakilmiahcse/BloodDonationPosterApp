<template>
  <div class="tm-root" ref="posterEl">
    <!-- Ambient Studio Spotlight Backdrop -->
    <div class="tm-ambient-glow" aria-hidden="true"></div>

    <!-- Decorative Vector Wave & Guilloche Lines -->
    <div class="tm-bg-curves" aria-hidden="true">
      <svg viewBox="0 0 540 760" preserveAspectRatio="none" class="tm-svg-curves">
        <path d="M-40,120 Q270,40 580,180 L580,780 L-40,780 Z" fill="rgba(0, 0, 0, 0.22)" />
        <path d="M-40,240 Q220,160 580,280" stroke="rgba(251, 191, 36, 0.18)" stroke-width="2.5" fill="none" />
        <path d="M-40,250 Q230,170 580,290" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1.2" fill="none" />
        <circle cx="270" cy="380" r="280" fill="none" stroke="rgba(251, 191, 36, 0.04)" stroke-width="60" />
      </svg>
    </div>

    <!-- 1. Top Architectural Header Banner (3D Sculpted Ribbon) -->
    <header class="tm-header">
      <div class="tm-header-gold-rim" aria-hidden="true"></div>
      
      <div class="tm-header-content">
        <!-- Branded Circular Logo Medallion -->
        <div class="tm-logo-wrap">
          <div class="tm-logo-gold-bezel">
            <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="tm-logo-img" />
            <div v-else class="tm-logo-emblem">
              <span class="emblem-drop">🩸</span>
              <span class="emblem-txt">{{ isBn ? 'ব্লাড' : 'BLOOD' }}</span>
            </div>
          </div>
        </div>

        <!-- Organization Typography Info -->
        <div class="tm-header-text">
          <h1 
            class="tm-org-title" 
            :style="{ fontSize: orgNameFontSize }"
            :title="data.orgName || (isBn ? 'সংগঠনের নাম' : 'Organization Name')"
          >
            {{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'Organization Name') }}
          </h1>

          <div v-if="data.orgSubtitle" class="tm-org-subtitle">
            {{ data.orgSubtitle }}
          </div>

          <!-- Glowing Ribbon Motto Tag -->
          <div class="tm-header-pill">
            <span class="tm-pill-star">★</span>
            <span class="tm-pill-text">
              {{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Standing beside patients in need') }}
            </span>
            <span class="tm-pill-star">★</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 2. Center Stage with Studio Photo & Overlapping 3D Badges -->
    <main class="tm-main">
      <div class="tm-photo-hero-stage">
        <!-- Radial Spotlight Halo behind Photo -->
        <div class="tm-photo-halo" aria-hidden="true"></div>

        <!-- 3D Gold & Ruby Beveled Frame -->
        <div class="tm-photo-frame">
          <div class="tm-photo-inner">
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
        </div>

        <!-- Overlapping Badge 1: 3D Glossy Blood Group Sphere (Top-Right) -->
        <div class="tm-blood-circle">
          <div class="tm-blood-glare" aria-hidden="true"></div>
          <div class="tm-bg-val">{{ data.bloodGroup || 'O+' }}</div>
          <div class="tm-bg-tag">{{ isBn ? 'ব্লাড গ্রুপ' : 'BLOOD' }}</div>
        </div>

        <!-- Overlapping Badge 2: 3D Gold Ribbon Donation Frequency (Bottom-Left) -->
        <div class="tm-count-ribbon">
          <span class="tm-ribbon-wing left" aria-hidden="true"></span>
          <div class="tm-ribbon-body">
            <span class="tm-ribbon-star">★</span>
            <span class="tm-ribbon-text">{{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Time Donor') }}</span>
            <span class="tm-ribbon-star">★</span>
          </div>
          <span class="tm-ribbon-wing right" aria-hidden="true"></span>
        </div>

        <!-- Overlapping Badge 3: Frosted Date Capsule (Bottom-Right) -->
        <div class="tm-date-pill">
          <span class="tm-cal-icon">📅</span>
          <span class="tm-date-text">{{ formattedDate }}</span>
        </div>
      </div>

      <!-- 3. Sculpted Donor Honor Plaque (Photoshop Layered Glass Plate) -->
      <div class="tm-donor-plaque">
        <!-- Metallic Golden Title Kicker -->
        <div class="tm-honor-ribbon">
          <span class="ribbon-filigree">❖</span>
          <span class="ribbon-text">{{ isBn ? 'সম্মানিত রক্তযোদ্ধা' : 'HONORABLE BLOOD DONOR' }}</span>
          <span class="ribbon-filigree">❖</span>
        </div>

        <!-- Donor Full Name -->
        <h2 class="tm-donor-name" :title="data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name')">
          {{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}
        </h2>

        <!-- Motivational Quote in Stylized Quotes -->
        <div class="tm-quote-wrapper">
          <p class="tm-donor-quote">
            “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
          </p>
        </div>

        <!-- Optional Collector / Reference Pill -->
        <div v-if="hasReference" class="tm-ref-box">
          <span class="ref-label">🤝 {{ isBn ? 'সংগ্রাহক:' : 'Ref:' }}</span>
          <span class="ref-val">{{ data.referenceName }}</span>
        </div>
      </div>
    </main>

    <!-- 4. Deep Burgundy & Gold Base Footer -->
    <footer class="tm-footer">
      <div class="tm-footer-accent-line" aria-hidden="true"></div>
      <div class="tm-footer-content">
        <span class="footer-heart-icon">❤️</span>
        <span class="tm-footer-text">
          {{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান • একটি জীবন বাঁচান' : 'Voluntary Blood Donation • Save Lives') }}
        </span>
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
  if (!props.data.donationDate) return isBn.value ? '১২-১০-২০২৬' : '12-10-2026';
  return formatBengaliDate(props.data.donationDate, isBn.value);
});

// Adaptive font sizing for organization name
const orgNameFontSize = computed(() => {
  const len = (props.data.orgName || '').length;
  if (!len) return '1.4rem';
  if (len <= 16) return '1.48rem';
  if (len <= 26) return '1.32rem';
  if (len <= 38) return '1.18rem';
  if (len <= 50) return '1.02rem';
  return '0.88rem';
});
</script>

<style scoped>
.tm-root {
  position: relative;
  width: 100%;
  aspect-ratio: 10 / 14.1;
  background: radial-gradient(ellipse at 50% 30%, #a80c14 0%, #76060c 55%, #470206 100%);
  color: #ffffff;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65);
  border: 4px solid #b91c1c;
}

/* Ambient Radial Glow Lighting */
.tm-ambient-glow {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(254, 202, 202, 0.22) 0%, rgba(220, 38, 38, 0.1) 45%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.tm-bg-curves {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.tm-svg-curves {
  width: 100%;
  height: 100%;
}

/* =========================================================
   1. TOP ARCHITECTURAL HEADER (3D Sculpted Ribbon)
   ========================================================= */
.tm-header {
  position: relative;
  background: linear-gradient(135deg, #4f0307 0%, #85080e 40%, #a80b13 70%, #660409 100%);
  padding: 0.95rem 1.15rem 1.1rem 1.15rem;
  box-sizing: border-box;
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.45), 0 2px 0 rgba(251, 191, 36, 0.35);
  z-index: 5;
}

.tm-header-gold-rim {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #d97706, #fef08a 35%, #f59e0b 70%, #d97706);
  border-bottom-left-radius: 22px;
  border-bottom-right-radius: 22px;
}

.tm-header-content {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

/* 3D Gold Logo Medallion */
.tm-logo-wrap {
  width: 86px;
  height: 86px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tm-logo-gold-bezel {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ffffff;
  padding: 3px;
  box-sizing: border-box;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.45), 0 0 0 2.5px #f59e0b, 0 0 12px rgba(245, 158, 11, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.tm-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.tm-logo-emblem {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffffff 0%, #fee2e2 70%, #fecaca 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.emblem-drop {
  font-size: 1.8rem;
  line-height: 1;
}

.emblem-txt {
  font-size: 0.6rem;
  font-weight: 900;
  color: #b90e17;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.tm-header-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.tm-org-title {
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.6), 0 0 10px rgba(254, 202, 202, 0.25);
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  letter-spacing: 0.2px;
}

.tm-org-subtitle {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fde047;
  margin-top: 0.15rem;
  line-height: 1.2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.tm-header-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(251, 191, 36, 0.6);
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
  margin-top: 0.35rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  max-width: 100%;
}

.tm-pill-star {
  font-size: 0.72rem;
  color: #fde047;
}

.tm-pill-text {
  font-size: 0.74rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* =========================================================
   2. CENTER STAGE (Studio Photo & Overlapping 3D Badges)
   ========================================================= */
.tm-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.15rem;
  position: relative;
  z-index: 2;
}

.tm-photo-hero-stage {
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0 auto;
}

.tm-photo-halo {
  position: absolute;
  inset: -15px;
  border-radius: 28px;
  background: radial-gradient(circle, rgba(254, 240, 138, 0.35) 0%, rgba(239, 68, 68, 0.2) 60%, transparent 80%);
  filter: blur(12px);
  pointer-events: none;
}

.tm-photo-frame {
  width: 100%;
  height: 100%;
  border-radius: 24px;
  padding: 4px;
  background: linear-gradient(135deg, #fef08a 0%, #d97706 40%, #b45309 80%, #fef08a 100%);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.6), 0 0 0 2px rgba(185, 28, 28, 0.5);
  box-sizing: border-box;
}

.tm-photo-inner {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  background: #111827;
  position: relative;
}

.tm-donor-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
}

.tm-photo-placeholder {
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

/* OVERLAPPING 1: 3D Glossy Blood Group Sphere (Top-Right) */
.tm-blood-circle {
  position: absolute;
  top: -12px;
  right: -16px;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: radial-gradient(circle at 32% 28%, #ff4b55 0%, #dc2626 55%, #7f0d14 100%);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.55), 0 0 0 3px #ffffff, 0 0 0 5px #d97706;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 6;
  overflow: hidden;
}

.tm-blood-glare {
  position: absolute;
  top: 4px;
  left: 14px;
  width: 32px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(-25deg);
  pointer-events: none;
}

.tm-bg-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.85rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 0.95;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
}

.tm-bg-tag {
  font-size: 0.52rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 1px;
}

/* OVERLAPPING 2: 3D Sculpted Gold Ribbon (Bottom-Left) */
.tm-count-ribbon {
  position: absolute;
  bottom: -10px;
  left: -20px;
  display: flex;
  align-items: center;
  z-index: 6;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.5));
}

.tm-ribbon-body {
  background: linear-gradient(135deg, #d97706 0%, #fbbf24 35%, #f59e0b 70%, #b45309 100%);
  border: 1.5px solid #ffffff;
  padding: 0.32rem 0.85rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.tm-ribbon-star {
  font-size: 0.85rem;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.tm-ribbon-text {
  font-size: 0.86rem;
  font-weight: 900;
  color: #451a03;
  letter-spacing: 0.2px;
  white-space: nowrap;
}

/* OVERLAPPING 3: Frosted Date Pill (Bottom-Right) */
.tm-date-pill {
  position: absolute;
  bottom: -8px;
  right: -12px;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(251, 191, 36, 0.6);
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.45);
  z-index: 6;
}

.tm-cal-icon {
  font-size: 0.76rem;
}

.tm-date-text {
  font-size: 0.74rem;
  font-weight: 700;
  color: #f8fafc;
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
}

/* =========================================================
   3. SCULPTED DONOR HONOR PLAQUE (Layered Glass Plate)
   ========================================================= */
.tm-donor-plaque {
  width: 100%;
  margin-top: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
  backdrop-filter: blur(12px);
  border: 1.5px solid rgba(251, 191, 36, 0.35);
  border-radius: 18px;
  padding: 0.75rem 1rem 0.85rem 1rem;
  box-sizing: border-box;
  text-align: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.tm-honor-ribbon {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.25), transparent);
  padding: 0.15rem 0.8rem;
  margin-bottom: 0.2rem;
}

.ribbon-filigree {
  color: #fbbf24;
  font-size: 0.72rem;
}

.ribbon-text {
  font-size: 0.78rem;
  font-weight: 800;
  color: #fde047;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.tm-donor-name {
  font-size: 1.65rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  margin: 0.15rem 0 0.35rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.65), 0 0 14px rgba(254, 202, 202, 0.3);
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tm-quote-wrapper {
  margin: 0.25rem auto 0 auto;
  max-width: 440px;
}

.tm-donor-quote {
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-size: 0.95rem;
  font-weight: 700;
  color: #fef08a;
  line-height: 1.3;
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

.tm-ref-box {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(251, 191, 36, 0.45);
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  margin-top: 0.5rem;
}

.ref-label {
  font-size: 0.76rem;
  color: #fde047;
  font-weight: 700;
}

.ref-val {
  font-size: 0.78rem;
  color: #ffffff;
  font-weight: 800;
}

/* =========================================================
   4. DEEP BURGUNDY & GOLD FOOTER
   ========================================================= */
.tm-footer {
  position: relative;
  background: linear-gradient(135deg, #300204 0%, #450307 50%, #200103 100%);
  padding: 0.65rem 1.15rem;
  border-top: 1.5px solid rgba(251, 191, 36, 0.4);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  z-index: 5;
}

.tm-footer-accent-line {
  position: absolute;
  top: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(90deg, transparent, #fbbf24, transparent);
}

.tm-footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
}

.footer-heart-icon {
  font-size: 0.85rem;
}

.tm-footer-text {
  font-size: 0.82rem;
  font-weight: 800;
  color: #f8fafc;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}
</style>
