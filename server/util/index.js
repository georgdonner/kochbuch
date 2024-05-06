module.exports.pick = (obj, ...keys) => Object.fromEntries(
  keys
    .filter((key) => key in obj)
    .map((key) => [key, obj[key]]),
);

module.exports.omit = (obj, ...keys) => Object.fromEntries(
  Object.entries(obj)
    .filter(([key]) => !keys.includes(key)),
);
