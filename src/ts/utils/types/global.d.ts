import type { ILazyLoadInstance } from "vanilla-lazyload";
import type { OpenCustomModalProps } from "../../ui";
import { Scrollbar, Store } from "../";
import Swiper from "swiper";

export interface WindowEndpoints {
  findLocationsUrl: string;
}

declare global {
  interface Window {
    scrollbar: Scrollbar;
    yandexMapDidInit?: boolean;
    openCustomModal?: (props: OpenCustomModalProps) => void;
    openModalById?: (id: string) => void;
    closeModalById?: (id: string) => void;
    initValidateFormById?: (id: string, hard?: boolean) => void;
    triggerValidateFormById?: (id: string) => void;
    initTextFieldsByFormId?: (id: string, hard?: boolean) => void;
    initRadiosByFormId?: (id: string, hard?: boolean) => void;
    fullReInitFormById?: (id: string, hard?: boolean) => void;
    setFavoriteProducts?: () => void;
    getCitySelectValue?: () => string;
    setPreloader?: (value: boolean) => void;
    addPreloader?: () => void;
    removePreloader?: () => void;
    resetForm?: (form: HTMLFormElement) => void;
    resetFormById?: (id: string) => void;
    assetsUrl?: string;
    endpoints: WindowEndpoints;
    lazyload: ILazyLoadInstance;
    store: Store;
    disabledFilterApply?: () => void;
    enabledFilterApply?: () => void;
    initProductDetailSlider?: () => void;
    productDetailSlider?: Swiper;
  }
}

declare var ymaps: any;
