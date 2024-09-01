import { BaseResponse } from "../../types/api";
import { ImagesFieldElement, openCustomModal } from "../../ui";
import { ValidateFormElement } from "../validate";

import axios from "axios";
import { addPreloader, removePreloader, resetForm } from "../../utils";

class CreateNewAd {
  form: ValidateFormElement | null;

  constructor() {
    this.form = document.querySelector<ValidateFormElement>(`.js-form`);

    if (this.form) {
      this.init();
    }
  }

  private init = () => {
    if (this.form) {
      this.form.addEventListener("submit", this.handleStepFormSubmit);
    }
  };

  private handleStepFormSubmit = (e: Event) => {
    e.preventDefault();

    this.form?.validate?.setSubmitDisabled();

    if (!this.form?.validate?.checkValidForm()) return;

    this.fetchBuy();
  };

  private fetchBuy = async () => {
    const formFields =
      this.form.querySelectorAll<HTMLInputElement>("input, select");
    const formData = new FormData();

    formFields.forEach((field) => {
      if (field.value) {
        formData.append(
          field.name,
          JSON.stringify({
            [field.dataset["name"] || field.name]:
              field.name !== "photo" ? field.value : field.value,
            // : (field as ImagesFieldElement).imageField.data,
          }),
        );
      }
    });

    addPreloader();

    try {
      const response = await axios.post<BaseResponse>(
        window.endpoints.createNewAd,
        formData,
      );

      // if (response?.data?.data?.success) {
      if (response?.data?.id) {
        removePreloader();
        resetForm(this.form);
        openCustomModal({
          title: "Спасибо",
          description: "Ваше объявление будет опубликовано в лижайшее время.",
          button: "Продолжить",
        });
      }
    } catch (error) {
      console.log(error);
      removePreloader();
      openCustomModal({
        title: "Ошибка",
        description:
          "Что-то пошло не так... Попробуйте опубликовать обявление позднее.",
        button: "Хорошо",
      });
    }
  };
}

export function initCreateNewAd() {
  new CreateNewAd();
}
