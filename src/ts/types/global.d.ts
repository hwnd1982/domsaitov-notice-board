import type { ILazyLoadInstance } from "vanilla-lazyload";
import { Scrollbar, Store } from "../utils";
import { OpenCustomModalProps } from "../ui";

export interface WindowEndpoints {
  findLocationsUrl: string;
  createNewAd: string;
}

declare global {
  interface Window {
    scrollbar: Scrollbar;
    getCitySelectValue?: () => string;
    setPreloader?: (value: boolean) => void;
    addPreloader?: () => void;
    removePreloader?: () => void;
    openCustomModal?: (props: OpenCustomModalProps) => void;
    resetForm?: (form: HTMLFormElement) => void;
    assetsUrl?: string;
    endpoints: WindowEndpoints;
    lazyload: ILazyLoadInstance;
    store: Store;
  }
}

declare var ymaps: any;
