function isValidPhoneNumber(phoneNumber) {
  // * Remove any spaces, dashes, or parentheses
  const cleanedNumber = phoneNumber.replace(/[\s\-()]/g, "");

  // * Regular expression patterns for different formats
  const patterns = [/^\+8801[3-9]\d{8}$/, /^8801[3-9]\d{8}$/, /^01[3-9]\d{8}$/];

  // * Check if the number matches any of the valid patterns
  return patterns.some((pattern) => pattern.test(cleanedNumber));
}

module.exports = isValidPhoneNumber;
