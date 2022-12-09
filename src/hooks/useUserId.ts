import { isBrowser } from '../utils/isBrowser';
import { getUserIdFromLocalStorage } from '../utils/userId';

type ReturnType = {
  userId: string;
};

export const useUserId = (): ReturnType => {
  return {
    userId: isBrowser ? getUserIdFromLocalStorage() : ""
  };
};