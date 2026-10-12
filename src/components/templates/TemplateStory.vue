<template>
  <div class="story-poster">
    <!-- Top Organization Banner with Circular Logo -->
    <header class="story-header">
      <div class="org-brand-chip">
        <div class="story-logo-box">
          <img :src="logoSrc" alt="Logo" class="story-logo-img" />
        </div>
        <span class="org-name-text">{{ data.orgName || 'চরশিবপুর উত্তরপাড়া মানবসেবা যুব সংঘ' }}</span>
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
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="donor-photo"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
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
import defaultOrgLogo from '../../assets/default_org_logo.png';
import defaultDonorPhoto from '../../assets/sample_donor.jpg';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const isBn = computed(() => currentLang.value === 'bn');

const logoSrc = computed(() => {
  if (!props.data.orgLogo || props.data.orgLogo === '/default_org_logo.png' || props.data.orgLogo === './default_org_logo.png') {
    return defaultOrgLogo;
  }
  return props.data.orgLogo;
});

const donorPhotoSrc = computed(() => {
  if (!props.data.donorPhoto || props.data.donorPhoto === '/sample_donor.jfif' || props.data.donorPhoto === './sample_donor.jfif' || props.data.donorPhoto === '/sample_donor.jpg') {
    return defaultDonorPhoto;
  }
  return props.data.donorPhoto;
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
  background: radial-gradient(circle at 50% 20%, #881337 0%, #4c0519 40%, #1c050d 80%, #0a0105 100%);
  color: #fff;
  padding: 1.2rem 1.3rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border: 3px solid #f59e0b;
}

/* Header */
.story-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  padding: 0.65rem 1rem;
  border-radius: 999px;
  border: 1.5px solid rgba(245, 158, 11, 0.5);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
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

.org-name-text {
  font-size: 0.96rem;
  font-weight: 800;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-hashtag {
  font-size: 0.72rem;
  font-weight: 800;
  color: #fef08a;
  background: rgba(220, 38, 38, 0.4);
  border: 1px solid rgba(251, 191, 36, 0.5);
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
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(185, 28, 28, 0.4));
  border: 1px solid rgba(251, 191, 36, 0.5);
  padding: 0.4rem 1.1rem;
  border-radius: 999px;
  margin-bottom: 0.75rem;
}

.quote-main {
  font-size: 0.8rem;
  font-weight: 700;
  color: #fef08a;
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
  border: 3.5px solid #fbbf24;
  outline: 3px solid #be123c;
  outline-offset: 3px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(239, 68, 68, 0.4);
  background: #1e293b;
}

.donor-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.story-bg-badge {
  position: absolute;
  top: -8px;
  right: 8px;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 65%, #7f1d1d 100%);
  border: 3px solid #fef08a;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), 0 0 14px rgba(245, 158, 11, 0.6);
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
  border: 1.5px solid #fef08a;
  padding: 0.28rem 0.85rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #0f172a;
  font-weight: 900;
  font-size: 0.76rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

/* Name Card */
.donor-name-banner {
  width: 100%;
  background: linear-gradient(180deg, rgba(20, 25, 45, 0.85) 0%, rgba(12, 16, 30, 0.95) 100%);
  border: 1.5px solid rgba(245, 158, 11, 0.5);
  border-radius: 18px;
  padding: 0.75rem 1.1rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.donor-hero-tag {
  font-size: 0.78rem;
  font-weight: 800;
  color: #fbbf24;
  margin-bottom: 0.2rem;
  text-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

.name-text {
  font-size: 1.8rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin: 0.15rem 0 0.35rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.sub-quote {
  font-size: 0.86rem;
  color: #fecaca;
  font-style: italic;
  line-height: 1.35;
}

/* Footer */
.story-footer {
  text-align: center;
  border-top: 1.5px solid rgba(245, 158, 11, 0.4);
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
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #f1f5f9;
}

.ref-pill {
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.8), rgba(4, 120, 87, 0.7));
  border: 1.5px solid #34d399;
  color: #ecfdf5;
}

.slogan-footer {
  font-size: 0.8rem;
  font-weight: 800;
  color: #fef08a;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
</style>
