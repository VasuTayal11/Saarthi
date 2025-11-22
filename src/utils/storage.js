// src/utils/storage.js
export const setStoredData = (key, data) => {
  try {
    const timestamp = new Date().getTime();
    const storageData = {
      data,
      timestamp,
      expiry: timestamp + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem(`saarthi_${key}`, JSON.stringify(storageData));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getStoredData = (key) => {
  try {
    const item = localStorage.getItem(`saarthi_${key}`);
    if (!item) return null;

    const storageData = JSON.parse(item);
    const now = new Date().getTime();

    // Check if data is expired
    if (now > storageData.expiry) {
      localStorage.removeItem(`saarthi_${key}`);
      return null;
    }

    return storageData.data;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const clearStoredData = () => {
  try {
    // Remove all Saarthi-related data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('saarthi_')) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};