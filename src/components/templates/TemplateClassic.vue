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
  background: radial-gradient(circle at 50% 12%, #ffffff 0%, #fffbf5 40%, #fff1f2 80%, #fee2e2 100%);
  color: #0f172a;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  border: 3.5px solid #dc2626;
  outline: 2px solid #d97706;
  outline-offset: -7px;
}

/* Ornate Corner Emblems */
.corner-filigree {
  position: absolute;
  font-size: 1.15rem;
  color: #d97706;
  line-height: 1;
  z-index: 5;
  text-shadow: 0 0 6px rgba(217, 119, 6, 0.4);
  pointer-events: none;
}
.corner-filigree.top-left { top: 10px; left: 10px; }
.corner-filigree.top-right { top: 10px; right: 10px; }
.corner-filigree.bottom-left { bottom: 10px; left: 10px; }
.corner-filigree.bottom-right { bottom: 10px; right: 10px; }

/* Header */
.card-top-branding {
  position: relative;
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 60%, #991b1b 100%);
  border-bottom: 3px solid #d97706;
  padding: 0.95rem 1.4rem 0.85rem 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 14px rgba(185, 28, 28, 0.25);
  z-index: 2;
}

.org-logo-wrap {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  background: #ffffff;
  padding: 2.5px;
  border: 2.5px solid #fbbf24;
  box-shadow: 0 0 12px rgba(251, 191, 36, 0.7), 0 3px 8px rgba(0, 0, 0, 0.25);
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.org-subtitle-text {
  font-size: 0.82rem;
  color: #fef08a;
  margin-top: 0.15rem;
  font-weight: 600;
}

.org-slogan-pill {
  display: inline-block;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(254, 240, 138, 0.85);
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 0.3rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
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
  border: 3.5px solid #d97706;
  outline: 3px solid #dc2626;
  outline-offset: 3px;
  box-shadow: 0 12px 28px rgba(185, 28, 28, 0.16), 0 4px 12px rgba(0, 0, 0, 0.08);
  background: #f8fafc;
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
  background: radial-gradient(circle at 35% 35%, #ef4444 0%, #dc2626 50%, #991b1b 100%);
  border: 3px solid #fef08a;
  box-shadow: 0 6px 18px rgba(220, 38, 38, 0.45), 0 2px 6px rgba(0, 0, 0, 0.2);
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
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
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
  background: #ffffff;
  border: 1.5px solid #dc2626;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 800;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15), 0 2px 4px rgba(0, 0, 0, 0.08);
}

.donation-count-tag {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border: 1.5px solid #fef3c7;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 900;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
}

/* Donor Tribute Plaque */
.donor-tribute-box {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid #fecaca;
  border-top: 3px solid #dc2626;
  border-radius: 18px;
  padding: 0.85rem 1.2rem;
  text-align: center;
  box-shadow: 0 10px 24px rgba(220, 38, 38, 0.09), 0 2px 6px rgba(0, 0, 0, 0.04);
}

.tribute-badge-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: #d97706;
  letter-spacing: 0.6px;
  margin-bottom: 0.25rem;
}

.donor-highlight-name {
  font-size: 1.9rem;
  font-weight: 900;
  color: #991b1b;
  line-height: 1.2;
  margin: 0.15rem 0 0.35rem 0;
  letter-spacing: -0.3px;
}

.donor-motto-quote {
  font-size: 0.88rem;
  color: #334155;
  font-style: italic;
  font-weight: 500;
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
  background: #f0fdf4;
  border: 1.5px solid #10b981;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  font-size: 0.76rem;
  color: #065f46;
  box-shadow: 0 2px 6px rgba(16, 185, 129, 0.15);
  margin-top: 0.25rem;
}

.ref-label {
  font-weight: 700;
  color: #047857;
}

.ref-name {
  font-weight: 800;
  color: #064e3b;
}

/* Bottom Bar */
.card-bottom-bar {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
  border-top: 3px solid #d97706;
  padding: 0.65rem 1rem;
  text-align: center;
  z-index: 2;
  box-shadow: 0 -2px 10px rgba(185, 28, 28, 0.15);
}

.footer-motto-text {
  font-size: 0.84rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
</style>
