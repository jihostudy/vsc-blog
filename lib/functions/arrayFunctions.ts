export const findFirstMatchingElement = <T>(
  arr: T[],
  condition: (element: T) => boolean
): T | undefined => {
  return arr.find(condition);
};
