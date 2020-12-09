/**
 *
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
