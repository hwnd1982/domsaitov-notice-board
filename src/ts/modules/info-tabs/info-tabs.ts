import Swiper from "swiper";
import { states } from "../../utils";
import { EffectFade, Thumbs } from "swiper/modules";

export function initInfoTabs() {
  const els = document.querySelectorAll<HTMLElement>(".js-info-tabs");

  els.forEach((el) => {
    const thumbsEl = el.querySelector<HTMLElement>(".js-info-tabs-thumbs");
    const sliderEl = el.querySelector<HTMLElement>(".js-info-tabs-slider");

    if (
      !thumbsEl.classList.contains(states.swiper) &&
      !sliderEl.classList.contains(states.swiper)
    ) {
      const swiper = new Swiper(thumbsEl, {
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
      });

      new Swiper(sliderEl, {
        effect: "fade",
        modules: [EffectFade, Thumbs],
        autoHeight: true,
        fadeEffect: {
          crossFade: true,
        },
        thumbs: {
          swiper,
        },
      });
    }
  });
}
