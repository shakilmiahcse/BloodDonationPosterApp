import { ref } from 'vue';

const STORAGE_KEY = 'blood_donation_language';
const initialLang = localStorage.getItem(STORAGE_KEY) || 'en'; // Default English as requested
export const currentLang = ref(initialLang);

export function setLanguage(lang) {
  if (lang === 'bn' || lang === 'en') {
    currentLang.value = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }
}

export function toggleLanguage() {
  const next = currentLang.value === 'en' ? 'bn' : 'en';
  setLanguage(next);
}

export const translations = {
  en: {
    // Brand & Header
    appTitle: 'Blood Donation Poster Maker',
    appSubtitle: 'Honor Donors & Manage Records',
    editorTab: 'Editor',
    previewTab: 'Poster Preview',
    recordsTab: 'Records',
    loginTab: 'Account',
    loginBtn: 'Login / Register',
    guestBadge: 'Guest Mode',
    adminBadge: 'Logged In',
    logoutBtn: 'Logout',
    profileBtn: 'Profile & Settings',
    newEntryBtn: '➕ New Donor Entry',
    newEntryTooltip: 'Clear personal details while keeping your organization & template settings',

    // Editor Sections
    chooseTemplate: '1. Select PhotoCard Style',
    donorDetailsSection: '👤 Donor Information',
    photoSection: '📷 Donor Photograph',
    orgSection: '🏛️ Organization Branding & Logo',
    saveOrgSettingsBtn: 'Save Org Defaults',

    // Org Logo & Details
    orgLogoLabel: 'Organization Logo',
    uploadLogoPrompt: 'Upload Custom Logo',
    changeLogoPrompt: 'Change Logo',
    resetLogoPrompt: 'Remove Logo',
    orgNameLabel: 'Organization Name',
    orgNamePlaceholder: 'e.g. Life Care Blood Donation Club',
    orgSubtitleLabel: 'Organization Subtitle / Tagline',
    orgSubtitlePlaceholder: 'e.g. Voluntary Blood Donation Wing',
    sloganLabel: 'Motto Line',
    heroQuoteLabel: 'Hero Quote Line',

    // Donor Fields
    donorName: 'Donor Full Name',
    donorNamePlaceholder: 'Enter donor full name',
    bloodGroup: 'Blood Group',
    donationCount: 'Donation Frequency / Count',
    donationCountPlaceholder: 'e.g. 1st Time, 5th Time...',
    donationDate: 'Donation Date',
    referenceLabel: 'Referred By (Optional)',
    referenceOptional: 'Optional',
    referencePlaceholder: 'Name of the person who referred / brought this donor',
    referenceHint: 'Who collected or referred this donor (e.g. Brother Rahim / Dr. Sarah). Leave empty if not applicable.',

    // Photo Controls
    uploadPhotoPrompt: 'Upload Donor Photo (Camera or Gallery)',
    changePhotoPrompt: 'Click to change photo',
    mobileUploadHint: 'Supports direct mobile camera and photo gallery',
    dragToFrameHint: '👆 Touch & drag directly on the photo to position face',
    viewPosterPreview: 'View Full Poster',
    changePhotoBtn: 'Change Photo',
    removePhotoBtn: 'Remove',
    zoomLabel: 'Zoom:',
    panYLabel: 'Up / Down:',
    resetAlign: 'Reset',

    // Org Quotes
    quotePresetLabel: 'Select Motivational Quote',
    selectQuotePrompt: 'Choose an inspiring quote...',
    customQuoteLabel: 'Custom Slogan / Quote',
    customQuotePlaceholder: 'Blood donation is the greatest gift of life',

    // Actions & Export
    downloadPngBtn: '📥 Download Poster (PNG)',
    downloadingBtn: 'Generating...',
    whatsappBtn: '💬 WhatsApp Share',
    mobileShareBtn: '📤 Social Share',
    copyCaptionBtn: '📋 Copy Caption',
    saveRecordBtn: '💾 Save to Records',
    savingBtn: 'Saving...',
    saveLoginPrompt: '💾 Save (Login Required)',
    guestNotice: 'ℹ️ Guest Mode: Generate & download unlimited posters. Log in to keep records saved to your account.',
    authNotice: '✅ Account Active: Your organization settings and donor records are saved to your account.',

    // Modals - Auth
    authModalTitle: 'Account Access',
    loginTabTitle: 'Log In',
    registerTabTitle: 'Create Account',
    loginIntro: 'Log in to view and save donor records in your private account.',
    registerIntro: 'Create a personal organizer account to save donor history and your organization details.',
    fullNameLabel: 'Full Name / Organizer Name',
    usernameLabel: 'Username',
    passwordLabel: 'Password',
    orgNameOptionalLabel: 'Organization Name (Optional)',
    submitLogin: 'Log In',
    submitRegister: 'Create Account',
    cancelBtn: 'Cancel',

    // Modals - User Profile Menu
    userMenuTitle: 'User Profile & Settings',
    signedInAs: 'Signed in as',
    savedOrgLabel: 'Saved Organization',
    saveCurrentSettingsBtn: 'Save Current Settings as Default',
    closeMenuBtn: 'Close',

    // Modals - Records
    recordsModalTitle: 'Saved Donor Records',
    loginToViewRecordsTitle: 'Account Required',
    loginToViewRecordsDesc: 'Please log in to your account to access your saved donor history and records.',
    loginNowBtn: 'Log In / Register',
    totalDonorsCount: 'Total Donors',
    groupWiseStats: 'Donations by Blood Group',
    searchDonorPlaceholder: '🔍 Search by donor name...',
    allGroups: 'All Groups',
    loadingRecords: 'Loading records...',
    noRecordsFound: 'No donor records saved yet.',
    loadToEditorBtn: '✏️ Load',
    deleteBtn: 'Delete',
    exportFileBtn: '📥 Download Records File',
    refreshBtn: '🔄 Refresh',

    // Template Titles (Facebook PhotoCard Styles)
    tplHero: 'Blood Hero Card',
    tplHeroDesc: 'Facebook Standard',
    tplTribute: 'Tribute Ribbon',
    tplTributeDesc: 'Viral Feed Card',
    tplCertificate: 'Appreciation Certificate',
    tplCertificateDesc: 'Formal Honor Seal',
    tplStory: 'Social Story',
    tplStoryDesc: 'Status & Reel (9:16)',
    tplEditorial: 'Clean Editorial',
    tplEditorialDesc: 'Sharp News Card',

    // Toast Notifications
    toastCopied: '📋 Ready-to-post caption copied to clipboard!',
    toastDownloaded: '✅ Poster image downloaded successfully!',
    toastSaved: '✅ Donor record saved to your account!',
    toastLoaded: 'Record details loaded into editor!',
    toastPhotoLoaded: 'Donor photo uploaded successfully!',
    toastLogoLoaded: 'Organization logo updated & saved!',
    toastLoggedOut: 'Logged out. Now in guest mode.',
    toastClearedPersonal: '✨ Form ready for a new donor! (Organization settings kept)'
  },

  bn: {
    // Brand & Header
    appTitle: 'রক্তদান পোস্টার মেকার',
    appSubtitle: 'ডোনার সম্মাননা ও রেকর্ড কিপার',
    editorTab: 'এডিটর',
    previewTab: 'পোস্টার প্রিভিউ',
    recordsTab: 'রেকর্ডস',
    loginTab: 'অ্যাকাউন্ট',
    loginBtn: 'লগইন / রেজিস্টার',
    guestBadge: 'গেস্ট মোড',
    adminBadge: 'লগইন আছেন',
    logoutBtn: 'লগআউট',
    profileBtn: 'প্রোফাইল ও সেটিংস',
    newEntryBtn: '➕ নতুন ডোনার এন্ট্রি',
    newEntryTooltip: 'সংগঠন ও টেমপ্লেট ঠিক রেখে শুধুমাত্র ডোনারের তথ্য ক্লিয়ার করুন',

    // Editor Sections
    chooseTemplate: '১. ফটোকার্ড স্টাইল নির্বাচন করুন',
    donorDetailsSection: '👤 রক্তদাতার বিবরণ',
    photoSection: '📷 রক্তদাতার ছবি',
    orgSection: '🏛️ সংগঠনের ব্র্যান্ডিং ও লোগো',
    saveOrgSettingsBtn: 'সংগঠনের তথ্য সেভ রাখুন',

    // Org Logo & Details
    orgLogoLabel: 'সংগঠনের লোগো',
    uploadLogoPrompt: 'লোগো আপলোড করুন',
    changeLogoPrompt: 'লোগো পরিবর্তন',
    resetLogoPrompt: 'লোগো মুছে ফেলুন',
    orgNameLabel: 'সংগঠনের নাম',
    orgNamePlaceholder: 'সংগঠন বা ক্লাবের নাম লিখুন',
    orgSubtitleLabel: 'সংগঠনের স্লোগান / সাবটাইটেল',
    orgSubtitlePlaceholder: 'মানবতার সেবায় রক্তদান',
    sloganLabel: 'স্লোগান লাইন',
    heroQuoteLabel: 'প্রধান উক্তি লাইন',

    // Donor Fields
    donorName: 'রক্তদাতার নাম',
    donorNamePlaceholder: 'রক্তদাতার পুরো নাম লিখুন',
    bloodGroup: 'রক্তের গ্রুপ',
    donationCount: 'রক্তদানের সংখ্যা / কততম বার',
    donationCountPlaceholder: 'উদা: ১ম বার, ৫ম বার...',
    donationDate: 'রক্তদানের তারিখ',
    referenceLabel: 'রেফারেন্স / সংগ্রাহক (অপশনাল)',
    referenceOptional: 'ঐচ্ছিক',
    referencePlaceholder: 'কার মাধ্যমে রক্তদাতা এসেছেন বা ডোনার সংগ্রহ হয়েছে',
    referenceHint: 'ডোনার কার মাধ্যমে বা কার সহযোগিতায় এসেছেন (উদা: মোঃ রহিম / ডাঃ সারাহ)। ফাঁকা রাখলে পোস্টারে এটি লুকানো থাকবে।',

    // Photo Controls
    uploadPhotoPrompt: 'ছবি আপলোড করুন (ক্যামেরা বা গ্যালারি)',
    changePhotoPrompt: 'ছবি পরিবর্তন করতে ক্লিক করুন',
    mobileUploadHint: 'মোবাইল থেকে সরাসরি ক্যামেরা বা গ্যালারির ছবি নেওয়া যাবে',
    dragToFrameHint: '👆 ছবিতে আঙুল দিয়ে টেনে মুখ ঠিক পজিশনে বসান',
    viewPosterPreview: 'পোস্টার প্রিভিউ দেখুন',
    changePhotoBtn: 'ছবি পরিবর্তন',
    removePhotoBtn: 'ছবি মুছুন',
    zoomLabel: 'জুম:',
    panYLabel: 'উপরে / নিচে:',
    resetAlign: 'রিসেট',

    // Org Quotes
    quotePresetLabel: 'অনুপ্রেরণামূলক উক্তি নির্বাচন',
    selectQuotePrompt: 'একটি অনুপ্রেরণামূলক উক্তি পছন্দ করুন...',
    customQuoteLabel: 'উক্তি / স্লোগান (কাস্টম)',
    customQuotePlaceholder: 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার',

    // Actions & Export
    downloadPngBtn: '📥 পোস্টার ডাউনলোড (PNG)',
    downloadingBtn: 'পোস্টার তৈরি হচ্ছে...',
    whatsappBtn: '💬 হোয়াটসঅ্যাপ শেয়ার',
    mobileShareBtn: '📤 সোশ্যাল শেয়ার',
    copyCaptionBtn: '📋 ক্যাপশন কপি',
    saveRecordBtn: '💾 সেভ করুন',
    savingBtn: 'সেভ হচ্ছে...',
    saveLoginPrompt: '💾 সেভ (লগইন আবশ্যক)',
    guestNotice: 'ℹ️ গেস্ট মোড: আপনি আনলিমিটেড পোস্টার ডাউনলোড ও শেয়ার করতে পারবেন। আপনার অ্যাকাউন্টে রেকর্ড সংরক্ষণ করতে রেজিস্টার বা লগইন করুন।',
    authNotice: '✅ আপনার অ্যাকাউন্টে রেকর্ড এবং সংগঠনের তথ্য নিরাপদে সংরক্ষিত হচ্ছে।',

    // Modals - Auth
    authModalTitle: 'অ্যাকাউন্ট এক্সেস',
    loginTabTitle: 'লগইন করুন',
    registerTabTitle: 'নতুন অ্যাকাউন্ট তৈরি',
    loginIntro: 'সংরক্ষিত রেকর্ড দেখতে এবং আপনার অ্যাকাউন্টে নতুন রক্তদাতার তথ্য জমা রাখতে লগইন করুন।',
    registerIntro: 'আপনার নিজস্ব অ্যাকাউন্ট তৈরি করুন যাতে সংগঠনের নাম-লোগো সেভ থাকে এবং ডোনার রেকর্ড সংরক্ষণ করতে পারেন।',
    fullNameLabel: 'আপনার নাম / পরিচালকের নাম',
    usernameLabel: 'ইউজারনেম',
    passwordLabel: 'পাসওয়ার্ড',
    orgNameOptionalLabel: 'সংগঠনের নাম (ঐচ্ছিক)',
    submitLogin: 'লগইন করুন',
    submitRegister: 'অ্যাকাউন্ট খুলুন',
    cancelBtn: 'বাতিল',

    // Modals - User Profile Menu
    userMenuTitle: 'ইউজার প্রোফাইল ও সেটিংস',
    signedInAs: 'লগইন আছেন:',
    savedOrgLabel: 'সংরক্ষিত সংগঠন:',
    saveCurrentSettingsBtn: 'বর্তমান সেটিংস ডিফল্ট হিসেবে সেভ রাখুন',
    closeMenuBtn: 'বন্ধ করুন',

    // Modals - Records
    recordsModalTitle: 'সংরক্ষিত রক্তদাতা রেকর্ড',
    loginToViewRecordsTitle: 'লগইন করা আবশ্যক',
    loginToViewRecordsDesc: 'আপনার সংরক্ষিত ডোনারদের তালিকা দেখতে অনুগ্রহ করে অ্যাকাউন্টে লগইন করুন।',
    loginNowBtn: 'লগইন / রেজিস্টার করুন',
    totalDonorsCount: 'মোট রক্তদাতা',
    groupWiseStats: 'গ্রুপ ভিত্তিক ডোনেশন',
    searchDonorPlaceholder: '🔍 রক্তদাতার নাম দিয়ে খুঁজুন...',
    allGroups: 'সব গ্রুপ',
    loadingRecords: 'রেকর্ড লোড হচ্ছে...',
    noRecordsFound: 'কোনো সংরক্ষিত রেকর্ড নেই।',
    loadToEditorBtn: '✏️ লোড',
    deleteBtn: 'মুছুন',
    exportFileBtn: '📥 রেকর্ড ফাইল ডাউনলোড',
    refreshBtn: '🔄 রিফ্রেশ',

    // Template Titles
    tplHero: 'রক্তযোদ্ধা ফটোকার্ড',
    tplHeroDesc: 'ফেসবুক স্ট্যান্ডার্ড',
    tplTribute: 'রক্তিম শুভেচ্ছা কার্ড',
    tplTributeDesc: 'ভাইরাল ফিড কার্ড',
    tplCertificate: 'সম্মাননা সনদ',
    tplCertificateDesc: 'কৃতজ্ঞতা স্মারক',
    tplStory: 'সোশ্যাল স্টোরি',
    tplStoryDesc: 'WhatsApp & Status (9:16)',
    tplEditorial: 'ক্লিন প্রেস কার্ড',
    tplEditorialDesc: 'শার্প নিউজ স্টাইল',

    // Toast Notifications
    toastCopied: '📋 ফেসবুক ও সোশ্যাল মিডিয়ায় পোস্ট করার ক্যাপশন কপি হয়েছে!',
    toastDownloaded: '✅ পোস্টার সফলভাবে ডাউনলোড হয়েছে!',
    toastSaved: '✅ রক্তদাতার রেকর্ড অ্যাকাউন্টে সংরক্ষিত হয়েছে!',
    toastLoaded: 'তথ্য পোস্টারে লোড করা হয়েছে!',
    toastPhotoLoaded: 'ডোনারের ছবি সফলভাবে লোড হয়েছে!',
    toastLogoLoaded: 'সংগঠনের লোগো সফলভাবে সেভ হয়েছে!',
    toastLoggedOut: 'লগআউট সফল হয়েছে। এখন গেস্ট মোডে আছেন।',
    toastClearedPersonal: '✨ নতুন ডোনারের জন্য ফর্ম প্রস্তুত! (সংগঠনের সেটিংস সংরক্ষিত আছে)'
  }
};

export function t(key) {
  const lang = currentLang.value;
  return translations[lang]?.[key] || translations['en']?.[key] || key;
}

export const quotePresets = {
  en: [
    'Blood donation is the greatest gift of life',
    'Standing beside patients in need of blood',
    'Your blood can save a precious human life',
    'Donate blood, save life - serve humanity',
    'One bag of blood, a smiling family'
  ],
  bn: [
    'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার',
    'রক্তের প্রয়োজনে মুমূর্ষু রোগীর পাশে',
    'আপনার রক্তে বাঁচুক একটি মূল্যবান প্রাণ',
    'রক্ত দিন, জীবন বাঁচান - মানবতার সেবায় এগিয়ে আসুন',
    'এক ব্যাগ রক্ত, একটি সুন্দর হাসিমুখ'
  ]
};

export const countPresets = {
  en: ['1st Time', '2nd Time', '3rd Time', '4th Time', '5th Time'],
  bn: ['১ম বার', '২য় বার', '৩য় বার', '৪র্থ বার', '৫ম বার']
};
