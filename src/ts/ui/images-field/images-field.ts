import { ValidateFormElement } from "src/ts/modules";
import { addPreloader, getBase64, removePreloader, states } from "../../utils";

export type ImageFile = File & { imageEl?: HTMLElement };
export type ImagesFieldElement = (HTMLInputElement | HTMLElement) & {
  imageField?: ImagesField;
};

export class ImagesField {
  formEl: ValidateFormElement;
  el: ImagesFieldElement;
  fieldEl: ImagesFieldElement | null = null;
  buttonEl: HTMLElement;
  previewEl: HTMLElement;

  file: ImageFile;
  data: string | null = null;

  constructor(element: HTMLElement) {
    this.el = element;

    if (!this.el) return this;

    this.init();
  }

  get value() {
    return this.file.imageEl?.getAttribute("src") || "";
  }

  private init = () => {
    this.fieldEl = this.el.querySelector<HTMLInputElement>(
      ".js-images-field-input",
    );
    this.buttonEl = this.el.querySelector<HTMLInputElement>(
      ".js-images-field-button",
    );
    this.previewEl = document.createElement("p");
    this.previewEl.className = "text-field__label mt-3";
    this.formEl = this.el.closest(".js-form");

    if (this.formEl) {
      this.formEl.addEventListener("reset", () => {
        this.previewEl.remove();
        this.buttonEl.textContent = "Загрузить";
      });
    }

    if (this.fieldEl) {
      this.fieldEl.addEventListener("change", ({ target }) =>
        this.setFile([...(target as HTMLInputElement).files]),
      );

      this.el.classList.add(states.init);
      this.el.imageField = this;
      this.fieldEl.imageField = this;
    }
  };

  setFile = (files: File[]) => {
    const [file] = files;

    if (/\.(jpg|jpeg|png)$/.test(file.name) && this.file?.name !== file.name) {
      this.file = file;

      addPreloader(this.buttonEl, "loader");
      getBase64(file, (data) => {
        this.data = data;

        this.buttonEl.textContent = "Земенить";
        this.previewEl.textContent = file.name.toLowerCase();
        this.buttonEl.parentElement.append(this.previewEl);
      });
    }
  };
}

export function initImagesFields() {
  const imagesFields = document.querySelectorAll<HTMLElement>(
    `.js-images-field:not(.${states.init})`,
  );

  imagesFields.forEach((imagesField) => {
    new ImagesField(imagesField);
  });
}
