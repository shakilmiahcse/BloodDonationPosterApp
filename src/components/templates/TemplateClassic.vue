<template>
  <div class="bb-poster-root" ref="posterEl">
    <!-- Outer Poster Canvas Frame -->
    <div class="bb-canvas">
      
      <!-- Top Section (Clean Luxury Ivory with Studio Lighting) -->
      <section class="bb-top-section">
        <!-- Subtle background ambient pattern/watermark -->
        <div class="bb-top-bg-fx" aria-hidden="true">
          <div class="top-glow-spot"></div>
        </div>

        <!-- Top Left Typography Column -->
        <div class="bb-org-info">
          <h1 
            class="bb-org-name" 
            :style="{ fontSize: orgNameFontSize }"
            :title="data.orgName || (isBn ? 'সংগঠনের নাম' : 'ORGANIZATION NAME')"
          >
            {{ data.orgName || (isBn ? 'সংগঠনের নাম' : 'ORGANIZATION NAME') }}
          </h1>
          
          <div v-if="data.orgSubtitle" class="bb-org-subtitle" :style="{ fontSize: orgSubtitleFontSize }">
            ({{ data.orgSubtitle }})
          </div>
          
          <div v-if="data.slogan" class="bb-slogan" :style="{ fontSize: sloganFontSize }">
            {{ data.slogan }}
          </div>
          <div v-else-if="!data.orgSubtitle" class="bb-slogan" :style="{ fontSize: sloganFontSize }">
            {{ isBn ? 'রক্ত দেওয়ার জন্যেই আমরা' : 'For Voluntary Blood Service' }}
          </div>

          <div class="bb-hero-quote" :style="{ fontSize: heroQuoteFontSize }">
            “{{ data.heroQuote || (isBn ? 'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে' : 'Standing beside patients in need') }}”
          </div>

          <div class="bb-motto" :style="{ fontSize: mottoFontSize }">
            <template v-if="data.quote">
              <span class="motto-line">{{ data.quote }}</span>
            </template>
            <template v-else>
              <span class="motto-line">{{ isBn ? 'রক্তদান হোক' : 'Blood donation is' }}</span>
              <span class="motto-line">{{ isBn ? 'আপনার জীবনের শ্রেষ্ঠ উপহার' : 'The greatest gift of life' }}</span>
            </template>
          </div>
        </div>

        <!-- Top Right Logo Section -->
        <div class="bb-logo-area">
          <div class="bb-logo-frame">
            <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="bb-logo-img" />
            <div v-else class="bb-logo-emblem">
              <span class="emblem-icon">🩸</span>
              <span class="emblem-text">{{ isBn ? 'ব্লাড ব্যাংক' : 'BLOOD' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Dynamic Wave Transition (Photoshop Layered Curve) -->
      <div class="bb-wave-divider" aria-hidden="true">
        <svg viewBox="0 0 1000 120" preserveAspectRatio="none" class="bb-wave-svg">
          <defs>
            <linearGradient id="waveCrimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#cb101a" />
              <stop offset="50%" stop-color="#a00810" />
              <stop offset="100%" stop-color="#760309" />
            </linearGradient>
            <linearGradient id="waveAccentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.95" />
              <stop offset="35%" stop-color="#ff4444" stop-opacity="0.85" />
              <stop offset="70%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="100%" stop-color="#ff6b6b" stop-opacity="0.75" />
            </linearGradient>
          </defs>
          <!-- Layer 1: Translucent depth shadow wave -->
          <path d="M0,35 C220,95 400,10 620,55 C820,95 930,25 1000,48 L1000,120 L0,120 Z" fill="rgba(85, 4, 8, 0.45)" />
          <!-- Layer 2: 3D Golden/Ruby Accent Highlight Ridge -->
          <path d="M0,38 C220,98 400,13 620,58 C820,98 930,28 1000,51 L1000,55 C930,32 820,102 620,62 C400,17 220,102 0,42 Z" fill="url(#waveAccentGrad)" />
          <!-- Layer 3: Main Rich Crimson Wave -->
          <path d="M0,42 C220,102 400,17 620,62 C820,102 930,32 1000,55 L1000,120 L0,120 Z" fill="url(#waveCrimsonGrad)" />
        </svg>
      </div>

      <!-- Bottom Deep Crimson Section -->
      <section class="bb-bottom-section">
        <!-- Ambient Radial Spotlight behind Photo Stage -->
        <div class="bb-spotlight-glow" aria-hidden="true"></div>

        <!-- Layered Background Geometric & Organic Curves -->
        <div class="bb-bg-curves" aria-hidden="true">
          <svg viewBox="0 0 500 400" preserveAspectRatio="none" class="curves-svg">
            <path d="M-50,220 C100,160 250,280 550,150 L550,450 L-50,450 Z" fill="rgba(255, 255, 255, 0.03)" />
            <path d="M-20,320 C150,240 320,380 520,260 L520,420 L-20,420 Z" fill="rgba(0, 0, 0, 0.12)" />
            <!-- Sweeping light flare curve -->
            <path d="M-50,180 Q250,300 550,120" stroke="rgba(255, 255, 255, 0.08)" stroke-width="2" fill="none" />
          </svg>
        </div>

        <!-- Multi-Layer Translucent Watermark (Bottom Right) -->
        <div class="bb-watermark" aria-hidden="true">
          <svg viewBox="0 0 160 180" class="watermark-svg">
            <defs>
              <linearGradient id="dropGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22" />
                <stop offset="60%" stop-color="#ffffff" stop-opacity="0.08" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02" />
              </linearGradient>
              <linearGradient id="dropShine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.45" />
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0.0" />
              </linearGradient>
            </defs>
            <!-- Outer ripple arcs -->
            <circle cx="85" cy="115" r="55" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" stroke-dasharray="6,4" />
            <circle cx="85" cy="115" r="72" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" />
            <!-- Main Blood Droplet -->
            <path d="M85 15 C85 15 35 85 35 120 A50 50 0 0 0 135 120 C135 85 85 15 85 15 Z" fill="url(#dropGrad)" />
            <!-- Specular Highlight Curve -->
            <path d="M72 45 C65 65 52 90 52 115 A12 12 0 0 0 58 126 C54 112 60 88 74 65 Z" fill="url(#dropShine)" />
            <!-- Floating micro drop -->
            <path d="M125 45 C125 45 115 62 115 72 A10 10 0 0 0 135 72 C135 62 125 45 125 45 Z" fill="rgba(255, 255, 255, 0.12)" />
          </svg>
        </div>

        <!-- Left Column: Calendar & Date + Reference -->
        <div class="bb-bottom-left">
          <div class="bb-date-block">
            <!-- High-Res Vector Calendar Card -->
            <div class="bb-calendar-icon">
              <div class="cal-rings">
                <span class="cal-ring"></span>
                <span class="cal-ring"></span>
              </div>
              <div class="cal-top-bar">
                <span class="cal-top-title">DATE</span>
              </div>
              <div class="cal-body">
                <div class="cal-grid">
                  <span></span><span></span><span></span><span></span>
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>

            <!-- Bold Date Typography with Depth -->
            <div class="bb-date-val">{{ formattedDate }}</div>
          </div>

          <!-- Optional Reference Information -->
          <div v-if="hasReference" class="bb-ref-pill">
            <span class="ref-tag">🤝 {{ isBn ? 'সংগ্রাহক:' : 'Ref:' }}</span>
            <span class="ref-name">{{ data.referenceName }}</span>
          </div>
        </div>

        <!-- Bottom Donor Name Plaque (Photoshop Glass & Metallic Rim) -->
        <div class="bb-donor-bar">
          <!-- Integrated Designer Header Badge -->
          <div class="bb-donor-badge">
            <span class="donor-badge-dot">🩸</span>
            <span class="donor-badge-text">{{ isBn ? 'রক্ত দাতা :-' : 'HONORABLE DONOR :-' }}</span>
          </div>

          <!-- Glassmorphism & Metallic Rim Plaque -->
          <div class="bb-name-box">
            <div class="name-box-sheen"></div>
            <h2 class="bb-donor-name">{{ data.donorName || (isBn ? 'রক্তদাতার পুরো নাম' : 'Donor Full Name') }}</h2>
            <div class="name-box-accent"></div>
          </div>
        </div>
      </section>

      <!-- Center Overlapping Photo & 3D Badges -->
      <div class="bb-photo-stage">
        <!-- Main Framed Photo with Studio Shadows -->
        <div class="bb-photo-frame">
          <div class="photo-glass-sheen"></div>
          <img 
            v-if="donorPhotoSrc"
            :src="donorPhotoSrc" 
            alt="Donor" 
            class="bb-photo-img"
            :style="{
              transform: `scale(${data.photoZoom || 1}) translate(${data.photoPanX || 0}px, ${data.photoPanY || 0}px)`
            }"
          />
          <div v-else class="bb-photo-placeholder">
            <svg class="placeholder-avatar-svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
            </svg>
            <span class="placeholder-prompt">{{ isBn ? 'ছবি যুক্ত করুন' : 'Add Photo' }}</span>
          </div>
        </div>

        <!-- 3D Glossy Blood Group Badge (Top-Right) -->
        <div class="bb-blood-badge">
          <div class="badge-gloss-cap"></div>
          <span class="blood-group-val">{{ data.bloodGroup || 'O+' }}</span>
        </div>

        <!-- 3D Glossy Donation Count Badge (Left) -->
        <div class="bb-count-badge">
          <div class="badge-gloss-cap"></div>
          <div class="count-badge-inner">
            <span class="count-number">{{ parsedCount.number }}</span>
            <span class="count-unit">{{ parsedCount.unit }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { currentLang } from '../../utils/i18n';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});

