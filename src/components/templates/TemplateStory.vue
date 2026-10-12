<template>
  <div class="story-poster">
    <!-- Top Organization Banner with Circular Logo -->
    <header class="story-header">
      <div class="org-brand-chip">
        <img :src="data.orgLogo || defaultOrgLogo" alt="Logo" class="story-logo-img" />
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
            :src="data.donorPhoto || defaultDonorPhoto" 
            alt="Donor" 
            class="donor-photo"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>

        <!-- Overlapping Blood Group Badge -->
        <div class="story-bg-badge">
          <span class="bg-label">{{ isBn ? 'রক্তের গ্রুপ' : 'BLOOD' }}</span>
          <span class="bg-val">{{ data.bloodGroup || 'O+' }}</span>
        </div>

        <!-- Donation Count Sticker -->
        <div class="story-count-sticker">
          <span class="badge-num">{{ data.donationCount || (isBn ? '১ম বার' : '1st Time') }}</span>
          <span class="badge-lbl">{{ isBn ? 'রক্তদান' : 'Donation' }}</span>
        </div>
      </div>

      <!-- Donor Name Card -->
      <div class="donor-name-banner">
        <div class="donor-hero-tag">🌟 {{ isBn ? 'গর্বিত রক্তযোদ্ধা' : 'PROUD BLOOD DONOR' }} 🌟</div>
        <h2 class="name-text">{{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}</h2>
        <p class="sub-quote">{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}</p>
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
          <span>🤝 {{ isBn ? 'সংগ্রাহক / রেফারেন্স:' : 'Referred By:' }} {{ data.referenceName }}</span>
        </div>
      </div>
      <div class="slogan-footer">{{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান' : 'Donate Blood, Save Lives') }}</div>
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

const defaultOrgLogo = '/default_org_logo.png';
const defaultDonorPhoto = '/sample_donor.jfif';
const isBn = computed(() => currentLang.value === 'bn');

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
  background: linear-gradient(180deg, #7f1d1d 0%, #991b1b 30%, #450a0a 100%);
  color: #fff;
  padding: 1.4rem 1.2rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 5;
}

.org-brand-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  max-width: 80%;
}

.story-logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 50%;
  background: #fff;
}

.org-name-text {
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.story-hashtag {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 800;
  color: #fecaca;
  letter-spacing: 0.5px;
}

.story-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;
  z-index: 4;
}

.quote-banner {
  text-align: center;
  margin-bottom: 0.8rem;
}

.quote-main {
  font-size: 1.15rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.25;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.photo-hero-wrapper {
  position: relative;
  width: 230px;
  height: 250px;
  margin-bottom: 1rem;
}

.photo-frame {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  border: 4px solid #ffffff;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  background: #1e293b;
}

.donor-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-bg-badge {
  position: absolute;
  top: -12px;
  right: -12px;
  background: #ffffff;
  color: #b91c1c;
  border-radius: 50%;
  width: 76px;
  height: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  border: 3px solid #ef4444;
}

.bg-label {
  font-size: 0.55rem;
  font-weight: 700;
  line-height: 1;
}

.bg-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.7rem;
  font-weight: 900;
  line-height: 1;
}

.story-count-sticker {
  position: absolute;
  bottom: -10px;
  left: -10px;
  background: #f59e0b;
  color: #fff;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  border: 2px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge-num {
  font-size: 1rem;
  font-weight: 800;
  line-height: 1;
}

.badge-lbl {
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1;
}

.donor-name-banner {
  text-align: center;
  width: 100%;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  padding: 0.8rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.donor-hero-tag {
  font-size: 0.8rem;
  color: #fef08a;
  font-weight: 700;
}

.name-text {
  font-size: 1.6rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  margin: 0.1rem 0;
}

.sub-quote {
  font-size: 0.85rem;
  color: #fecaca;
  font-weight: 500;
}

.story-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 5;
}

.footer-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.pill-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.12);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
}

.ref-pill {
  background: #fefce8;
  color: #854d0e;
}

.slogan-footer {
  font-size: 0.75rem;
  color: #fca5a5;
  font-weight: 600;
}
</style>
