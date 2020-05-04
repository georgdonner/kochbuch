export const withTimeout = async (func, { timeout, defaultValue }) => {
  let value = defaultValue;
  if (timeout) {
    const timeoutPromise = new Promise(((resolve) => {
      setTimeout(resolve, timeout, false);
    }));
    value = await Promise.race([timeoutPromise, func()]);
  } else {
    value = await func();
  }
  return value;
};