const isBn = computed(() => currentLang.value === 'bn');

const logoSrc = computed(() => {
  return props.data.orgLogo || '';
});

const donorPhotoSrc = computed(() => {
  return props.data.donorPhoto || '';
});

const hasReference = computed(() => {
  return typeof props.data.referenceName === 'string' && props.data.referenceName.trim().length > 0;
});

const formattedDate = computed(() => {
  if (!props.data.donationDate) return '07-10-2026';
  const parts = props.data.donationDate.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return props.data.donationDate;
});

const parsedCount = computed(() => {
  const val = (props.data.donationCount || (isBn.value ? '১ম বার' : '1st Time')).trim();
  const spaceIdx = val.indexOf(' ');
  if (spaceIdx > 0) {
    return {
      number: val.substring(0, spaceIdx),
      unit: val.substring(spaceIdx + 1)
    };
  }
  return {
    number: val,
    unit: isBn.value ? 'বার' : 'Time'
  };
});

const orgNameFontSize = computed(() => {
  const len = (props.data.orgName || '').length;
  if (!len) return '1.45rem';
  if (len <= 16) return '1.58rem';
  if (len <= 26) return '1.42rem';
  if (len <= 38) return '1.25rem';
  if (len <= 50) return '1.10rem';
  return '0.98rem';
});

