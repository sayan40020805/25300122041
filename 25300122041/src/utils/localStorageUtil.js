// Save URL object by shortcode
export function saveURLData(shortcode, data) {
  localStorage.setItem(shortcode, JSON.stringify(data));
}

// Get URL data by shortcode
export function getURLData(shortcode) {
  const json = localStorage.getItem(shortcode);
  return json ? JSON.parse(json) : null;
}

// Update visit count on redirection
export function incrementVisit(shortcode) {
  const data = getURLData(shortcode);
  if (data) {
    data.visits = (data.visits || 0) + 1;
    saveURLData(shortcode, data);
  }
}

// Check if shortcode is expired
export function isExpired(shortcode) {
  const data = getURLData(shortcode);
  if (!data) return true;
  return Date.now() > data.expiryTime;
}

// Get all stored shortcodes (optional utility)
export function getAllShortcodes() {
  const keys = Object.keys(localStorage);
  return keys.filter((key) => {
    const item = localStorage.getItem(key);
    try {
      const parsed = JSON.parse(item);
      return parsed?.longUrl && parsed?.shortcode;
    } catch {
      return false;
    }
  });
}
