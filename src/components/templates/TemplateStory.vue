<template>
  <div class="story-poster">
    <!-- Top Organization Banner with Circular Logo -->
    <header class="story-header">
      <div class="org-brand-chip">
        <div class="story-logo-box">
          <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="story-logo-img" />
          <span v-else class="story-logo-placeholder">🩸</span>
        </div>
        <span class="org-name-text">{{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'Organization Name') }}</span>
      </div>
      <div class="story-hashtag">#SaveLives</div>
    </header>

    <!-- Main Visual Content -->
    <main class="story-body">
      <!-- Big Slogan Banner -->
      <div class="quote-banner">
        <p class="quote-main">“{{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Beside critical patients in need of blood') }}”</p>
      </div>

      <!-- Hero Photo with Badges -->
      <div class="photo-hero-wrapper">
        <div class="photo-frame">
          <img 
            v-if="donorPhotoSrc"
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="donor-photo"
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

        <!-- Overlapping Blood Group Badge (Safely inside stage) -->
        <div class="story-bg-badge">
          <span class="bg-label">{{ isBn ? 'রক্তের গ্রুপ' : 'BLOOD' }}</span>
          <span class="bg-val">{{ data.bloodGroup || 'O+' }}</span>
        </div>

        <!-- Donation Count Sticker -->
        <div class="story-count-sticker">
          <span class="badge-num">🏅 {{ data.donationCount || (isBn ? '১ম বার' : '1st Time') }}</span>
          <span class="badge-lbl">{{ isBn ? 'রক্তদান' : 'Donation' }}</span>
        </div>
      </div>

      <!-- Donor Name Card -->
      <div class="donor-name-banner">
        <div class="donor-hero-tag">★ 🌟 {{ isBn ? 'গর্বিত রক্তযোদ্ধা' : 'PROUD BLOOD DONOR' }} 🌟 ★</div>
        <h2 class="name-text">{{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}</h2>
        <p class="sub-quote">“{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”</p>
      </div>
    </main>

    <!-- Bottom Meta Footer -->
    <footer class="story-footer">
      <div class="footer-pills">
        <div class="pill-item date-pill">
          <span>📅 {{ formattedDate }}</span>
        </div>

        <!-- Rendered ONLY if referenceName has content -->
        <div v-if="hasReference" class="pill-item ref-pill">
          <span>🤝 {{ isBn ? 'সংগ্রাহক:' : 'Ref:' }} {{ data.referenceName }}</span>
        </div>
      </div>
      <div class="slogan-footer">{{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান • জীবন বাঁচান' : 'Donate Blood, Save Lives') }}</div>
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
  if (!props.data.donationDate) return '07-10-2026';
  if (isBn.value) {
    return formatBengaliDate(props.data.donationDate, 'bengali-digits');
  }
  return props.data.donationDate;
});
</script>

<style scoped>
.story-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 14;
  background: linear-gradient(180deg, #ffffff 0%, #fffbf5 25%, #fff1f2 70%, #fee2e2 100%);
  color: #0f172a;
  padding: 1.2rem 1.3rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border: 3.5px solid #dc2626;
  outline: 2px solid #d97706;
  outline-offset: -7px;
}

/* Header */
.story-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: 1.5px solid #fecaca;
  border-top: 3px solid #dc2626;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.08);
}

.org-brand-chip {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  flex: 1;
  min-width: 0;
}

.story-logo-box {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  padding: 2px;
  border: 1.5px solid #fbbf24;
  flex-shrink: 0;
}

.story-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.story-logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.25rem;
  background: #fee2e2;
  border-radius: 50%;
}

.org-name-text {
  font-size: 0.96rem;
  font-weight: 800;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-hashtag {
  font-size: 0.72rem;
  font-weight: 800;
  color: #dc2626;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  padding: 0.2rem 0.65rem;
  border-radius: 999px;
}

/* Body */
.story-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.6rem 0;
}

.quote-banner {
  background: #fff1f2;
  border: 1.5px solid #fecaca;
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.06);
}

.quote-main {
  font-size: 0.8rem;
  font-weight: 800;
  color: #991b1b;
}

.photo-hero-wrapper {
  position: relative;
  width: 250px;
  height: 275px;
  margin-bottom: 0.8rem;
  display: flex;
  justify-content: center;
}

.photo-frame {
  width: 220px;
  height: 250px;
  border-radius: 22px;
  overflow: hidden;
  border: 3.5px solid #d97706;
  outline: 3px solid #dc2626;
  outline-offset: 3px;
  box-shadow: 0 12px 28px rgba(185, 28, 28, 0.16);
  background: #f8fafc;
}

.donor-photo {
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
  width: 64px;
  height: 64px;
  opacity: 0.6;
}

.placeholder-prompt {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  background: #ffffff;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  border: 1px dashed #cbd5e1;
}

.story-bg-badge {
  position: absolute;
  top: -8px;
  right: 8px;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ef4444 0%, #dc2626 50%, #991b1b 100%);
  border: 3px solid #fef08a;
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.bg-label {
  font-size: 0.56rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.bg-val {
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

.story-count-sticker {
  position: absolute;
  bottom: 8px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: 1.5px solid #fef3c7;
  padding: 0.28rem 0.85rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #ffffff;
  font-weight: 900;
  font-size: 0.76rem;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
  z-index: 10;
}

/* Name Card */
.donor-name-banner {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid #fed7aa;
  border-top: 3px solid #d97706;
  border-radius: 18px;
  padding: 0.75rem 1.1rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(217, 119, 6, 0.1);
}

.donor-hero-tag {
  font-size: 0.78rem;
  font-weight: 800;
  color: #d97706;
  margin-bottom: 0.2rem;
}

.name-text {
  font-size: 1.9rem;
  font-weight: 900;
  color: #991b1b;
  line-height: 1.2;
  margin: 0.15rem 0 0.35rem 0;
}

.sub-quote {
  font-size: 0.86rem;
  color: #334155;
  font-style: italic;
  font-weight: 500;
  line-height: 1.35;
}

/* Footer */
.story-footer {
  text-align: center;
  border-top: 1.5px solid #fecaca;
  padding-top: 0.65rem;
}

.footer-pills {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 0.45rem;
}

.pill-item {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
}

.date-pill {
  background: #fff1f2;
  border: 1.5px solid #fecaca;
  color: #991b1b;
  font-weight: 800;
}

.ref-pill {
  background: #f0fdf4;
  border: 1.5px solid #10b981;
  color: #065f46;
  font-weight: 800;
}

.slogan-footer {
  font-size: 0.82rem;
  font-weight: 800;
  color: #ffffff;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  padding: 0.4rem 1rem;
  border-radius: 999px;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.25);
}
</style>
