/// <reference types="vite/client" />

declare global {
    interface Window {
      fbq: (...args: any[]) => void;
    }
  }
  export {};