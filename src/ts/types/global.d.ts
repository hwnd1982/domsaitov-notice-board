import type { ILazyLoadInstance } from "vanilla-lazyload";
import { Scrollbar, Store } from "../utils";

export interface WindowEndpoints {
  findLocationsUrl: string;
}

declare global {
  interface Window {
    scrollbar: Scrollbar;
    yandexMapDidInit?: boolean;
    getCitySelectValue?: () => string;
    setPreloader?: (value: boolean) => void;
    addPreloader?: () => void;
    removePreloader?: () => void;
    assetsUrl?: string;
    endpoints: WindowEndpoints;
    lazyload: ILazyLoadInstance;
    store: Store;
  }
}

declare var ymaps: any;
