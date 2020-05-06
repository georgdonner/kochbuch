const getOptions = (method, userOptions = {}) => {
  const options = {
    method,
    credentials: 'include',
    ...userOptions,
  };
  const needContentType = ['POST', 'PUT'];
  if (needContentType.includes(method)) {
    options.headers = {
      'Content-Type': 'application/json',
      ...options.headers || {},
    };
  }
  if (options.body && typeof options.body !== 'string') {
    options.body = JSON.stringify(options.body);
  }
  return options;
};

const request = async (method, url, options) => {
  const parsedOptions = getOptions(method, options);
  const res = await fetch(`/api${url}`, parsedOptions);
  return parsedOptions.fullResponse ? res : res.json();
};

export default {
  get: (url, options) => request('GET', url, options),
  post: (url, options) => request('POST', url, options),
  put: (url, options) => request('PUT', url, options),
  delete: (url, options) => request('DELETE', url, options),
};
