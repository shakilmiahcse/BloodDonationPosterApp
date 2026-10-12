<template>
  <div class="cert-poster">
    <!-- Ornate Double Border -->
    <div class="cert-inner-border">
      <!-- Corner Ornaments -->
      <div class="corner corner-tl">❖</div>
      <div class="corner corner-tr">❖</div>
      <div class="corner corner-bl">❖</div>
      <div class="corner corner-br">❖</div>

      <!-- Header -->
      <header class="cert-header">
        <div class="cert-badge">🏅 সম্মাননা ও কৃতজ্ঞতা স্মারক</div>
        <h1 class="cert-org-name">{{ data.orgSubtitle || data.orgName || 'বাঞ্ছারামপুর ব্লাড ব্যাংক' }}</h1>
        <p class="cert-motto">{{ data.heroQuote || '“রক্তের প্রয়োজনে মুমূর্ষ রোগীর পাশে”' }}</p>
      </header>

      <!-- Body -->
      <main class="cert-body">
        <div class="cert-intro">মানবতার কল্যাণে নিঃস্বার্থ রক্তদানের জন্য পরম শ্রদ্ধায় নিবেদিত</div>

        <!-- Center Layout: Photo & Official Seal -->
        <div class="cert-center-row">
          <div class="cert-photo-wrapper">
            <div class="cert-photo-frame">
              <img 
                :src="data.donorPhoto || defaultPhoto" 
                alt="রক্তদাতা" 
                class="cert-photo"
                :style="{
                  transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
                }"
              />
            </div>
            <div class="cert-count-ribbon">
              {{ data.donationCount || '১ম বার' }} রক্তদান সম্পন্ন
            </div>
          </div>

          <!-- Blood Group Stamp / Seal -->
          <div class="cert-seal">
            <div class="seal-inner">
              <div class="seal-text-top">ব্লাড গ্রুপ</div>
              <div class="seal-group">{{ data.bloodGroup || 'O+' }}</div>
              <div class="seal-text-bottom">★ প্রমাণিত ★</div>
            </div>
          </div>
        </div>

        <!-- Donor Honorific Title -->
        <div class="donor-name-box">
          <div class="honor-prefix">সম্মানিত রক্তযোদ্ধা</div>
          <h2 class="honor-name">{{ data.donorName || 'মোঃ জামাল উদ্দিন' }}</h2>
        </div>

        <!-- Certificate Declaration Message -->
        <p class="cert-statement">
          আপনার দানকৃত অমূল্য রক্ত একটি মুমূর্ষু প্রাণের বাঁচার নতুন আশা যুগিয়েছে। আপনার এই মহৎ আত্মত্যাগকে স্মরণীয় করে রাখতে আমাদের এই বিনম্র শ্রদ্ধাঞ্জলি।
        </p>
      </main>

      <!-- Footer & Signatures -->
      <footer class="cert-footer">
        <div class="sign-block left">
          <div class="sign-val">{{ formattedDate }}</div>
          <div class="sign-line"></div>
          <div class="sign-title">রক্তদানের তারিখ</div>
        </div>

        <div class="sign-block center">
          <div class="stamp-icon">🩸</div>
          <div class="stamp-motto">{{ data.quote || 'রক্তদান জীবনের শ্রেষ্ঠ উপহার' }}</div>
        </div>

        <div class="sign-block right">
          <div class="sign-val">{{ data.referenceName || data.orgSubtitle || 'কর্তৃপক্ষ' }}</div>
          <div class="sign-line"></div>
          <div class="sign-title">{{ data.referenceName ? 'রেফারেন্স / সহযোগিতায়' : 'স্বাক্ষর ও পরিচালনা' }}</div>
        </div>
      </footer>
    </div>
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
.cert-poster {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4.15;
  background: #fdfbf7;
  color: #1e293b;
  padding: 1rem;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', serif;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.cert-inner-border {
  height: 100%;
  border: 4px double #b91c1c;
  outline: 1px solid #d97706;
  outline-offset: -8px;
  padding: 1.25rem 1.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background: radial-gradient(circle at center, #ffffff 60%, #fef3c7 100%);
}

.corner {
  position: absolute;
  font-size: 1.1rem;
  color: #b91c1c;
  line-height: 1;
}
.corner-tl { top: 12px; left: 12px; }
.corner-tr { top: 12px; right: 12px; }
.corner-bl { bottom: 12px; left: 12px; }
.corner-br { bottom: 12px; right: 12px; }

/* Header */
.cert-header {
  text-align: center;
  padding-bottom: 0.5rem;
}

.cert-badge {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #991b1b;
  letter-spacing: 0.5px;
  background: rgba(185, 28, 28, 0.08);
  padding: 0.2rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(185, 28, 28, 0.2);
  margin-bottom: 0.3rem;
}

.cert-org-name {
  font-family: 'Tiro Bangla', serif;
  font-size: 1.55rem;
  font-weight: 700;
  color: #7f1d1d;
  line-height: 1.2;
}

.cert-motto {
  font-size: 0.9rem;
  font-style: italic;
  color: #475569;
  margin-top: 0.2rem;
}

/* Body */
.cert-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0.5rem 0;
}

.cert-intro {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 0.8rem;
}

.cert-center-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 0.8rem;
}

.cert-photo-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cert-photo-frame {
  width: 155px;
  height: 180px;
  border: 4px solid #b91c1c;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  border-radius: 8px;
  overflow: hidden;
  background: #e2e8f0;
}

.cert-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cert-count-ribbon {
  position: absolute;
  bottom: -10px;
  background: #b91c1c;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.15rem 0.75rem;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  border: 1px solid #fff;
  white-space: nowrap;
}

/* Seal */
.cert-seal {
  width: 95px;
  height: 95px;
  border-radius: 50%;
  border: 3px dashed #b91c1c;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fef2f2;
}

.seal-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #dc2626;
  background: linear-gradient(135deg, #ef4444, #991b1b);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.seal-text-top {
  font-size: 0.6rem;
  font-weight: 600;
}

.seal-group {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 900;
  line-height: 1;
}

.seal-text-bottom {
  font-size: 0.5rem;
  letter-spacing: 0.5px;
}

.donor-name-box {
  margin: 0.6rem 0 0.4rem;
}

.honor-prefix {
  font-size: 0.85rem;
  color: #991b1b;
  font-weight: 600;
}

.honor-name {
  font-family: 'Tiro Bangla', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #7f1d1d;
  line-height: 1.2;
}

.cert-statement {
  font-size: 0.85rem;
  color: #334155;
  max-width: 420px;
  line-height: 1.4;
  margin-top: 0.4rem;
}

/* Footer */
.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 0.8rem;
}

.sign-block {
  text-align: center;
  min-width: 100px;
}

.sign-val {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.2rem;
}

.sign-line {
  height: 1px;
  background-color: #94a3b8;
  margin: 0 auto 0.2rem;
  width: 100%;
}

.sign-title {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 600;
}

.sign-block.center {
  flex: 1;
  padding: 0 0.5rem;
}

.stamp-icon {
  font-size: 1.3rem;
  line-height: 1;
}

.stamp-motto {
  font-size: 0.65rem;
  color: #991b1b;
  font-weight: 600;
}
</style>
