<template>
  <div class="ed-press-root" ref="posterEl">
    <div class="ed-press-canvas">
      
      <!-- Top Press Header Bar -->
      <header class="ed-top-banner">
        <div class="ed-banner-left">
          <div class="ed-logo-circle">
            <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="ed-logo-img" />
            <span v-else class="ed-logo-fallback">🩸</span>
          </div>
          <div class="ed-banner-titles">
            <h1 class="ed-press-org-name">{{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'ORGANIZATION NAME') }}</h1>
            <p v-if="data.orgSubtitle" class="ed-press-subtitle">{{ data.orgSubtitle }}</p>
          </div>
        </div>

        <!-- Blood Group Bold Stamp -->
        <div class="ed-blood-stamp">
          <span class="stamp-bg-letter">{{ data.bloodGroup || 'O+' }}</span>
          <span class="stamp-bg-text">{{ isBn ? 'ব্লাড গ্রুপ' : 'BLOOD' }}</span>
        </div>
      </header>

      <!-- Headline Motto Line -->
      <div class="ed-kicker-strip">
        <span class="kicker-lead">★ {{ isBn ? 'মানবতার কল্যাণে রক্তদান' : 'DONATE BLOOD, SAVE LIVES' }} ★</span>
        <span class="kicker-motto">“{{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Standing beside critical patients in need') }}”</span>
      </div>

      <!-- Main Layout: Photo + Editorial Profile -->
      <main class="ed-main-grid">
        <!-- Left: Photo Column with Badges -->
        <div class="ed-photo-col">
          <div class="ed-photo-card">
            <img 
              v-if="donorPhotoSrc"
              :src="donorPhotoSrc" 
              alt="Donor" 
              class="ed-photo-img"
              :style="{
                transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
              }"
            />
            <div v-else class="ed-photo-placeholder">
              <svg class="placeholder-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
              </svg>
              <span class="placeholder-prompt">{{ isBn ? 'ছবি যুক্ত করুন' : 'Add Photo' }}</span>
            </div>
          </div>

          <!-- Donation Count Ribbon -->
          <div class="ed-count-badge">
            <span class="count-icon">🏅</span>
            <span class="count-txt">{{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Blood Donation') }}</span>
          </div>
        </div>

        <!-- Right: Donor Editorial Details -->
        <div class="ed-details-col">
          <div class="ed-tribute-kicker">
            {{ isBn ? 'সম্মানিত রক্তযোদ্ধা' : 'HONORABLE BLOOD DONOR' }}
          </div>

          <h2 class="ed-donor-hero-name">
            {{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}
          </h2>

          <!-- Pull Quote Block -->
          <div class="ed-quote-box">
            <div class="quote-bar"></div>
            <p class="quote-content">
              “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
            </p>
          </div>

          <!-- Meta Data Grid -->
          <div class="ed-data-meta">
            <div class="meta-data-item">
              <span class="meta-label">📅 {{ isBn ? 'তারিখ:' : 'Date:' }}</span>
              <span class="meta-value">{{ formattedDate }}</span>
            </div>

            <div v-if="hasReference" class="meta-data-item ref-item">
              <span class="meta-label">🤝 {{ isBn ? 'সংগ্রাহক:' : 'Ref:' }}</span>
              <span class="meta-value">{{ data.referenceName }}</span>
            </div>
          </div>
        </div>
      </main>

      <!-- Bottom Press Footer -->
      <footer class="ed-bottom-bar">
        <div class="ed-footer-slogan">
          {{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান • একটি রক্তবিন্দু, একটি হাসিমুখ' : 'Voluntary Blood Donation • Serve Humanity') }}
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
  const parts = props.data.donationDate.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return props.data.donationDate;
});
</script>

<style scoped>
.ed-press-root {
  position: relative;
  width: 100%;
  aspect-ratio: 10 / 14.1;
  background: #0f172a;
  padding: 6px;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
}

.ed-press-canvas {
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border: 1px solid #cbd5e1;
}

/* TOP PRESS BANNER */
.ed-top-banner {
  background: linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #dc2626 100%);
  padding: 0.9rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 14px rgba(185, 28, 28, 0.25);
  border-bottom: 3px solid #f59e0b;
}

.ed-banner-left {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex: 1;
}

.ed-logo-circle {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #ffffff;
  padding: 2px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ed-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.ed-logo-fallback {
  font-size: 1.6rem;
}

.ed-banner-titles {
  flex: 1;
}

.ed-press-org-name {
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
  font-size: 1.38rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  letter-spacing: -0.2px;
  text-transform: uppercase;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.ed-press-subtitle {
  font-size: 0.82rem;
  color: #fef08a;
  font-weight: 700;
  margin: 0.15rem 0 0 0;
}

/* BLOOD STAMP */
.ed-blood-stamp {
  background: radial-gradient(circle at 35% 35%, #ffffff 0%, #fef2f2 60%, #fee2e2 100%);
  border: 2.5px solid #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  padding: 0.35rem 0.85rem;
  text-align: center;
  flex-shrink: 0;
}

.stamp-bg-letter {
  display: block;
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: #b91c1c;
  line-height: 1;
}

.stamp-bg-text {
  display: block;
  font-size: 0.55rem;
  font-weight: 900;
  color: #991b1b;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

/* KICKER MOTTO STRIP */
.ed-kicker-strip {
  background: #f8fafc;
  border-bottom: 1.5px solid #e2e8f0;
  padding: 0.45rem 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.kicker-lead {
  font-size: 0.76rem;
  font-weight: 900;
  color: #b91c1c;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.kicker-motto {
  font-size: 0.82rem;
  font-weight: 700;
  color: #334155;
  font-style: italic;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* MAIN EDITORIAL GRID */
.ed-main-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1.4rem;
  padding: 1.2rem;
  align-items: center;
  box-sizing: border-box;
}

/* PHOTO COLUMN */
.ed-photo-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.ed-photo-card {
  width: 210px;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  border: 4px solid #ffffff;
  outline: 2px solid #b91c1c;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.22);
  background: #f1f5f9;
}

.ed-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.ed-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  color: #94a3b8;
  gap: 0.5rem;
}

.placeholder-avatar-svg {
  width: 68px;
  height: 68px;
  opacity: 0.6;
}

.placeholder-prompt {
  font-size: 0.75rem;
  font-weight: 700;
  color: #b91c1c;
  background: #ffffff;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  border: 1px dashed #fca5a5;
}

.ed-count-badge {
  position: absolute;
  bottom: -12px;
  background: #991b1b;
  color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 999px;
  padding: 0.25rem 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.82rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(153, 27, 27, 0.35);
  white-space: nowrap;
}

/* DETAILS COLUMN */
.ed-details-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ed-tribute-kicker {
  font-size: 0.82rem;
  font-weight: 900;
  color: #b91c1c;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.ed-donor-hero-name {
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.15;
  margin: 0.25rem 0 0.5rem 0;
  letter-spacing: -0.2px;
}

.ed-quote-box {
  display: flex;
  align-items: stretch;
  gap: 0.8rem;
  background: #fff5f5;
  border: 1px solid #fecaca;
  padding: 0.65rem 0.9rem;
  border-radius: 8px;
  margin-bottom: 0.8rem;
}

.quote-bar {
  width: 4px;
  background: #b91c1c;
  border-radius: 2px;
  flex-shrink: 0;
}

.quote-content {
  font-size: 0.85rem;
  color: #334155;
  font-style: italic;
  line-height: 1.4;
  margin: 0;
}

.ed-data-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.meta-data-item {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.35rem 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
}

.meta-label {
  font-weight: 700;
  color: #64748b;
}

.meta-value {
  font-weight: 800;
  color: #0f172a;
}

/* BOTTOM PRESS FOOTER */
.ed-bottom-bar {
  background: #0f172a;
  border-top: 2px solid #b91c1c;
  padding: 0.65rem 1rem;
  text-align: center;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1);
}

.ed-footer-slogan {
  font-size: 0.86rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.4px;
}
</style>
