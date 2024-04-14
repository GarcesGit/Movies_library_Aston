export const getLocalStorageItem = <T>(item: string) => {
  const json = localStorage.getItem(item);
  const db: T | null = json ? JSON.parse(json) : null;
  return db;
};

export const setLocalStorageItem = <T>(item: string, data: T) => {
  localStorage.setItem(item, JSON.stringify(data));
};

export const removeLocalStorageItem = (item: string) => {
  localStorage.removeItem(item);
};