const orgSubtitleFontSize = computed(() => {
  const len = (props.data.orgSubtitle || '').length;
  if (!len) return '1.12rem';
  if (len <= 18) return '1.18rem';
  if (len <= 30) return '1.05rem';
  return '0.92rem';
});

const sloganFontSize = computed(() => {
  const len = (props.data.slogan || '').length;
  if (!len) return '1.15rem';
  if (len <= 20) return '1.22rem';
  if (len <= 35) return '1.08rem';
  return '0.94rem';
});

const heroQuoteFontSize = computed(() => {
  const len = (props.data.heroQuote || '').length;
  if (!len) return '1.52rem';
  if (len <= 24) return '1.68rem';
  if (len <= 38) return '1.46rem';
  if (len <= 52) return '1.26rem';
  return '1.10rem';
});

const mottoFontSize = computed(() => {
  const len = (props.data.quote || '').length;
  if (!len) return '1.08rem';
  if (len <= 25) return '1.16rem';
  if (len <= 45) return '1.02rem';
  return '0.88rem';
});
</script>

<style scoped>
.bb-poster-root {
  position: relative;
  width: 100%;
  aspect-ratio: 10 / 14.1;
  background: #0f1711;
  border: 5px solid #0f1711;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.08);
  border-radius: 4px;
}

