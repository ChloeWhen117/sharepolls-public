import { v4 as uuidv4 } from "uuid";

const LOCAL_STORAGE_KEY = "sharepolls-uid";

export const getUserIdFromLocalStorage = (): string => {
  return localStorage.getItem(LOCAL_STORAGE_KEY) || ("" as string);
};

export const setUserIdToLocalStorage = (): void => {
  const temp = getUserIdFromLocalStorage();
  if (temp === "") {
    return localStorage.setItem(LOCAL_STORAGE_KEY, uuidv4());
  }
};
