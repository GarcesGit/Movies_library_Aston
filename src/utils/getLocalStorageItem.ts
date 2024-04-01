export const getLocalStorageItem = <T,>(item: string) => {
  const json = localStorage.getItem(item);
  const db: T | null = json ? JSON.parse(json) : null;
  return db;
}
