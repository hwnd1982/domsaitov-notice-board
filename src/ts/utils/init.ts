import { initScrollbar, initClickSmoothScroll, detectMob } from "./";
import { initValidateForms } from "../modules";
import PerfectScrollbar from "perfect-scrollbar";
import {
  initModals,
  initTextFields,
  initRadios,
  initOptionalField,
  initImagesFields,
} from "../ui";

export function initBase() {
  initScrollbar();
  initTextFields();
  initRadios();
  initImagesFields();
  initOptionalField();
  initValidateForms();
  initModals();
  initClickSmoothScroll();
  initCustomScrollbars();
  window.addEventListener("resize", initCustomScrollbars);
}

function initCustomScrollbars() {
  if (detectMob()) {
    window.store.customScrollbars.forEach((s) => s.destroy());
  } else {
    if (window.store.customScrollbars.length) {
      window.store.customScrollbars.forEach((s) => s.update());
    } else if (
      document.querySelector(`.custom-scroll`) ||
      document.querySelector(`[class*='xl\:custom-scroll']`) ||
      document.querySelector(`[class*='lg\:custom-scroll']`)
    ) {
      [
        ...Array.from(document.querySelectorAll(`.custom-scroll`)),
        ...Array.from(document.querySelectorAll("[class*='xl:custom-scroll']")),
        ...Array.from(document.querySelectorAll("[class*='lg:custom-scroll']")),
      ].forEach((s) => {
        window.store.customScrollbars.push(new PerfectScrollbar(s));
      });
    }
  }
}