.bb-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fdfdfc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* =========================================================
   TOP SECTION (Clean Studio Ivory with Dynamic Typography)
   ========================================================= */
.bb-top-section {
  position: relative;
  height: 42%;
  padding: 1.15rem 1.25rem 0.6rem 1.25rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(175deg, #ffffff 0%, #faf8f7 65%, #f4efee 100%);
  z-index: 2;
}

.bb-top-bg-fx {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.top-glow-spot {
  position: absolute;
  top: -40px;
  left: -40px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, transparent 70%);
}

.bb-org-info {
  flex: 1;
  max-width: calc(100% - 114px);
  display: flex;
  flex-direction: column;
  min-width: 0;
  z-index: 2;
  gap: 0.18rem;
}

/* Dynamic auto-fit typography: scales based on text length to fill available area beautifully */
.bb-org-name {
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
  font-weight: 900;
  color: #b90e17;
  line-height: 1.22;
  letter-spacing: 0.25px;
  text-transform: uppercase;
  margin: 0;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(185, 14, 23, 0.15);
  transition: font-size 0.2s ease;
}

.bb-org-subtitle {
  font-weight: 800;
  color: #1e293b;
  margin-top: 0.05rem;
  line-height: 1.22;
  word-break: break-word;
  transition: font-size 0.2s ease;
}

.bb-slogan {
  font-weight: 800;
  color: #1e293b;
  margin-top: 0.1rem;
  line-height: 1.22;
  transition: font-size 0.2s ease;
}

.bb-hero-quote {
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-weight: 900;
  color: #0f172a;
  margin-top: 0.2rem;
  line-height: 1.22;
  letter-spacing: -0.2px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
  transition: font-size 0.2s ease;
}

.bb-motto {
  margin-top: 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  transition: font-size 0.2s ease;
}

.motto-line {
  font-size: inherit;
  font-weight: 700;
  color: #334155;
  line-height: 1.22;
}

/* TOP RIGHT LOGO EMBLEM - Large, crisp, prominent branded bezel */
.bb-logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 0.1rem;
  z-index: 2;
  width: 104px;
  flex-shrink: 0;
}

.bb-logo-frame {
  width: 98px;
  height: 98px;
  border-radius: 50%;
  background: #ffffff;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18), 0 0 0 2px rgba(185, 14, 23, 0.25);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.bb-logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.bb-logo-emblem {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #ffffff 0%, #fee2e2 70%, #fecaca 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.emblem-icon {
  font-size: 2.1rem;
  line-height: 1;
}

.emblem-text {
  font-size: 0.62rem;
  font-weight: 800;
  color: #b90e17;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 2px;
}

/* =========================================================
   DYNAMIC WAVE DIVIDER (Photoshop Vector Wave)
   ========================================================= */
.bb-wave-divider {
  position: absolute;
  top: calc(42% - 24px);
  left: 0;
  width: 100%;
  height: 38px;
  pointer-events: none;
  z-index: 3;
}

.bb-wave-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* =========================================================
   BOTTOM CRIMSON SECTION (Photoshop Lighting & Depth)
   ========================================================= */
