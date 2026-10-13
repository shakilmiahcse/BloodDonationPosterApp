# 🩸 Blood Donation Poster Maker & Record Keeper
### রক্তদান পোস্টার মেকার ও ডোনার রেকর্ড কিপার

[![Live Demo](https://img.shields.io/badge/Live%20Demo-donor.hishaby.com-dc2626?style=for-the-badge&logo=google-chrome&logoColor=white)](https://donor.hishaby.com)
[![Vue 3](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge)](LICENSE)

A modern, responsive, Photoshop-quality web application for voluntary blood donation clubs, organizations, and organizers to instantly create stunning tribute posters for donors and manage donation records securely.

স্বেচ্ছাসেবী রক্তদান সংগঠন এবং সংগঠকদের জন্য রক্তদাতাদের সম্মাননা পোস্টার তৈরি এবং ডোনারদের রেকর্ড সংরক্ষণের একটি আধুনিক, মোবাইল-ফ্রেন্ডলি ও পূর্ণাঙ্গ ওপেন-সোর্স ওয়েব অ্যাপ্লিকেশন।

---

## 🌟 Live Demo / লাইভ ওয়েবসাইট
👉 **[https://donor.hishaby.com](https://donor.hishaby.com)**

---

## ✨ Features / প্রধান সুবিধাসমূহ

### 🎨 1. Five Photoshop-Grade Poster Templates (৫টি প্রিমিয়াম টেমপ্লেট)
1. **Blood Hero Card (রক্তযোদ্ধা ফটোকার্ড)** — Facebook standard photo card featuring layered crimson curves and 3D metallic badges.
2. **Tribute Ribbon (রক্তিম শুভেচ্ছা কার্ড)** — Royal ruby & gold aesthetic with studio halo lighting, 3D glossy blood sphere, and sculpted ribbons.
3. **Appreciation Certificate (সম্মাননা সনদ)** — Elegant formal certificate of gratitude with ornate corners and an official seal.
4. **Social Story (সোশ্যাল স্টোরি - 9:16)** — Full-bleed cinematic vertical poster crafted specifically for WhatsApp Status, Facebook Stories, and Reels.
5. **Clean Editorial (ক্লিন প্রেস কার্ড)** — Contemporary newspaper/editorial profile card with bold stamps.

### 📱 2. Device-Independent Uniform Export (যেকোনো ডিভাইসে একই সাইজ ও কোয়ালিটি)
* **Canonical Fixed Canvas Engine (1080p Ultra-HD):**
  Whether a user downloads the poster on an iPhone, an Android phone, a tablet, or a desktop PC, the exported PNG image retains the **exact same 1080px resolution**, aspect ratio, typography hierarchy, and crisp details.
* **Responsive Visual Scaler:**
  Mobile users get a 100% fitting viewport without any horizontal scrolling or text clipping, thanks to dynamic CSS transform scaling.

### 🏛️ 3. Organization Branding & Customization (সংগঠনের ব্র্যান্ডিং)
* Custom logo upload with automatic browser-side compression.
* Organization name, subtitle, and motto with **adaptive typography** (long organization names up to 50+ characters never get clipped).
* Pre-set and customizable motivational quotes in Bengali and English.

### 👤 4. Donor Profile & Photo Adjuster (ডোনার প্রোফাইল ও ছবি সমন্বয়)
* Photo upload with interactive **Zoom (1x–2.5x)** and **Pan (Up/Down)** positioning.
* Quick selection for 8 blood groups (`A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`).
* Donation frequency presets (`১ম বার`, `২য় বার`, etc.) and date picker.
* Optional referrer / collector name (`সংগ্রাহক`).

### 📁 5. Records Management & Account System (ডোনার রেকর্ড ও অ্যাকাউন্ট)
* Guest mode: Instant poster generation without logging in.
* Organizer account: Save donor entries, view history, search by name, filter by blood group, and export records.

### 💬 6. Instant Social Sharing (সোশ্যাল মিডিয়া শেয়ারিং)
* **1-Click WhatsApp Share** with pre-formatted ready-to-post Bengali captions.
* **Native Web Share API** support for mobile devices.
* **1-Click Caption Copy** to clipboard.
* Confetti celebration animation upon download! 🎉

### 🌐 7. Internationalization & Theme (ভাষা ও থিম)
* Seamless one-click switch between **বাংলা** and **English**.
* Built-in **Light** and **Dark** mode toggle.

---

## 🛠️ Technology Stack / প্রযুক্তিসমূহ

* **Frontend:** Vue 3 (Composition API with `<script setup>`)
* **Build Tool:** Vite 6
* **Canvas / Image Rendering:** `html-to-image`, `html2canvas`
* **Animations:** `canvas-confetti`
* **Styling:** Custom Modern CSS3 (Glassmorphism, CSS Custom Properties, Responsive Flexbox & Grid)
* **Typography:** Google Fonts (*Hind Siliguri*, *Tiro Bangla*, *Outfit*)
* **Backend:** Lightweight PHP REST API (`api.php`) with JSON flat-file storage (`data/records.json`)

---

## 🚀 Getting Started / লোকাল কম্পিউটারে রান করার নিয়ম

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher)
* [PHP](https://www.php.net/) (version 7.4 or higher, e.g., XAMPP / WampServer / LAMP)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/blood_donation.git
cd blood_donation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```
The optimized production bundle will be created inside the `dist/` directory.

---

## 📂 Project Structure / ফোল্ডার স্ট্রাকচার

```
blood_donation/
├── public/                 # Static assets (default logo, sample images)
├── data/                   # JSON storage for donor records & accounts
│   ├── records.json        # Donor history database
│   └── users.json          # User accounts database
├── src/
│   ├── assets/             # Asset files
│   ├── components/
│   │   ├── templates/      # 5 Poster Templates
│   │   │   ├── TemplateClassic.vue       # Blood Hero Card
│   │   │   ├── TemplateModern.vue        # Tribute Ribbon
│   │   │   ├── TemplateCertificate.vue   # Appreciation Certificate
│   │   │   ├── TemplateStory.vue         # Social Story (9:16)
│   │   │   └── TemplateMinimal.vue       # Clean Editorial
│   │   ├── AuthModal.vue                 # Login & Registration modal
│   │   ├── EditorForm.vue                # Main form for donor inputs
│   │   ├── PosterPreview.vue             # Scalable preview & export engine
│   │   ├── RecordsDrawer.vue             # Saved records browser
│   │   └── UserMenuModal.vue             # User settings & profile
│   ├── utils/
│   │   ├── api.js                        # Client API endpoints
│   │   ├── bengaliUtils.js               # Bengali date & caption formatter
│   │   ├── i18n.js                       # Bilingual localization dictionary
│   │   └── imageUtils.js                 # Image compression utilities
│   ├── App.vue                           # Root application layout
│   ├── main.js                           # Vue entry file
│   └── style.css                         # Global CSS tokens & responsive styles
├── api.php                 # PHP API handling auth & records
├── index.html              # Main HTML entry
├── package.json            # Project dependencies & scripts
├── vite.config.js          # Vite configuration
└── .gitignore              # Git ignored patterns
```

---

## 🔒 Server Configuration (PHP & Apache)

To enable data persistence on your Apache / XAMPP server:
1. Ensure the `data/` directory has write permissions:
   ```bash
   chmod 775 data/
   chmod 664 data/records.json data/users.json
   ```
2. The included `.htaccess` ensures security and correct API routing.

---

## 🤝 Contributing / অবদান রাখুন

Contributions, bug reports, and feature suggestions are always welcome!
1. Fork the Project (`https://github.com/your-username/blood_donation/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License / লাইসেন্স

This project is licensed under the [MIT License](LICENSE) — feel free to use, modify, and distribute it for personal, community, or commercial voluntary blood donation initiatives.

---

## 💖 Acknowledgements / কৃতজ্ঞতা স্বীকার
Dedicated to all voluntary blood donors and humanitarian organizers who selflessly donate blood and save precious human lives every single day.  
**“রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার”**
