export const withTimeout = async (promise, { timeout, defaultValue }) => {
  let value = defaultValue;
  if (timeout) {
    const timeoutPromise = new Promise(((resolve) => {
      setTimeout(resolve, timeout, false);
    }));
    value = await Promise.race([timeoutPromise, promise()]);
  } else {
    value = await promise();
  }
  return value;
};

/**
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {boolean}
 */
export const arrayEquals = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const map = new Map();
  arr1.forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1);
  });
  return arr2.every((item) => {
    const c = map.get(item);
    if (c > 0) {
      map.set(item, c - 1);
      return true;
    }
    return false;
  });
};

/**
 * @param {*} value
 * @returns {Array}
 */
export const toArray = (value) => Array.isArray(value) ? value : [value];

/**
 * @param {string} string
 * @returns {string}
 */
export const escapeRegex = (string) => string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
