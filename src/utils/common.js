/**
 * Creates a debounced function that delays invoking the provided function
 * until at least ms milliseconds have elapsed since the last time it was invoked.
 *
 * @param {*} fn
 * @param {number} [ms=0]
 * @return {*}
 */
export const debounce = (fn, ms = 0) => {
  let timeoutId;

  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
