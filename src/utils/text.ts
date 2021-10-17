export const capitalize = (str: string): string => {
  const capitalizeFirst = str[0].toUpperCase();
  const restOfWord = str.slice(1);

  return capitalizeFirst + restOfWord;
};
