// Validates if a URL is well-formed
export function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

// Alphanumeric shortcodes (3-15 characters)
export function isValidShortcode(code) {
  const regex = /^[a-zA-Z0-9]{3,15}$/;
  return regex.test(code);
}

// Checks if a shortcode is already in use (in localStorage)
export function isShortcodeUnique(code) {
  return !localStorage.getItem(code);
}
