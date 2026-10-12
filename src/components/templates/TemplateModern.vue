<template>
  <div class="modern-poster">
    <!-- Top Geometric Glow -->
    <div class="top-glow"></div>
    <div class="bottom-glow"></div>

    <!-- Header -->
    <header class="modern-header">
      <div class="header-left">
        <span class="badge-salute">🎖️ স্যালুট রক্তযোদ্ধা</span>
        <h1 class="org-name">{{ data.orgSubtitle || data.orgName || 'বাঞ্ছারামপুর ব্লাড ব্যাংক' }}</h1>
        <p class="org-sub">{{ data.orgName || 'BANCHARAMPUR BLOOD BANK' }}</p>
      </div>

      <!-- Blood Group Neon Badge -->
      <div class="blood-group-badge">
        <div class="bg-label">রক্তের গ্রুপ</div>
        <div class="bg-val">{{ data.bloodGroup || 'O+' }}</div>
      </div>
    </header>

    <!-- Hero Card with Photo -->
    <main class="modern-body">
      <div class="photo-container">
        <div class="photo-ring">
          <img 
            :src="data.donorPhoto || defaultPhoto" 
            alt="রক্তদাতা" 
            class="photo-img"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>
        <!-- Donation count floating badge -->
        <div class="count-pill">
          <span class="star">★</span>
          <span>{{ data.donationCount || '১ম বার' }} রক্তদান</span>
        </div>
      </div>

      <!-- Donor Info Box -->
      <div class="donor-details-card">
        <div class="salute-label">শ্রদ্ধা ও ভালোবাসায়</div>
        <h2 class="donor-full-name">{{ data.donorName || 'মোঃ জামাল উদ্দিন' }}</h2>

        <div class="quote-box">
          <p class="quote-text">“{{ data.quote || 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' }}”</p>
        </div>

        <div class="meta-row">
          <div class="meta-item">
            <span class="meta-icon">📅</span>
            <span class="meta-text">{{ formattedDate }}</span>
          </div>

          <div v-if="data.referenceName" class="meta-item ref-item">
            <span class="meta-icon">🤝</span>
            <span class="meta-text">রেফারেন্স: {{ data.referenceName }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="modern-footer">
      <div class="footer-motto">
        <span>❤️ {{ data.slogan || 'রক্ত দেওয়ার জন্যেই আমরা' }}</span>
        <span class="dot">•</span>
        <span>{{ data.heroQuote || 'রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে' }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatBengaliDate } from '../../utils/bengaliUtils';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const defaultPhoto = '/sample_donor.jfif';

const formattedDate = computed(() => {
  if (!props.data.donationDate) return '০৭ অক্টোবর, ২০২৬';
  return formatBengaliDate(props.data.donationDate, 'full');
});
</script>

<style scoped>
.modern-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4.15;
  background: radial-gradient(circle at 50% 10%, #450a0a 0%, #1e1112 40%, #0c0809 100%);
  color: #f8fafc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', sans-serif;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.top-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.35) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.bottom-glow {
  position: absolute;
  bottom: -60px;
  left: -60px;
  width: 260px;
  height: 260px;
  background: radial-gradient(circle, rgba(185, 28, 28, 0.25) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

/* Header */
.modern-header {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.badge-salute {
  display: inline-block;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.4);
  color: #fca5a5;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.3rem;
}

.org-name {
  font-size: 1.35rem;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}

.org-sub {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8rem;
  color: #ef4444;
  letter-spacing: 1px;
  font-weight: 700;
  text-transform: uppercase;
}

.blood-group-badge {
  background: linear-gradient(135deg, #ef4444, #991b1b);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
  border-radius: 14px;
  padding: 0.5rem 0.9rem;
  text-align: center;
  min-width: 75px;
}

.bg-label {
  font-size: 0.65rem;
  color: #fecaca;
  font-weight: 600;
}

.bg-val {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  line-height: 1;
}

/* Body */
.modern-body {
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.8rem 0;
}

.photo-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.2rem;
}

.photo-ring {
  width: 210px;
  height: 230px;
  border-radius: 20px;
  overflow: hidden;
  border: 4px solid #ef4444;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.6), 0 0 30px rgba(239, 68, 68, 0.35);
  background-color: #1e293b;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.count-pill {
  position: absolute;
  bottom: -14px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #fff;
  font-size: 0.85rem;
  font-weight: 800;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(217, 119, 6, 0.4);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border: 2px solid #fff;
}

.star {
  font-size: 1rem;
}

.donor-details-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  text-align: center;
}

.salute-label {
  font-size: 0.85rem;
  color: #fca5a5;
  font-weight: 600;
}

.donor-full-name {
  font-size: 1.7rem;
  font-weight: 800;
  color: #fff;
  margin: 0.2rem 0;
  background: linear-gradient(90deg, #fff, #fecaca);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.quote-box {
  margin: 0.4rem 0 0.8rem;
}

.quote-text {
  font-size: 0.95rem;
  font-style: italic;
  color: #e2e8f0;
  line-height: 1.3;
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 0.6rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.ref-item {
  background: rgba(245, 158, 11, 0.15);
  padding: 0.15rem 0.6rem;
  border-radius: 6px;
  color: #fef08a;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

/* Footer */
.modern-footer {
  position: relative;
  z-index: 5;
  text-align: center;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-motto {
  font-size: 0.8rem;
  color: #94a3b8;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  color: #ef4444;
}
</style>
