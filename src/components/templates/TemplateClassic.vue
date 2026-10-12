<template>
  <div class="fb-photocard-root" ref="posterEl">
    <!-- Top Decorative Red & Dark Header Wave -->
    <header class="card-top-branding">
      <div class="org-logo-wrap">
        <img :src="data.orgLogo || defaultOrgLogo" alt="Logo" class="org-logo-img" />
      </div>
      <div class="org-title-group">
        <h1 class="org-primary-name">{{ data.orgName || 'চরশিবপুর উত্তরপাড়া মানবসেবা যুব সংঘ' }}</h1>
        <p v-if="data.orgSubtitle" class="org-subtitle-text">{{ data.orgSubtitle }}</p>
        <div class="org-slogan-pill">
          <span>❤️ {{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Standing beside patients in need of blood') }}</span>
        </div>
      </div>
    </header>

    <!-- Main Visual Hero Area -->
    <main class="card-main-content">
      <div class="donor-hero-stage">
        <!-- Floating Blood Group Emblem -->
        <div class="blood-group-badge-circle">
          <div class="bg-badge-inner">
            <span class="bg-group-letter">{{ data.bloodGroup || 'O+' }}</span>
            <span class="bg-group-tag">{{ isBn ? 'গ্রুপ' : 'GROUP' }}</span>
          </div>
        </div>

        <!-- Donation Count Pill -->
        <div class="donation-count-tag">
          <span class="star-icon">★</span>
          <span class="count-val">{{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Blood Donation') }}</span>
        </div>

        <!-- Donor Photo Frame -->
        <div class="photo-display-frame">
          <img 
            :src="data.donorPhoto || defaultDonorPhoto" 
            alt="Donor" 
            class="donor-photo-img"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>

        <!-- Date Tag on Left -->
        <div class="donation-date-pill">
          <span class="cal-icon">📅</span>
          <span class="date-val">{{ formattedDate }}</span>
        </div>
      </div>

      <!-- Donor Tribute Name Banner -->
      <div class="donor-tribute-box">
        <div class="tribute-badge-label">
          <span>🌟 {{ isBn ? 'সম্মানিত রক্তদাতা' : 'HONORABLE BLOOD DONOR' }} 🌟</span>
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
.fb-photocard-root {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5.2;
  background: #ffffff;
  color: #0f172a;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
}

/* Header */
.card-top-branding {
  position: relative;
  background: linear-gradient(135deg, #991b1b 0%, #b91c1c 60%, #dc2626 100%);
  color: #fff;
  padding: 0.9rem 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.9rem;
  box-shadow: 0 4px 12px rgba(185, 28, 28, 0.25);
}

.org-logo-wrap {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #fff;
  padding: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  font-size: 1.25rem;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.2px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.org-subtitle-text {
  font-size: 0.8rem;
  color: #fecaca;
  margin-top: 0.1rem;
}

.org-slogan-pill {
  display: inline-block;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.15rem 0.6rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fef08a;
  margin-top: 0.25rem;
}

/* Main Area */
.card-main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.2rem;
  background: radial-gradient(circle at 50% 30%, #fef2f2 0%, #ffffff 80%);
}

.donor-hero-stage {
  position: relative;
  width: 250px;
  height: 275px;
  margin-bottom: 0.8rem;
}

.photo-display-frame {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 4px solid #b91c1c;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(220, 38, 38, 0.15);
  background: #cbd5e1;
}

.donor-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

/* Blood Group Emblem */
.blood-group-badge-circle {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ef4444, #991b1b);
  border: 3px solid #ffffff;
  box-shadow: 0 6px 16px rgba(185, 28, 28, 0.4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-badge-inner {
  text-align: center;
  color: #fff;
}

.bg-group-letter {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
  display: block;
}

.bg-group-tag {
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Donation Count Tag */
.donation-count-tag {
  position: absolute;
  bottom: -12px;
  right: 15px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  border: 2px solid #fff;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.star-icon {
  font-size: 0.9rem;
}

/* Date Pill */
.donation-date-pill {
  position: absolute;
  bottom: -12px;
  left: 15px;
  background: #1e293b;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  border: 2px solid #fff;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(0,0,0,0.25);
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

/* Tribute Section */
.donor-tribute-box {
  width: 100%;
  text-align: center;
  background: #ffffff;
  border: 1px solid #fee2e2;
  border-radius: 14px;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.tribute-badge-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #b91c1c;
  letter-spacing: 0.5px;
  margin-bottom: 0.15rem;
}

.donor-highlight-name {
  font-size: 1.65rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin: 0.1rem 0 0.3rem;
}

.donor-motto-quote {
  font-size: 0.9rem;
  font-style: italic;
  color: #475569;
  line-height: 1.3;
}

/* Reference Pill: Only visible if referenceName is provided */
.reference-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.5rem;
  background: #fefce8;
  border: 1px solid #fef08a;
  color: #854d0e;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
}

.ref-label {
  font-weight: 600;
}

.ref-name {
  font-weight: 800;
}

/* Footer */
.card-bottom-bar {
  background: #0f172a;
  color: #ffffff;
  padding: 0.5rem 1rem;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
}
</style>
