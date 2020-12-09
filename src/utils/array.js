/**
 *
 *
 * @param {*} array
 * @returns {Array}
 */
export const shuffle = array => {
  const length = array == null ? 0 : array.length;
  if (!length) {
    return [];
  }

  let index = -1;
  const lastIndex = length - 1;
  const result = [...array];

  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result;
};
