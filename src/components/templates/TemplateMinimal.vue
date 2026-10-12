<template>
  <div class="editorial-card-root">
    <!-- Ornate Golden Corners -->
    <span class="ed-corner ed-tl">❖</span>
    <span class="ed-corner ed-tr">❖</span>
    <span class="ed-corner ed-bl">❖</span>
    <span class="ed-corner ed-br">❖</span>

    <!-- Header with Circular Org Logo -->
    <header class="ed-header">
      <div class="ed-brand-group">
        <div class="ed-logo-ring">
          <img :src="logoSrc" alt="Logo" class="ed-logo-img" />
        </div>
        <div class="ed-titles">
          <h1 class="ed-org-title">{{ data.orgName || 'চরশিবপুর উত্তরপাড়া মানবসেবা যুব সংঘ' }}</h1>
          <p class="ed-slogan-line">“{{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Beside critical patients in need of blood') }}”</p>
        </div>
      </div>

      <!-- Blood Group Minimal Box -->
      <div class="ed-blood-box">
        <span class="blood-label">{{ isBn ? 'রক্তের গ্রুপ' : 'BLOOD' }}</span>
        <span class="blood-val">{{ data.bloodGroup || 'O+' }}</span>
      </div>
    </header>

    <!-- Body Layout -->
    <main class="ed-body">
      <!-- Framed Photo -->
      <div class="ed-photo-wrap">
        <div class="photo-box">
          <img 
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="ed-photo"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>
        <div class="ed-count-tag">
          🏅 {{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Blood Donation') }}
        </div>
      </div>

      <!-- Details -->
      <div class="ed-details">
        <div class="donor-designation">★ {{ isBn ? '— সম্মানিত রক্তদাতা —' : '— HONORABLE BLOOD DONOR —' }} ★</div>
        <h2 class="ed-donor-name">{{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}</h2>
        
        <p class="ed-quote">
          “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
        </p>

        <div class="ed-meta-grid">
          <div class="ed-meta-card">
            <span class="meta-label">📅 {{ isBn ? 'তারিখ:' : 'Date:' }}</span>
            <span class="meta-val">{{ formattedDate }}</span>
          </div>

          <!-- Strictly rendered ONLY if referenceName has content -->
          <div v-if="hasReference" class="ed-meta-card ref-card">
            <span class="meta-label">🤝 {{ isBn ? 'সংগ্রাহক:' : 'Ref:' }}</span>
            <span class="meta-val">{{ data.referenceName }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="ed-footer">
      <div class="footer-msg">❤️ {{ isBn ? 'আপনার এক ব্যাগ রক্ত বাঁচিয়েছে একটি মূল্যবান প্রাণ। রক্তিম শুভেচ্ছা।' : 'Your donation has saved a valuable human life. Warmest congratulations.' }}</div>
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
.editorial-card-root {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5.2;
  background: linear-gradient(155deg, #ffffff 0%, #fafaf9 35%, #fff1f2 75%, #fee2e2 100%);
  color: #0f172a;
  padding: 1.2rem 1.4rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3.5px solid #dc2626;
  outline: 2px solid #d97706;
  outline-offset: -7px;
  overflow: hidden;
}

.ed-corner {
  position: absolute;
  font-size: 1.15rem;
  color: #d97706;
  line-height: 1;
  z-index: 5;
  text-shadow: 0 0 6px rgba(217, 119, 6, 0.4);
}
.ed-tl { top: 10px; left: 10px; }
.ed-tr { top: 10px; right: 10px; }
.ed-bl { bottom: 10px; left: 10px; }
.ed-br { bottom: 10px; right: 10px; }

/* Header */
.ed-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-bottom: 2px solid #fecaca;
  padding-bottom: 0.8rem;
}

.ed-brand-group {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  flex: 1;
}

.ed-logo-ring {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #fff;
  padding: 2.5px;
  border: 2px solid #fbbf24;
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.4);
  flex-shrink: 0;
}

.ed-logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.ed-titles {
  flex: 1;
}

.ed-org-title {
  font-size: 1.22rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
  letter-spacing: -0.2px;
}

.ed-slogan-line {
  font-size: 0.76rem;
  color: #dc2626;
  font-weight: 700;
  margin-top: 0.2rem;
}

/* Blood Box */
.ed-blood-box {
  background: radial-gradient(circle at 35% 35%, #ef4444 0%, #dc2626 55%, #991b1b 100%);
  border: 2px solid #fef08a;
  box-shadow: 0 4px 14px rgba(220, 38, 38, 0.4);
  padding: 0.35rem 0.85rem;
  border-radius: 14px;
  text-align: center;
  flex-shrink: 0;
}

.blood-label {
  display: block;
  font-size: 0.55rem;
  font-weight: 800;
  color: #fef08a;
  letter-spacing: 0.5px;
}

.blood-val {
  display: block;
  font-size: 1.6rem;
  font-weight: 900;
  line-height: 1;
  color: #fff;
}

/* Body */
.ed-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.6rem 0;
}

.ed-photo-wrap {
  position: relative;
  width: 220px;
  height: 245px;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
}

.photo-box {
  width: 200px;
  height: 225px;
  border-radius: 18px;
  overflow: hidden;
  border: 3.5px solid #d97706;
  outline: 3px solid #dc2626;
  outline-offset: 3px;
  box-shadow: 0 10px 25px rgba(185, 28, 28, 0.16);
  background: #f8fafc;
}

.ed-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.ed-count-tag {
  position: absolute;
  bottom: 6px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #ffffff;
  padding: 0.25rem 0.8rem;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 900;
  border: 1.5px solid #fef3c7;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.35);
}

/* Details */
.ed-details {
  width: 100%;
  background: #ffffff;
  border: 1.5px solid #fecaca;
  border-top: 3px solid #dc2626;
  border-radius: 16px;
  padding: 0.75rem 1.1rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(220, 38, 38, 0.08);
}

.donor-designation {
  font-size: 0.76rem;
  font-weight: 800;
  color: #d97706;
  letter-spacing: 0.5px;
  margin-bottom: 0.2rem;
}

.ed-donor-name {
  font-size: 1.9rem;
  font-weight: 900;
  color: #991b1b;
  line-height: 1.2;
  margin: 0.15rem 0 0.3rem 0;
}

.ed-quote {
  font-size: 0.86rem;
  color: #334155;
  font-style: italic;
  font-weight: 500;
  line-height: 1.35;
  margin-bottom: 0.4rem;
}

.ed-meta-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.ed-meta-card {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #fff1f2;
  border: 1.5px solid #fecaca;
  padding: 0.22rem 0.75rem;
  border-radius: 999px;
  font-size: 0.74rem;
}

.meta-label {
  color: #dc2626;
  font-weight: 700;
}

.meta-val {
  color: #0f172a;
  font-weight: 800;
}

.ref-card {
  background: #f0fdf4;
  border-color: #10b981;
}
.ref-card .meta-label {
  color: #047857;
  font-weight: 700;
}
.ref-card .meta-val {
  color: #064e3b;
  font-weight: 800;
}

/* Footer */
.ed-footer {
  border-top: 2px solid #fecaca;
  padding-top: 0.65rem;
  text-align: center;
}

.footer-msg {
  font-size: 0.82rem;
  font-weight: 800;
  color: #991b1b;
}
</style>
