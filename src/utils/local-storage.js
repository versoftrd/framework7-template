export const pushdata = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const popdata = (key) => {
  let data = window.localStorage.getItem(key);
  return JSON.parse(data);
};
