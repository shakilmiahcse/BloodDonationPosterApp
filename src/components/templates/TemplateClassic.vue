<template>
  <div class="classic-poster" ref="posterEl">
    <!-- Red Side Accents -->
    <div class="side-accent-left"></div>
    <div class="side-accent-right"></div>

    <!-- Header Section -->
    <header class="classic-header">
      <div class="header-titles">
        <h1 class="org-en-title">{{ data.orgName || 'BANCHARAMPUR BLOOD BANK' }}</h1>
        <h2 class="org-bn-title">({{ data.orgSubtitle || 'বাঞ্ছারামপুর ব্লাড ব্যাংক' }})</h2>
        <p class="org-motto">{{ data.slogan || 'রক্ত দেওয়ার জন্যেই আমরা' }}</p>
        <div class="org-quote">
          “{{ data.heroQuote || 'রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে' }}”
        </div>
      </div>

      <!-- Top Right Blood Bank Logo -->
      <div class="org-logo-container">
        <div class="logo-shield">
          <svg viewBox="0 0 100 100" class="blood-drop-svg">
            <!-- Blood drop shape -->
            <path d="M50 8 C50 8, 20 52, 20 68 A30 30 0 0 0 80 68 C80 52, 50 8, 50 8 Z" fill="#b91c1c" />
            <!-- Inner white crescent/hand -->
            <path d="M50 20 C50 20, 30 55, 30 68 A20 20 0 0 0 70 68 C70 56, 56 46, 56 46 C60 55, 52 62, 45 60 C38 58, 38 48, 45 35 Z" fill="#ffffff" />
            <!-- Blood types text inside logo -->
            <text x="32" y="48" font-size="8" fill="#fff" font-weight="bold">A+</text>
            <text x="68" y="48" font-size="8" fill="#fff" font-weight="bold">B+</text>
            <text x="25" y="66" font-size="6" fill="#fff">AB+</text>
            <text x="75" y="66" font-size="6" fill="#fff">O+</text>
          </svg>
          <div class="logo-ribbon">
            <span>{{ data.orgSubtitle || 'বাঞ্ছারামপুর ব্লাড ব্যাংক' }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="classic-body">
      <!-- Left Column Elements -->
      <div class="left-elements">
        <div class="slogan-badge">
          <p class="quote-line-1">রক্তদান হোক</p>
          <p class="quote-line-2">{{ data.quote || 'আপনার জীবনের শ্রেষ্ঠ উপহার' }}</p>
        </div>

        <!-- Overlapping Donation Count Circle -->
        <div class="count-circle-badge">
          <span class="count-text-top">{{ countTop }}</span>
          <span class="count-text-bottom">{{ countBottom }}</span>
        </div>

        <!-- Date Box with Calendar Icon -->
        <div class="date-badge-box">
          <div class="calendar-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#dc2626">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM7 12h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H7zm4 4h2v2h-2zm4 0h2v2h-2z" />
            </svg>
          </div>
          <div class="date-text">
            {{ formattedDate }}
          </div>
        </div>
      </div>

      <!-- Center Donor Photo -->
      <div class="photo-frame-wrapper">
        <!-- Blood Group Badge (Top Right of Photo) -->
        <div class="blood-group-circle">
          <span class="bg-text">{{ data.bloodGroup || 'O+' }}</span>
        </div>

        <!-- Donor Photo Box -->
        <div class="donor-photo-frame">
          <img 
            :src="data.donorPhoto || defaultPhoto" 
            alt="রক্তদাতা" 
            class="donor-photo"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>
      </div>
    </main>

    <!-- Bottom Red Name Banner -->
    <footer class="classic-footer-banner">
      <div class="name-ribbon-content">
        <div class="donor-label">রক্ত দাতা:-</div>
        <div class="donor-name">{{ data.donorName || 'মোঃ জামাল উদ্দিন' }}</div>
      </div>

      <!-- Optional Reference Row -->
      <div v-if="data.referenceName" class="reference-tag">
        <span class="ref-label">রেফারেন্স:</span>
        <span class="ref-val">{{ data.referenceName }}</span>
      </div>

      <!-- Watermark logo in bottom right -->
      <div class="watermark-logo">
        <svg viewBox="0 0 100 100" class="watermark-svg">
          <path d="M50 8 C50 8, 20 52, 20 68 A30 30 0 0 0 80 68 C80 52, 50 8, 50 8 Z" fill="#991b1b" opacity="0.25" />
          <text x="35" y="65" font-size="12" fill="#fff" opacity="0.4" font-weight="bold">A+</text>
          <text x="65" y="65" font-size="12" fill="#fff" opacity="0.4" font-weight="bold">B+</text>
        </svg>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatBengaliDate, toBengaliNumber } from '../../utils/bengaliUtils';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const defaultPhoto = '/sample_donor.jfif';

// Split donation count into top and bottom (e.g. "১ম" and "বার")
const countTop = computed(() => {
  const c = props.data.donationCount || '১ম বার';
  const parts = c.split(' ');
  return parts[0] || '১ম';
});

