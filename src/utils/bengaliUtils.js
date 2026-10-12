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

export function generateSocialCaption(donorData) {
  const {
    donorName,
    bloodGroup,
    donationCount,
    donationDate,
    referenceName,
    orgName,
    orgSubtitle,
    quote
  } = donorData;

  const dateFormatted = formatBengaliDate(donationDate, 'full');
  const org = orgSubtitle || orgName || 'আমাদের ব্লাড ব্যাংক';

  let caption = `🩸 মানবতার সেবায় এক অনন্য দৃষ্টান্ত! 🩸\n\n`;
  caption += `সম্মানিত রক্তদাতা: ${donorName}\n`;
  caption += `রক্তের গ্রুপ: ${bloodGroup}\n`;
  if (donationCount) caption += `রক্তদানের সংখ্যা: ${donationCount}\n`;
  if (donationDate) caption += `রক্তদানের তারিখ: ${dateFormatted} (${donationDate})\n`;
  if (referenceName) caption += `রেফারেন্স / সহযোগিতায়: ${referenceName}\n`;
  caption += `সংগঠন: ${org}\n\n`;
  caption += `"${quote || 'রক্তদান হোক আপনার জীবনের শ্রেষ্ঠ উপহার'}"\n\n`;
  caption += `মুহূর্তের একটি রক্তদান বাঁচাতে পারে একটি মুমূর্ষু রোগীর প্রাণ। আপনার এই নিঃস্বার্থ ত্যাগের জন্য আমরা আন্তরিক মোবারকবাদ ও শুভেচ্ছা জানাচ্ছি। সুস্থ থাকুন, মানবতার পাশে থাকুন। ❤️\n\n`;
  caption += `#BloodDonation #রক্তদান #মানবতার_কল্যাণে #রক্তযোদ্ধা #SaveLives`;

  return caption;
}
