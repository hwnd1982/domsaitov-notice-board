import { states } from "../../utils";
import { RadioElement } from "../radio";
import { TextField, TextFieldElement } from "../text-field";

export type OptionalFieldElement = HTMLElement & {
  optionalField?: OptionalField;
};

export type OptionalFieldValidate = "number";

export interface OptionalFieldResult {
  isValid: boolean;
  error: OptionalFieldValidate | null;
}

export class OptionalField {
  el: OptionalFieldElement;
  textFieldEl: TextFieldElement;
  radioEl: RadioElement;

  constructor(element: HTMLElement) {
    this.el = element;

    this.init();
  }

  private init = () => {
    this.textFieldEl =
      this.el.querySelector<TextFieldElement>(".js-text-field");
    this.radioEl = this.el.querySelector<RadioElement>(".js-radio");

    this.el.classList.add(states.init);
    this.el.optionalField = this;

    if (this.textFieldEl && this.radioEl) {
      this.radioEl.addEventListener("change", (e: Event) => {
        if ((e.target as HTMLInputElement).checked) {
          this.textFieldEl.textField.setDisabled();
        } else {
          this.textFieldEl.textField.removeDisabled();
        }
      });
    }
  };
}

export function initOptionalField() {
  const optionalFields = document.querySelectorAll<HTMLElement>(
    `.js-optional-field:not(.${states.init})`,
  );

  optionalFields.forEach((optionalField) => {
    new OptionalField(optionalField);
  });
}
