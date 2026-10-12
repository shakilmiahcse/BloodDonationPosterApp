<template>
  <div class="fb-photocard-root" ref="posterEl">
    <!-- Ornate Golden Corner Emblems -->
    <span class="corner-filigree top-left">❖</span>
    <span class="corner-filigree top-right">❖</span>
    <span class="corner-filigree bottom-left">❖</span>
    <span class="corner-filigree bottom-right">❖</span>

    <!-- Top Decorative Crimson & Gold Header -->
    <header class="card-top-branding">
      <div class="org-logo-wrap">
        <img :src="logoSrc" alt="Logo" class="org-logo-img" />
      </div>
      <div class="org-title-group">
        <h1 class="org-primary-name">{{ data.orgName || 'চরশিবপুর উত্তরপাড়া মানবসেবা যুব সংঘ' }}</h1>
        <p v-if="data.orgSubtitle" class="org-subtitle-text">{{ data.orgSubtitle }}</p>
        <div class="org-slogan-pill">
          <span>❤️ {{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Standing beside patients in need of blood') }}</span>
        </div>
      </div>
    </header>

    <!-- Main Visual Hero Stage -->
    <main class="card-main-content">
      <div class="donor-hero-stage">
        <!-- Floating 3D Blood Group Crest -->
        <div class="blood-group-badge-circle">
          <div class="bg-badge-inner">
            <span class="bg-group-letter">{{ data.bloodGroup || 'O+' }}</span>
            <span class="bg-group-tag">{{ isBn ? 'গ্রুপ' : 'GROUP' }}</span>
          </div>
        </div>

        <!-- Donor Photo Frame -->
        <div class="photo-display-frame">
          <img 
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="donor-photo-img"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>

        <!-- Overlaid Status Badges (Safe within stage) -->
        <div class="stage-bottom-badges">
          <!-- Date Pill -->
          <div class="donation-date-pill">
            <span class="cal-icon">📅</span>
            <span class="date-val">{{ formattedDate }}</span>
          </div>

          <!-- Donation Count Pill -->
          <div class="donation-count-tag">
            <span class="star-icon">🏅</span>
            <span class="count-val">{{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Blood Donation') }}</span>
          </div>
        </div>
      </div>

      <!-- Donor Tribute Name Plaque (Deep Royal Glassmorphic) -->
      <div class="donor-tribute-box">
        <div class="tribute-badge-label">
          <span>★ 🌟 {{ isBn ? 'সম্মানিত রক্তযোদ্ধা' : 'HONORABLE BLOOD DONOR' }} 🌟 ★</span>
        </div>

        <h2 class="donor-highlight-name">
          {{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}
        </h2>

        <p class="donor-motto-quote">
          “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
        </p>

        <!-- Optional Reference: Rendered ONLY if referenceName has content -->
        <div v-if="hasReference" class="reference-badge-pill">
          <span class="ref-icon">🤝</span>
          <span class="ref-label">{{ isBn ? 'সংগ্রাহক / রেফারেন্স:' : 'Referred By:' }}</span>
          <span class="ref-name">{{ data.referenceName }}</span>
        </div>
      </div>
    </main>

    <!-- Bottom Footer Ribbon -->
    <footer class="card-bottom-bar">
      <div class="footer-gold-line"></div>
      <div class="footer-motto-text">
        <span>{{ data.slogan || (isBn ? 'মানবতার সেবায় রক্তদান • জীবন বাঁচান' : 'Donate Blood, Save Lives • Serving Humanity') }}</span>
      </div>
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
.fb-photocard-root {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5.2;
  background: radial-gradient(circle at 50% 18%, #881337 0%, #4c0519 45%, #25020a 85%, #150105 100%);
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  border: 3px solid #f59e0b;
  outline: 4px solid #7f1d1d;
  outline-offset: -7px;
}

/* Ornate Corner Emblems */
.corner-filigree {
  position: absolute;
  font-size: 1.1rem;
  color: #fbbf24;
  line-height: 1;
  z-index: 5;
  text-shadow: 0 0 8px rgba(245, 158, 11, 0.8);
  pointer-events: none;
}
.corner-filigree.top-left { top: 10px; left: 10px; }
.corner-filigree.top-right { top: 10px; right: 10px; }
.corner-filigree.bottom-left { bottom: 10px; left: 10px; }
.corner-filigree.bottom-right { bottom: 10px; right: 10px; }

/* Header */
.card-top-branding {
  position: relative;
  background: linear-gradient(180deg, rgba(20, 2, 7, 0.85) 0%, rgba(76, 5, 25, 0.9) 100%);
  border-bottom: 2px solid rgba(245, 158, 11, 0.5);
  padding: 0.95rem 1.4rem 0.85rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.org-logo-wrap {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #ffffff;
  padding: 2.5px;
  border: 2.5px solid #fbbf24;
  box-shadow: 0 0 16px rgba(245, 158, 11, 0.6), 0 4px 12px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.org-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.org-title-group {
  flex: 1;
  min-width: 0;
}

.org-primary-name {
  font-size: 1.3rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.3px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.org-subtitle-text {
  font-size: 0.82rem;
  color: #fecaca;
  margin-top: 0.15rem;
}

.org-slogan-pill {
  display: inline-block;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(185, 28, 28, 0.4));
  border: 1px solid rgba(251, 191, 36, 0.6);
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fef08a;
  margin-top: 0.3rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* Main Area */
.card-main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.4rem;
  position: relative;
  z-index: 2;
}

.donor-hero-stage {
  position: relative;
  width: 260px;
  height: 275px;
  margin-bottom: 0.85rem;
  display: flex;
  justify-content: center;
}

.photo-display-frame {
  width: 220px;
  height: 245px;
  border-radius: 20px;
  overflow: hidden;
  border: 3.5px solid #fbbf24;
  outline: 3px solid #be123c;
  outline-offset: 3px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7), 0 0 30px rgba(239, 68, 68, 0.4);
  background: #1e293b;
  position: relative;
}

.donor-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

/* 3D Blood Group Crest (Top-Right, cleanly within bounds) */
.blood-group-badge-circle {
  position: absolute;
  top: -8px;
  right: 6px;
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 60%, #7f1d1d 100%);
  border: 3px solid #fef08a;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6), 0 0 16px rgba(245, 158, 11, 0.6);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-badge-inner {
  text-align: center;
  color: #fff;
  line-height: 1;
}

.bg-group-letter {
  display: block;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7);
}

.bg-group-tag {
  display: block;
  font-size: 0.58rem;
  font-weight: 800;
  letter-spacing: 1px;
  color: #fef08a;
  text-transform: uppercase;
  margin-top: 1px;
}

/* Overlaid Bottom Status Badges */
.stage-bottom-badges {
  position: absolute;
  bottom: 4px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  z-index: 10;
  width: 100%;
  justify-content: center;
}

.donation-date-pill {
  background: rgba(15, 23, 42, 0.9);
  border: 1.5px solid rgba(251, 191, 36, 0.7);
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
}

.donation-count-tag {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: 1.5px solid #fef08a;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 900;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6), 0 0 12px rgba(245, 158, 11, 0.5);
}

/* Donor Tribute Plaque */
.donor-tribute-box {
  width: 100%;
  background: linear-gradient(180deg, rgba(24, 7, 14, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%);
  border: 1.5px solid rgba(245, 158, 11, 0.55);
  border-radius: 18px;
  padding: 0.85rem 1.2rem;
  text-align: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.15);
  backdrop-filter: blur(10px);
}

.tribute-badge-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #fbbf24;
  letter-spacing: 0.6px;
  margin-bottom: 0.3rem;
  text-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

.donor-highlight-name {
  font-size: 1.85rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin: 0.15rem 0 0.35rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
  letter-spacing: -0.3px;
}

.donor-motto-quote {
  font-size: 0.88rem;
  color: #fecaca;
  font-style: italic;
  line-height: 1.35;
  margin-bottom: 0.4rem;
  max-width: 95%;
  margin-left: auto;
  margin-right: auto;
}

/* Reference Badge */
.reference-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, rgba(6, 78, 59, 0.8), rgba(4, 120, 87, 0.7));
  border: 1.5px solid #34d399;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  font-size: 0.76rem;
  color: #ecfdf5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  margin-top: 0.25rem;
}

.ref-label {
  font-weight: 600;
  color: #a7f3d0;
}

.ref-name {
  font-weight: 800;
  color: #ffffff;
}

/* Bottom Bar */
.card-bottom-bar {
  background: linear-gradient(180deg, rgba(76, 5, 25, 0.9) 0%, rgba(20, 2, 7, 0.95) 100%);
  border-top: 2px solid rgba(245, 158, 11, 0.5);
  padding: 0.65rem 1rem;
  text-align: center;
  z-index: 2;
}

.footer-motto-text {
  font-size: 0.82rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
</style>