.bb-bottom-section {
  position: relative;
  height: 58%;
  background: radial-gradient(circle at 75% 20%, #c8101a 0%, #9e080f 42%, #760309 76%, #4e0205 100%);
  padding: 1.25rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
  box-shadow: inset 0 -35px 50px rgba(0, 0, 0, 0.45);
}

/* Ambient Radial Glow behind the photo */
.bb-spotlight-glow {
  position: absolute;
  top: -30px;
  right: 25px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 75, 75, 0.28) 0%, rgba(200, 10, 20, 0.12) 50%, transparent 75%);
  pointer-events: none;
  z-index: 1;
  filter: blur(15px);
}

/* Layered abstract background swooshes */
.bb-bg-curves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.curves-svg {
  width: 100%;
  height: 100%;
}

/* Translucent Watermark (Bottom Right) */
.bb-watermark {
  position: absolute;
  right: -10px;
  bottom: -10px;
  width: 175px;
  height: 195px;
  pointer-events: none;
  z-index: 1;
}

.watermark-svg {
  width: 100%;
  height: 100%;
}

/* Left Column: Calendar & Date + Reference */
.bb-bottom-left {
  position: relative;
  z-index: 3;
  max-width: 46%;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  margin-top: 1.1rem;
}

.bb-date-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;
}

/* Vector Calendar Card with Depth */
.bb-calendar-icon {
  position: relative;
  width: 44px;
  height: 41px;
  background: #ffffff;
  border-radius: 7px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cal-rings {
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 0 9px;
  z-index: 3;
}

.cal-ring {
  width: 4.5px;
  height: 6px;
  background: linear-gradient(180deg, #94a3b8 0%, #cbd5e1 50%, #475569 100%);
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}

.cal-top-bar {
  background: linear-gradient(180deg, #b90e17 0%, #88060c 100%);
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cal-top-title {
  font-size: 0.44rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.8px;
}

.cal-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  background: #ffffff;
}

.cal-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
  width: 82%;
  height: 70%;
}

.cal-grid span {
  background: #b90e17;
  border-radius: 1px;
  opacity: 0.88;
}

.bb-date-val {
  font-family: 'Outfit', 'Hind Siliguri', sans-serif;
  font-size: 1.52rem;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: 0.5px;
  line-height: 1.1;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
}

.bb-ref-pill {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.22) 100%);
  border: 1px solid rgba(255, 255, 255, 0.35);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.78rem;
  color: #ffffff;
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  width: fit-content;
  backdrop-filter: blur(4px);
}

.ref-tag {
  font-weight: 800;
  color: #fde047;
}

.ref-name {
  font-weight: 600;
}

/* =========================================================
   BOTTOM DONOR BAR (Photoshop Glass Plaque & Metallic Rim)
   ========================================================= */
.bb-donor-bar {
  position: relative;
  z-index: 4;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

/* Integrated Header Badge */
.bb-donor-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: linear-gradient(90deg, rgba(160, 10, 16, 0.95) 0%, rgba(220, 20, 30, 0.95) 100%);
  border: 1.5px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.7);
  padding: 0.22rem 0.85rem;
  border-radius: 999px;
  width: fit-content;
}

.donor-badge-dot {
  font-size: 0.92rem;
  line-height: 1;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
}

.donor-badge-text {
  font-family: 'Tiro Bangla', 'Hind Siliguri', sans-serif;
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

/* Glassmorphism Name Plaque */
.bb-name-box {
  position: relative;
  width: 100%;
  border: 2px solid rgba(255, 255, 255, 0.92);
  box-sizing: border-box;
  padding: 0.35rem 1.1rem;
  min-height: 54px;
  border-radius: 8px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.07) 50%, rgba(0, 0, 0, 0.28) 100%);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 
    0 10px 25px rgba(0, 0, 0, 0.45), 
    inset 0 1.5px 0 rgba(255, 255, 255, 0.75), 
    inset 0 -1.5px 0 rgba(0, 0, 0, 0.3),
    0 0 12px rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.name-box-sheen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}

