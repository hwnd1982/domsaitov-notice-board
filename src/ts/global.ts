import LazyLoad from "vanilla-lazyload";
import { initBase } from "./utils/init";
import {
  addPreloader,
  removePreloader,
  resetForm,
  setPreloader,
  store,
} from "./utils";
import { TextFieldElement, openCustomModal } from "./ui";

if (!window.endpoints) {
  window.endpoints = {
    findLocationsUrl:
      "https://orimex-online.ru/bitrix/services/main/ajax.php?action=ibrush%3Amain.controllers.locationcontroller.findLocations&SITE_ID=s1",
    createNewAd: "https://jsonplaceholder.typicode.com/posts",
  };
}

document.addEventListener("DOMContentLoaded", initGlobal);

function initGlobal() {
  store.lazyload = new LazyLoad();
  window.lazyload = store.lazyload;
  window.store = store;

  initBase();

  window.openCustomModal = openCustomModal;
  window.setPreloader = setPreloader;
  window.addPreloader = addPreloader;
  window.removePreloader = removePreloader;
  window.resetForm = resetForm;
  window.getCitySelectValue = () => {
    return document.querySelector<TextFieldElement>(".js-city-select")
      ?.textField?.field?.value;
  };
}