const countBottom = computed(() => {
  const c = props.data.donationCount || '১ম বার';
  const parts = c.split(' ');
  return parts.slice(1).join(' ') || 'বার';
});

const formattedDate = computed(() => {
  if (!props.data.donationDate) return '07-10-2026';
  // If user prefers Bengali digits or standard format
  return formatBengaliDate(props.data.donationDate, props.data.dateFormat || 'numeric');
});
</script>

<style scoped>
.classic-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4.15;
  background-color: #f8fafc;
  background-image: 
    radial-gradient(#e2e8f0 1px, transparent 1px),
    linear-gradient(to bottom, #ffffff, #f1f5f9);
  background-size: 16px 16px, 100% 100%;
  color: #0f172a;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', sans-serif;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Side Red Bars like reference image */
.side-accent-left {
  position: absolute;
  left: 0;
  top: 48%;
  bottom: 12%;
  width: 28px;
  background-color: #b91c1c;
  z-index: 2;
}

.side-accent-right {
  position: absolute;
  right: 0;
  top: 48%;
  bottom: 12%;
  width: 28px;
  background-color: #b91c1c;
  z-index: 2;
}

/* Header */
.classic-header {
  padding: 1.5rem 1.4rem 0.5rem 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 5;
}

.header-titles {
  flex: 1;
}

.org-en-title {
  font-family: 'Outfit', sans-serif;
  font-size: 1.45rem;
  font-weight: 900;
  color: #b91c1c;
  letter-spacing: 0.5px;
  line-height: 1.1;
  text-transform: uppercase;
  margin: 0;
}

.org-bn-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 0.1rem;
  line-height: 1.2;
}

.org-motto {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 0.25rem;
}

.org-quote {
  font-size: 1.45rem;
  font-weight: 800;
  color: #0f172a;
  margin-top: 0.25rem;
  letter-spacing: -0.3px;
  line-height: 1.2;
}

/* Logo */
.org-logo-container {
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-shield {
  position: relative;
  width: 82px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blood-drop-svg {
  width: 72px;
  height: 72px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.logo-ribbon {
  background-color: #15803d;
  color: #fff;
  font-size: 0.46rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 2px;
  white-space: nowrap;
  margin-top: -8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.25);
  border: 1px solid #166534;
}

/* Body Layout */
.classic-body {
  position: relative;
  flex: 1;
  display: flex;
  padding: 0 1.2rem;
  align-items: center;
  z-index: 4;
}

.left-elements {
  width: 38%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 10;
}

.slogan-badge {
  margin-bottom: 1.2rem;
}

.quote-line-1 {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
}

.quote-line-2 {
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.3;
}

/* Count Circle */
.count-circle-badge {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ef4444, #b91c1c 80%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(185, 28, 28, 0.4);
  margin-left: 20%;
  margin-bottom: 1.5rem;
  border: 3px solid #ffffff;
  z-index: 12;
}

.count-text-top {
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
}

.count-text-bottom {
  font-size: 1.6rem;
  font-weight: 800;
  line-height: 1;
}

/* Date Box */
.date-badge-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.2rem;
}

.calendar-icon {
  display: flex;
  align-items: center;
}

.date-text {
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #b91c1c;
}

/* Photo Frame */
.photo-frame-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blood-group-circle {
  position: absolute;
  top: -24px;
  right: 10px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ef4444, #b91c1c 80%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #ffffff;
  box-shadow: 0 6px 16px rgba(185, 28, 28, 0.4);
  z-index: 11;
}

.bg-text {
  font-family: 'Outfit', sans-serif;
  font-size: 2.2rem;
  font-weight: 900;
  color: #ffffff;
}

.donor-photo-frame {
  width: 250px;
  height: 290px;
  border: 5px solid #ffffff;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  background-color: #cbd5e1;
  position: relative;
  z-index: 8;
}

.donor-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

/* Bottom Banner */
.classic-footer-banner {
  position: relative;
  background: linear-gradient(90deg, #991b1b 0%, #b91c1c 100%);
  color: #ffffff;
  padding: 0.75rem 1.4rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 75px;
}

.name-ribbon-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  z-index: 2;
}

.donor-label {
  font-size: 1.35rem;
  font-weight: 800;
  white-space: nowrap;
  letter-spacing: -0.5px;
}

.donor-name {
  font-size: 1.6rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Reference Tag */
.reference-tag {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #fef08a;
  background: rgba(0, 0, 0, 0.25);
  padding: 0.15rem 0.6rem;
  border-radius: 4px;
  width: fit-content;
  position: relative;
  z-index: 2;
}

.ref-label {
  font-weight: 600;
}

.ref-val {
  font-weight: 700;
}

.watermark-logo {
  position: absolute;
  right: 15px;
  bottom: 5px;
  width: 65px;
  height: 65px;
  pointer-events: none;
  z-index: 1;
}

.watermark-svg {
  width: 100%;
  height: 100%;
}
</style>
