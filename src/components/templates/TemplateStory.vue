<template>
  <div class="story-poster-root" ref="posterEl">
    <!-- Top Ivory Section -->
    <div class="story-top-canvas">
      <!-- Branded Header -->
      <header class="story-header">
        <div class="story-org-chip">
          <div class="story-logo-circle">
            <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="story-logo-img" />
            <span v-else class="story-logo-placeholder">🩸</span>
          </div>
          <span class="story-org-title">{{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'ORGANIZATION NAME') }}</span>
        </div>
        <div class="story-save-tag">#SaveLife</div>
      </header>

      <!-- Slogan Banner -->
      <div class="story-quote-strip">
        <span class="strip-quote">“{{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Beside critical patients in need') }}”</span>
      </div>
    </div>

    <!-- Center Overlapping Photo Stage -->
    <div class="story-photo-stage">
      <div class="story-photo-frame">
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

      <!-- Blood Group Badge (Top-Right) -->
      <div class="story-blood-badge">
        <span class="sbg-val">{{ data.bloodGroup || 'O+' }}</span>
        <span class="sbg-tag">{{ isBn ? 'ব্লাড গ্রুপ' : 'BLOOD' }}</span>
      </div>

      <!-- Count Badge (Bottom-Left) -->
      <div class="story-count-badge">
        <span class="scount-star">★</span>
        <span class="scount-val">{{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Time') }}</span>
      </div>
    </div>

    <!-- Bottom Deep Crimson Section -->
    <div class="story-bottom-canvas">
      <!-- Donor Honor Section -->
      <div class="story-donor-block">
        <div class="story-honor-badge">
          ★ {{ isBn ? '— গর্বিত রক্তযোদ্ধা —' : '— PROUD BLOOD DONOR —' }} ★
        </div>

        <h2 class="story-donor-name">
          {{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}
        </h2>

        <p class="story-donor-quote">
          “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
        </p>

        <!-- Meta Info Pills -->
        <div class="story-pills-row">
          <div class="spill-item">
            <span>📅 {{ formattedDate }}</span>
          </div>

          <div v-if="hasReference" class="spill-item ref-item">
            <span>🤝 {{ isBn ? 'সংগ্রাহক:' : 'Ref:' }} {{ data.referenceName }}</span>
          </div>
        </div>
      </div>

      <!-- Bottom Slogan Ribbon -->
      <footer class="story-footer-bar">
        <span>{{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান • জীবন বাঁচান' : 'Donate Blood, Save Lives') }}</span>
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
.story-poster-root {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 15.5;
  background: #0f172a;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
  border: 4px solid #b00c14;
}

/* TOP IVORY CANVAS */
.story-top-canvas {
  height: 38%;
  background: linear-gradient(180deg, #ffffff 0%, #fefcfb 60%, #fbf4f2 100%);
  padding: 1.1rem 1.2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  z-index: 2;
}

.story-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  background: #ffffff;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  border: 1.5px solid #fecaca;
  box-shadow: 0 4px 12px rgba(176, 12, 20, 0.08);
}

.story-org-chip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex: 1;
  min-width: 0;
}

.story-logo-circle {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ffffff;
  padding: 2px;
  border: 2px solid #b00c14;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.story-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.story-logo-placeholder {
  font-size: 1.3rem;
}

.story-org-title {
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 900;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-save-tag {
  font-size: 0.72rem;
  font-weight: 800;
  color: #b00c14;
  background: #fee2e2;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  border: 1px solid #fca5a5;
  white-space: nowrap;
}

.story-quote-strip {
  margin-top: 0.8rem;
  text-align: center;
  background: rgba(176, 12, 20, 0.06);
  border: 1px solid rgba(176, 12, 20, 0.15);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
}

.strip-quote {
  font-size: 0.78rem;
  font-weight: 800;
  color: #991b1b;
}

/* OVERLAPPING HERO PHOTO STAGE */
.story-photo-stage {
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 295px;
  z-index: 10;
}

.story-photo-frame {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 4.5px solid #ffffff;
  outline: 2px solid #b00c14;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
  background: #f1f5f9;
}

.story-donor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.story-photo-placeholder {
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
  width: 72px;
  height: 72px;
  opacity: 0.6;
}

.placeholder-prompt {
  font-size: 0.76rem;
  font-weight: 700;
  color: #b00c14;
  background: #ffffff;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  border: 1px dashed #fca5a5;
}

/* BLOOD GROUP CIRCLE (Top-Right) */
.story-blood-badge {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #e11d48 0%, #b00c14 60%, #7f050b 100%);
  border: 3.5px solid #ffffff;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.42);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 12;
}

.sbg-val {
  font-family: 'Outfit', sans-serif;
  font-size: 2.1rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
}

.sbg-tag {
  font-size: 0.52rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

/* COUNT BADGE (Bottom-Left) */
.story-count-badge {
  position: absolute;
  bottom: -10px;
  left: -12px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #ffffff;
  border: 3px solid #ffffff;
  border-radius: 999px;
  padding: 0.35rem 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  z-index: 12;
}

.scount-star {
  font-size: 0.82rem;
}

.scount-val {
  font-size: 0.85rem;
  font-weight: 800;
  white-space: nowrap;
}

/* BOTTOM CRIMSON CANVAS */
.story-bottom-canvas {
  height: 62%;
  background: linear-gradient(180deg, #b00c14 0%, #88070d 100%);
  padding: 6.8rem 1.4rem 1.1rem 1.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  z-index: 1;
}

.story-donor-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.story-honor-badge {
  font-size: 0.78rem;
  font-weight: 900;
  color: #fef08a;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.story-donor-name {
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.15;
  margin: 0.3rem 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
}

.story-donor-quote {
  font-size: 0.85rem;
  font-style: italic;
  color: #fef2f2;
  line-height: 1.35;
  margin: 0.1rem 0 0.7rem 0;
  max-width: 380px;
}

.story-pills-row {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: center;
}

.spill-item {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.78rem;
  font-weight: 700;
}

.story-footer-bar {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 0.6rem;
  width: 100%;
  font-size: 0.82rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.4px;
}
</style>
