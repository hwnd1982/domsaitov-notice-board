import LazyLoad from "vanilla-lazyload";
import { initBase } from "./utils/init";
import { store } from "./utils";
import { TextFieldElement } from "./ui/text-field";

if (!window.endpoints) {
  window.endpoints = {
    findLocationsUrl:
      "https://orimex.sirotkin.dev.ibrush.ru/bitrix/services/main/ajax.php?action=ibrush%3Amain.controllers.locationcontroller.findLocations&SITE_ID=s1&query=",
  };
}

document.addEventListener("DOMContentLoaded", initGlobal);

function initGlobal() {
  store.lazyload = new LazyLoad();
  window.lazyload = store.lazyload;
  window.store = store;

  initBase();

  window.getCitySelectValue = () => {
    return document.querySelector<TextFieldElement>(".js-city-select")
      ?.textField?.field?.value;
  };
}
