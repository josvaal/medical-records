import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { create } from 'zustand'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`;
}

type Store = {
  isLoading: boolean
  setIsLoading: (newLoading: boolean) => void
}

export const useStore = create<Store>()((set) => ({
  isLoading: false,
  setIsLoading: (newLoading: boolean) => set(() => ({ isLoading: newLoading })),
}))

