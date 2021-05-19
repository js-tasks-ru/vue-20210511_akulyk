export const debounce = (callback, limit) => {
  let timeout;
  return (...args) => {
    clearInterval(timeout);
    timeout = setTimeout(() => {
      // eslint-disable-next-line no-undef
      callback.apply(this, args);
    }, limit);
  };
};
