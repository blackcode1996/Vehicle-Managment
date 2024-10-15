// localStorageUtils.js

/**
 * Set data in localStorage
 * @param {string} key - The key under which to store the data.
 * @param {any} value - The value to store (will be stringified).
 */
export const setLocalStorage = (key: string, value: any) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error("Error setting localStorage item:", error);
    }
};

/**
 * Get data from localStorage
 * @param {string} key - The key of the item to retrieve.
 * @returns {any|null} - The parsed value or null if not found.
 */
export const getLocalStorage = (key: string) => {
    try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
        console.error("Error getting localStorage item:", error);
        return null;
    }
};

/**
 * Remove data from localStorage
 * @param {string} key - The key of the item to remove.
 */
export const removeLocalStorage = (key: string) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing localStorage item:", error);
    }
};

/**
 * Clear all data from localStorage
 */
export const clearLocalStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error("Error clearing localStorage:", error);
    }
};
