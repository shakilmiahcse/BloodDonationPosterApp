<template>
  <div class="tribute-card-root">
    <!-- Top Organization Header with Circular Logo -->
    <header class="tribute-header">
      <div class="logo-box">
        <img :src="data.orgLogo || defaultOrgLogo" alt="Logo" class="logo-img" />
      </div>
      <div class="header-text-block">
        <h1 class="tribute-org-title">{{ data.orgName || 'চরশিবপুর উত্তরপাড়া মানবসেবা যুব সংঘ' }}</h1>
        <p class="tribute-congrats-line">
          🩸 {{ isBn ? 'রক্তদানের জন্য আন্তরিক রক্তিম শুভেচ্ছা ও মোবারকবাদ' : 'Warm Crimson Congratulations for Blood Donation' }}
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="tribute-body">
      <!-- Framed Photo with Laurel Ribbon -->
      <div class="tribute-photo-wrapper">
        <div class="laurel-frame">
          <img 
            :src="data.donorPhoto || defaultDonorPhoto" 
            alt="Donor" 
            class="donor-img"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>

        <!-- Overlapping Blood Group Shield -->
        <div class="tribute-bg-shield">
          <span class="shield-grp">{{ data.bloodGroup || 'O+' }}</span>
          <span class="shield-lbl">{{ isBn ? 'রক্তের গ্রুপ' : 'BLOOD' }}</span>
        </div>

        <!-- Count Ribbon -->
        <div class="tribute-count-ribbon">
          <span>🏅 {{ data.donationCount || (isBn ? '১ম বার রক্তদান সম্পন্ন' : '1st Blood Donation') }}</span>
        </div>
      </div>

      <!-- Donor Name and Details -->
      <div class="tribute-details-card">
        <div class="salute-ribbon-tag">
          {{ isBn ? '— মানবতার কল্যাণে গর্বিত রক্তযোদ্ধা —' : '— PROUD VOLUNTARY BLOOD DONOR —' }}
        </div>

        <h2 class="tribute-donor-name">
          {{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}
        </h2>

        <p class="tribute-quote">
          “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
        </p>

        <div class="tribute-meta-row">
          <div class="meta-pill date-pill">
            <span>📅 {{ formattedDate }}</span>
          </div>

          <!-- Strictly rendered ONLY if referenceName has content -->
          <div v-if="hasReference" class="meta-pill ref-pill">
            <span>🤝 {{ isBn ? 'সংগ্রাহক / রেফারেন্স:' : 'Referred By:' }} {{ data.referenceName }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer Banner -->
    <footer class="tribute-footer">
      <div class="footer-msg">
        <span>❤️ {{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Standing beside patients in need of blood') }}</span>
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
.tribute-card-root {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5.2;
  background: linear-gradient(180deg, #7f1d1d 0%, #991b1b 15%, #450a0a 100%);
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.2rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
}

/* Header */
.tribute-header {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  padding: 0.75rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.logo-box {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #ffffff;
  padding: 2px;
  flex-shrink: 0;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.header-text-block {
  flex: 1;
}

.tribute-org-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
  letter-spacing: -0.2px;
}

.tribute-congrats-line {
  font-size: 0.75rem;
  color: #fef08a;
  font-weight: 600;
  margin-top: 0.15rem;
}

/* Body */
.tribute-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.6rem 0;
}

.tribute-photo-wrapper {
  position: relative;
  width: 240px;
  height: 260px;
  margin-bottom: 0.8rem;
}

.laurel-frame {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  border: 4px solid #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.4);
  background: #1e293b;
}

.donor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

/* Shield Badge */
.tribute-bg-shield {
  position: absolute;
  top: -14px;
  right: -14px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #ffffff;
  color: #dc2626;
  border: 3px solid #ef4444;
  box-shadow: 0 6px 16px rgba(0,0,0,0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.shield-grp {
  font-family: 'Outfit', sans-serif;
  font-size: 1.9rem;
  font-weight: 900;
  line-height: 1;
}

.shield-lbl {
  font-size: 0.55rem;
  font-weight: 700;
}

/* Count Ribbon */
.tribute-count-ribbon {
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  padding: 0.25rem 1rem;
  border-radius: 999px;
  border: 2px solid #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  white-space: nowrap;
  z-index: 10;
}

/* Details Box */
.tribute-details-card {
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 0.75rem 1rem;
}

.salute-ribbon-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.tribute-donor-name {
  font-size: 1.65rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0.15rem 0 0.3rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.tribute-quote {
  font-size: 0.88rem;
  font-style: italic;
  color: #fecaca;
  line-height: 1.3;
}

.tribute-meta-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 0.5rem;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
}

.date-pill {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.ref-pill {
  background: #fefce8;
  color: #854d0e;
}

/* Footer */
.tribute-footer {
  text-align: center;
  font-size: 0.8rem;
  color: #fca5a5;
  font-weight: 600;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 0.5rem;
}
</style>
