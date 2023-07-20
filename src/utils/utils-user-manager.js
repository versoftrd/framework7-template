export const takeTheFirstWord = (phrase) => {
  if (phrase != null) {
    let words = phrase.split(" ");
    return words[0];
  }
  return "";
};
