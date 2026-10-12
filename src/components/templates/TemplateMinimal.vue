<template>
  <div class="minimal-poster">
    <!-- Top Bar -->
    <div class="top-red-stripe"></div>

    <!-- Header -->
    <header class="min-header">
      <div class="min-titles">
        <h1 class="min-org">{{ data.orgSubtitle || data.orgName || 'বাঞ্ছারামপুর ব্লাড ব্যাংক' }}</h1>
        <p class="min-slogan">{{ data.heroQuote || '“রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে”' }}</p>
      </div>

      <!-- Blood Group Minimal Box -->
      <div class="min-blood-box">
        <span class="blood-label">গ্রুপ</span>
        <span class="blood-val">{{ data.bloodGroup || 'O+' }}</span>
      </div>
    </header>

    <!-- Body Layout -->
    <main class="min-body">
      <!-- Framed Photo -->
      <div class="min-photo-wrap">
        <div class="photo-box">
          <img 
            :src="data.donorPhoto || defaultPhoto" 
            alt="রক্তদাতা" 
            class="min-photo"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
        </div>
        <div class="min-count-tag">
          {{ data.donationCount || '১ম বার' }} রক্তদান
        </div>
      </div>

      <!-- Details -->
      <div class="min-details">
        <div class="donor-designation">শ্রদ্ধেয় রক্তদাতা</div>
        <h2 class="min-donor-name">{{ data.donorName || 'মোঃ জামাল উদ্দিন' }}</h2>
        
        <p class="min-quote">
          “{{ data.quote || 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার' }}”
        </p>

        <div class="min-meta-grid">
          <div class="min-meta-card">
            <span class="meta-label">তারিখ:</span>
            <span class="meta-val">{{ formattedDate }}</span>
          </div>

          <div v-if="data.referenceName" class="min-meta-card ref-card">
            <span class="meta-label">রেফারেন্স:</span>
            <span class="meta-val">{{ data.referenceName }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="min-footer">
      <div class="footer-msg">❤️ আপনার এক ব্যাগ রক্ত বাঁচিয়েছে একটি মূল্যবান প্রাণ। কৃতজ্ঞতা ও শুভকামনা।</div>
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
  if (!props.data.donationDate) return '০৭-১০-২০২৬';
  return formatBengaliDate(props.data.donationDate, 'bengali-digits');
});
</script>

<style scoped>
.minimal-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4.15;
  background: #ffffff;
  color: #0f172a;
  padding: 1.5rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', sans-serif;
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

.min-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f1f5f9;
}

.min-org {
  font-size: 1.4rem;
  font-weight: 800;
  color: #991b1b;
  line-height: 1.2;
}

.min-slogan {
  font-size: 0.85rem;
  font-weight: 600;
  color: #64748b;
  margin-top: 0.15rem;
}

.min-blood-box {
  background: #fee2e2;
  border: 2px solid #ef4444;
  border-radius: 12px;
  padding: 0.35rem 0.8rem;
  text-align: center;
}

.blood-label {
  display: block;
  font-size: 0.65rem;
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

/* Body */
.min-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
}

.min-photo-wrap {
  position: relative;
  margin-bottom: 1rem;
}

.photo-box {
  width: 200px;
  height: 220px;
  border-radius: 14px;
  overflow: hidden;
  border: 3px solid #0f172a;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  background: #f1f5f9;
}

.min-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.min-count-tag {
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

.min-details {
  text-align: center;
  width: 100%;
}

.donor-designation {
  font-size: 0.85rem;
  color: #ef4444;
  font-weight: 700;
}

.min-donor-name {
  font-size: 1.65rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin: 0.15rem 0;
}

.min-quote {
  font-size: 0.9rem;
  color: #475569;
  font-style: italic;
  margin-bottom: 0.8rem;
}

.min-meta-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
}

.min-meta-card {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.85rem;
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

/* Footer */
.min-footer {
  text-align: center;
  border-top: 1px dashed #cbd5e1;
  padding-top: 0.6rem;
}

.footer-msg {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}
</style>
