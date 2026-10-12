// Utilities for Bengali numbers, dates and captions

export const BENGALI_NUMERALS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(input) {
  if (input === null || input === undefined) return '';
  return String(input).replace(/[0-9]/g, (digit) => BENGALI_NUMERALS[parseInt(digit, 10)]);
}

export const BENGALI_MONTHS = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];

export function formatBengaliDate(dateStr, style = 'numeric') {
  if (!dateStr) return '';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parseInt(parts[1], 10) - 1;
      const day = parts[2];
      
      if (style === 'numeric') {
        // e.g. 07-10-2026 -> ০৭-১০-২০২৬
        return `${day}-${parts[1]}-${year}`;
      } else if (style === 'bengali-digits') {
        return `${toBengaliNumber(day)}-${toBengaliNumber(parts[1])}-${toBengaliNumber(year)}`;
      } else if (style === 'full') {
        return `${toBengaliNumber(parseInt(day, 10))} ${BENGALI_MONTHS[month]}, ${toBengaliNumber(year)}`;
      }
    }
  } catch (e) {
    console.error('Date format error:', e);
  }
  return dateStr;
}

export function generateSocialCaption(donorData, lang = 'bn') {
  const {
    donorName,
    bloodGroup,
    donationCount,
    donationDate,
    referenceName,
    orgName,
    orgSubtitle,
    quote
  } = donorData || {};

  const cleanOrgName = (orgName && orgName.trim()) || (lang === 'en' ? 'Voluntary Blood Donors Wing' : 'স্বেচ্ছাসেবী রক্তদান সংস্থা');
  const cleanRef = (referenceName && referenceName.trim()) || '';
  const dateFormatted = formatBengaliDate(donationDate, 'full');

  if (lang === 'en') {
    let caption = `🩸 A Noble Example of Voluntary Service! 🩸\n\n`;
    caption += `Honorable Blood Donor: ${donorName || 'Blood Hero'}\n`;
    caption += `Blood Group: ${bloodGroup || 'O+'}\n`;
    if (donationCount) caption += `Donation Count: ${donationCount}\n`;
    if (donationDate) caption += `Date: ${donationDate}\n`;
    if (cleanRef) caption += `Referred / Assisted By: ${cleanRef}\n`;
    caption += `Organization: ${cleanOrgName}\n`;
    if (orgSubtitle) caption += `Motto: ${orgSubtitle}\n`;
    caption += `\n"${quote || 'Blood donation is the greatest gift of life'}"\n\n`;
    caption += `A single donation can save a dying patient's life. We extend our warmest congratulations and heartfelt gratitude for your selfless contribution. Stay healthy, stand beside humanity. ❤️\n\n`;
    caption += `#BloodDonation #SaveLives #BloodDonor #Humanity`;
    return caption;
  }

  // Bengali Caption (Default)
  let caption = `🩸 মানবতার সেবায় এক অনন্য দৃষ্টান্ত! 🩸\n\n`;
  caption += `সম্মানিত রক্তদাতা: ${donorName || 'রক্তযোদ্ধা'}\n`;
  caption += `রক্তের গ্রুপ: ${bloodGroup || 'O+'}\n`;
  if (donationCount) caption += `রক্তদানের সংখ্যা: ${donationCount}\n`;
  if (donationDate) caption += `রক্তদানের তারিখ: ${dateFormatted} (${donationDate})\n`;
  if (cleanRef) caption += `রেফারেন্স / সহযোগিতায়: ${cleanRef}\n`;
  caption += `সংগঠন: ${cleanOrgName}\n`;
  if (orgSubtitle) caption += `স্লোগান: ${orgSubtitle}\n`;
  caption += `\n"${quote || 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার'}"\n\n`;
  caption += `মুহূর্তের একটি রক্তদান বাঁচাতে পারে একটি মুমূর্ষু রোগীর প্রাণ। আপনার এই নিঃস্বার্থ ত্যাগের জন্য আমরা আন্তরিক মোবারকবাদ ও রক্তিম শুভেচ্ছা জানাচ্ছি। সুস্থ থাকুন, মানবতার পাশে থাকুন। ❤️\n\n`;
  caption += `#BloodDonation #রক্তদান #মানবতার_কল্যাণে #রক্তযোদ্ধা #SaveLives`;

  return caption;
}