.name-box-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #f59e0b 0%, #ef4444 50%, #f59e0b 100%);
  opacity: 0.85;
}

.bb-donor-name {
  position: relative;
  z-index: 2;
  font-family: 'Tiro Bangla', 'Hind Siliguri', serif;
  font-size: 2.1rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1.25;
  margin: 0;
  letter-spacing: 0.4px;
  text-shadow: 0 3px 8px rgba(0, 0, 0, 0.65), 0 0 12px rgba(255, 255, 255, 0.25);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.1rem 0;
}

/* =========================================================
   OVERLAPPING PHOTO STAGE & 3D GLOSSY BADGES
   ========================================================= */
.bb-photo-stage {
  position: absolute;
  right: 1.3rem;
  top: 29.5%;
  width: 250px;
  height: 315px;
  z-index: 10;
}

/* Photo Frame with Multi-Layer Studio Shadows */
.bb-photo-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border: 5px solid #ffffff;
  outline: 1.5px solid rgba(0, 0, 0, 0.15);
  box-sizing: border-box;
  border-radius: 6px;
  overflow: hidden;
  background: #f1f5f9;
  box-shadow: 
    0 22px 48px -6px rgba(0, 0, 0, 0.65), 
    0 8px 18px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.4);
}

.photo-glass-sheen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 45%);
  pointer-events: none;
  z-index: 3;
}

.bb-photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.1s ease-out;
}

.bb-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e2e8f0;
  color: #94a3b8;
  gap: 0.6rem;
}

.placeholder-avatar-svg {
  width: 72px;
  height: 72px;
  opacity: 0.65;
}

.placeholder-prompt {
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  background: #ffffff;
  padding: 0.25rem 0.85rem;
  border-radius: 999px;
  border: 1px dashed #cbd5e1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* 3D GLOSSY BLOOD GROUP BADGE (Top-Right) */
.bb-blood-badge {
  position: absolute;
  top: -24px;
  right: -22px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #ff4b4b 0%, #db0e18 45%, #92060d 80%, #520206 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 12px 30px rgba(0, 0, 0, 0.6), 
    0 0 16px rgba(239, 68, 68, 0.45),
    inset 0 2.5px 4px rgba(255, 255, 255, 0.85), 
    inset 0 -3.5px 6px rgba(0, 0, 0, 0.55);
  z-index: 12;
  border: 2px solid #ffffff;
  overflow: hidden;
}

.badge-gloss-cap {
  position: absolute;
  top: 3px;
  left: 10%;
  width: 80%;
  height: 44%;
  border-radius: 50% 50% 45% 45%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.05) 80%, transparent 100%);
  pointer-events: none;
  z-index: 5;
}

.blood-group-val {
  position: relative;
  z-index: 6;
  font-family: 'Outfit', sans-serif;
  font-size: 2.3rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

/* 3D GLOSSY DONATION COUNT BADGE (Left of Photo) */
.bb-count-badge {
  position: absolute;
  top: 35%;
  left: -54px;
  width: 102px;
  height: 102px;
  border-radius: 50%;
  border: 4px solid #ffffff;
  box-sizing: border-box;
  background: radial-gradient(circle at 35% 30%, #ff4b4b 0%, #db0e18 45%, #8f060d 80%, #500206 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 12px 30px rgba(0, 0, 0, 0.55), 
    0 0 14px rgba(239, 68, 68, 0.4),
    inset 0 2.5px 4px rgba(255, 255, 255, 0.85), 
    inset 0 -3.5px 6px rgba(0, 0, 0, 0.5);
  z-index: 12;
  overflow: hidden;
}

.count-badge-inner {
  position: relative;
  z-index: 6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.count-number {
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  font-size: 1.85rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.45);
}

.count-unit {
  font-family: 'Hind Siliguri', 'Outfit', sans-serif;
  font-size: 1.35rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  margin-top: 1px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.45);
}
</style>
