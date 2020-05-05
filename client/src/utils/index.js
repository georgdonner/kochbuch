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
