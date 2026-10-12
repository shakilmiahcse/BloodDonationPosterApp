<template>
  <div class="editorial-card-root">
    <div class="top-red-stripe"></div>

    <!-- Header with Circular Org Logo -->
    <header class="ed-header">
      <div class="ed-brand-group">
        <img :src="data.orgLogo || defaultOrgLogo" alt="Logo" class="ed-logo-img" />
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
            :src="data.donorPhoto || defaultDonorPhoto" 
            alt="Donor" 
            class="ed-photo"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>
        <div class="ed-count-tag">
          {{ data.donationCount || (isBn ? '১ম বার রক্তদান' : '1st Blood Donation') }}
        </div>
      </div>

      <!-- Details -->
      <div class="ed-details">
        <div class="donor-designation">{{ isBn ? '— সম্মানিত রক্তদাতা —' : '— HONORABLE BLOOD DONOR —' }}</div>
        <h2 class="ed-donor-name">{{ data.donorName || (isBn ? 'রক্তদাতার নাম' : 'Donor Full Name') }}</h2>
        
        <p class="ed-quote">
          “{{ data.quote || (isBn ? 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' : 'Blood donation is the greatest gift of life') }}”
        </p>

        <div class="ed-meta-grid">
          <div class="ed-meta-card">
            <span class="meta-label">{{ isBn ? 'তারিখ:' : 'Date:' }}</span>
            <span class="meta-val">{{ formattedDate }}</span>
          </div>

          <!-- Strictly rendered ONLY if referenceName has content -->
          <div v-if="hasReference" class="ed-meta-card ref-card">
            <span class="meta-label">{{ isBn ? 'সংগ্রাহক / রেফারেন্স:' : 'Referred By:' }}</span>
            <span class="meta-val">{{ data.referenceName }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="ed-footer">
      <div class="footer-msg">❤️ {{ isBn ? 'আপনার এক ব্যাগ রক্ত বাঁচিয়েছে একটি মূল্যবান প্রাণ। কৃতজ্ঞতা ও শুভকামনা।' : 'Your donation has saved a valuable human life. With deep gratitude and best wishes.' }}</div>
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
.editorial-card-root {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5.2;
  background: #ffffff;
  color: #0f172a;
  padding: 1.2rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.top-red-stripe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(90deg, #ef4444, #991b1b);
}

.ed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 2px solid #f1f5f9;
  gap: 0.8rem;
}

.ed-brand-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.ed-logo-img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: contain;
  border: 2px solid #ef4444;
  background: #fff;
  flex-shrink: 0;
}

.ed-titles {
  flex: 1;
}

.ed-org-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #991b1b;
  line-height: 1.2;
}

.ed-slogan-line {
  font-size: 0.78rem;
  font-weight: 600;
  color: #64748b;
  margin-top: 0.15rem;
}

.ed-blood-box {
  background: #fee2e2;
  border: 2px solid #ef4444;
  border-radius: 12px;
  padding: 0.35rem 0.8rem;
  text-align: center;
  flex-shrink: 0;
}

.blood-label {
  display: block;
  font-size: 0.6rem;
  font-weight: 700;
  color: #991b1b;
  line-height: 1;
}

.blood-val {
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 900;
  color: #dc2626;
  line-height: 1;
}

.ed-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;
}

.ed-photo-wrap {
  position: relative;
  margin-bottom: 0.8rem;
}

.photo-box {
  width: 210px;
  height: 230px;
  border-radius: 14px;
  overflow: hidden;
  border: 3px solid #0f172a;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  background: #f1f5f9;
}

.ed-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ed-count-tag {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.8rem;
  border-radius: 999px;
  white-space: nowrap;
}

.ed-details {
  text-align: center;
  width: 100%;
}

.donor-designation {
  font-size: 0.8rem;
  color: #ef4444;
  font-weight: 700;
}

.ed-donor-name {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin: 0.15rem 0;
}

.ed-quote {
  font-size: 0.88rem;
  color: #475569;
  font-style: italic;
  margin-bottom: 0.6rem;
}

.ed-meta-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.ed-meta-card {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
}

.meta-label {
  color: #64748b;
  font-weight: 600;
}

.meta-val {
  color: #0f172a;
  font-weight: 700;
}

.ref-card {
  background: #fefce8;
  border-color: #fef08a;
}
.ref-card .meta-label { color: #854d0e; }
.ref-card .meta-val { color: #713f12; }

.ed-footer {
  text-align: center;
  border-top: 1px dashed #cbd5e1;
  padding-top: 0.5rem;
}

.footer-msg {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}
</style>
