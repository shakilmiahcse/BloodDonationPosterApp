<template>
  <div class="tribute-card-root">
    <!-- Top Organization Header with Circular Logo -->
    <header class="tribute-header">
      <div class="logo-box">
        <img :src="logoSrc" alt="Logo" class="logo-img" />
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
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="donor-img"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>

        <!-- Overlapping Blood Group Shield (safely positioned) -->
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
          ★ {{ isBn ? '— মানবতার কল্যাণে গর্বিত রক্তযোদ্ধা —' : '— PROUD VOLUNTARY BLOOD DONOR —' }} ★
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
.tribute-card-root {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5.2;
  background: linear-gradient(180deg, #090e1a 0%, #181534 30%, #35081b 75%, #0d0611 100%);
  color: #fff;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.1rem 1.3rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  border: 3px solid #f59e0b;
}

/* Header */
.tribute-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(10px);
  padding: 0.8rem 1.1rem;
  border-radius: 16px;
  border: 1.5px solid rgba(245, 158, 11, 0.5);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.logo-box {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #ffffff;
  padding: 2.5px;
  border: 2px solid #fbbf24;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
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
  font-size: 1.25rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  letter-spacing: -0.2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.tribute-congrats-line {
  font-size: 0.78rem;
  color: #fef08a;
  font-weight: 700;
  margin-top: 0.2rem;
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
  width: 250px;
  height: 265px;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
}

.laurel-frame {
  width: 215px;
  height: 240px;
  border-radius: 22px;
  overflow: hidden;
  border: 3.5px solid #fbbf24;
  outline: 3px solid #be123c;
  outline-offset: 3px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 158, 11, 0.3);
  background: #1e293b;
}

.donor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

/* Shield Badge (safely inside) */
.tribute-bg-shield {
  position: absolute;
  top: -8px;
  right: 8px;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ef4444 0%, #b91c1c 60%, #7f1d1d 100%);
  color: #ffffff;
  border: 3px solid #fef08a;
  box-shadow: 0 6px 18px rgba(0,0,0,0.6), 0 0 14px rgba(245, 158, 11, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.shield-grp {
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.shield-lbl {
  font-size: 0.56rem;
  font-weight: 800;
  letter-spacing: 0.8px;
  color: #fef08a;
  text-transform: uppercase;
}

.tribute-count-ribbon {
  position: absolute;
  bottom: 8px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #0f172a;
  padding: 0.28rem 0.85rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 900;
  border: 1.5px solid #fef08a;
  box-shadow: 0 4px 14px rgba(0,0,0,0.5);
  z-index: 10;
}

/* Details */
.tribute-details-card {
  width: 100%;
  background: linear-gradient(180deg, rgba(20, 25, 45, 0.85) 0%, rgba(12, 16, 30, 0.95) 100%);
  border: 1.5px solid rgba(245, 158, 11, 0.5);
  border-radius: 18px;
  padding: 0.85rem 1.2rem;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.salute-ribbon-tag {
  font-size: 0.78rem;
  font-weight: 800;
  color: #fbbf24;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
  text-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

.tribute-donor-name {
  font-size: 1.85rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.2;
  margin: 0.15rem 0 0.35rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
}

.tribute-quote {
  font-size: 0.88rem;
  color: #fecaca;
  font-style: italic;
  line-height: 1.35;
  margin-bottom: 0.45rem;
}

.tribute-meta-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.meta-pill {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
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

/* Footer */
.tribute-footer {
  background: rgba(15, 23, 42, 0.9);
  border-top: 1.5px solid rgba(245, 158, 11, 0.4);
  padding: 0.6rem 1rem;
  border-radius: 12px;
  text-align: center;
}

.footer-msg {
  font-size: 0.82rem;
  font-weight: 800;
  color: #fef08a;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}
</style>
