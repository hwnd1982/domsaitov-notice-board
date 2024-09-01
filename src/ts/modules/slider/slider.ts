import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { states } from "../../utils";

export function initSlider() {
  const sliders = document.querySelectorAll<HTMLElement>(".js-slider");

  sliders.forEach((slider) => {
    const swiper = slider.querySelector<HTMLElement>(".swiper");
    const nextEl = slider.querySelector<HTMLElement>(".js-slider-button-next");
    const prevEl = slider.querySelector<HTMLElement>(".js-slider-button-prev");

    if (!swiper.classList.contains(states.swiper)) {
      new Swiper(swiper, {
        slidesPerView: 1,
        modules: [Navigation, Pagination],
        navigation: {
          nextEl,
          prevEl,
        },
        breakpoints: {
          992: {
            slidesPerView: 2,
          },
        },
        pagination: {
          el: ".js-slider-pagination",
          type: "bullets",
          clickable: true,
        },
      });
    }
  });
}
