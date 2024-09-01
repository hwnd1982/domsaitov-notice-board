import Choices from "choices.js";
import Cleave from "cleave.js";
import { sendRequest, states } from "../../utils";
import { debounce } from "../../utils";

export type TextFieldElement = HTMLElement & { textField?: TextField };

export type TextFieldValidate =
  | "phone"
  | "required"
  | "email"
  | "name"
  | "city"
  | "title"
  | "description"
  | "price";

export interface TextFieldValidateResult {
  isValid: boolean;
  error: TextFieldValidate | null;
}

export type TextFieldInput = HTMLInputElement & {
  cleave?: Cleave;
  choises?: Choices;
};

export class TextField {
  el: TextFieldElement;
  field: TextFieldInput;
  validate: TextFieldValidate[];

  constructor(element: HTMLElement) {
    this.el = element;

    this.init();
  }

  private init = () => {
    this.field = this.el.querySelector<HTMLInputElement>(
      ".js-text-field-input",
    );

    this.defineValidate();
    this.initValidate();

    this.el.classList.add(states.init);
    this.el.textField = this;
  };

  public defineValidate = () => {
    const validateString = this.field.getAttribute("data-validate");

    if (!validateString) {
      this.validate = [];

      return;
    }

    const validateArray = validateString
      .replace(/\s/g, "")
      .split(",") as TextFieldValidate[];

    this.validate = validateArray;
  };

  public initValidate = () => {
    this.validate.forEach((setting) => {
      switch (setting) {
        case "phone": {
          this.field.addEventListener("input", (e) => {
            const target = e.target as TextFieldInput;
            const rawValue = target.value.replace(/\D/g, "");

            const lastValue = (target.cleave as any).lastInputValue.replace(
              /\D/g,
              "",
            );

            if (rawValue.length === 0) {
              this.field.cleave?.setRawValue("+7");
            } else if (rawValue.length === 11) {
              if (["7", "8"].includes(rawValue[0])) {
                this.field.cleave?.setRawValue("+7" + rawValue.slice(1));
              }
            } else if (rawValue.length === 12) {
              if (["7", "8"].includes(rawValue[1]) && lastValue.length < 10) {
                this.field.cleave?.setRawValue("+7" + rawValue.slice(2));
              }
            }
          });

          this.field.cleave = new Cleave(this.field, {
            blocks: [2, 0, 3, 3, 2, 2],
            delimiters: [" ", "(", ") ", " ", " "],
            delimiterLazyShow: true,
            numericOnly: true,
            prefix: "+7",
            noImmediatePrefix: true,
          });

          break;
        }
        case "city": {
          this.field.choises = new Choices(this.field, {
            searchEnabled: true,
            choices: [
              {
                label: "Москва, Россия",
                selected: true,
                value: "0000073738",
              },
              {
                label: "Московский, Москва, Россия",
                value: "0000078911",
              },
              {
                label: "Зеленоград, Москва, Россия",
                value: "0000077344",
              },
              {
                label: "Троицк, Москва, Россия",
                value: "0000077457",
              },
              {
                label: "Щербинка, Москва, Россия",
                value: "0000077774",
              },
              {
                label: "Бронницы, Московская область, Россия",
                value: "0000029945",
              },
              {
                label: "Домодедово, Московская область, Россия",
                value: "0000028132",
              },
              {
                label: "Жуковский, Московская область, Россия",
                value: "0000030048",
              },
              {
                label: "Королев, Московская область, Россия",
                value: "0000030318",
              },
            ],
            allowHTML: true,
            shouldSort: false,
            noResultsText: "Такого города нет",
            noChoicesText: "",
            loadingText: "",
            searchResultLimit: 10,
            searchChoices: false,
            searchFloor: 0,
            resetScrollPosition: false,
            classNames: {
              containerOuter: "select__root",
              containerInner: "select__inner",
              input: "select__input",
              inputCloned: "select__input--cloned",
              list: "select__list",
              listItems: "select__list--multiple",
              listSingle: "select__list--single",
              listDropdown: "select__list--dropdown",
              item: "select__item",
              itemSelectable: "select__item--selectable",
              itemDisabled: "select__item--disabled",
              itemChoice: "select__item--choice group",
              placeholder: "select__placeholder",
              group: "select__group",
              groupHeading: "select__heading",
              button: "select__button",
              activeState: states.active,
              focusState: states.focus,
              openState: states.open,
              disabledState: states.disabled,
              highlightedState: states.highlight,
              selectedState: states.select,
              flippedState: states.flip,
            } as any,
          });

          this.el.querySelector(`[type="search"]`).addEventListener(
            "input",
            debounce(async (e: Event) => {
              const target = e.target as HTMLInputElement;
              const value = target.value;

              this.field.choises?.setChoices(
                async (instance: Choices) => {
                  const obs = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                      if (mutation.type === "attributes") {
                        instance.input.element.removeAttribute("disabled");
                        instance.input.element.focus();
                        obs.disconnect();
                      }
                    });
                  });
                  obs.observe(instance.input.element, {
                    attributes: true,
                  });

                  try {
                    const response = await sendRequest<
                      Array<{
                        id: string;
                        text: string;
                        cityName: string;
                        locationCode: string;
                      }>
                    >(
                      window.endpoints.findLocationsUrl +
                        `&query=${value.trim()}`,
                      null,
                      "get",
                    );

                    if (response?.data?.data?.success) {
                      return response?.data?.data?.data?.map((res) => ({
                        value: res.locationCode,
                        label: res.text,
                      }));
                    }
                  } catch (err) {}
                },
                undefined,
                undefined,
                true,
              );
            }, 300),
          );

          this.field.addEventListener("change", () => {
            this.el.dispatchEvent(
              new Event("input", {
                bubbles: true,
                cancelable: true,
              }),
            );
          });
          break;
        }
        case "price": {
          this.field.addEventListener("input", (e) => {
            const target = e.target as TextFieldInput;

            target.value = target.value.replace(/\D/g, "");
          });

          break;
        }
      }
    });
  };

  public setDisabled = () => {
    this.el.classList.add(states.disabled);
    this.field.setAttribute("disabled", "");
    this.field.value = "";
  };

  public removeDisabled = () => {
    this.el.classList.remove(states.disabled);
    this.field.removeAttribute("disabled");
  };

  public checkValid = (): TextFieldValidateResult => {
    const validation: TextFieldValidateResult = {
      isValid: true,
      error: null,
    };

    if (this.validate.includes("required")) {
      if (this.validate.find((v) => v === "phone")) {
        if (this.field.cleave?.getRawValue() === "+7") {
          validation.isValid = false;
          validation.error = "required";
        }
      } else {
        if (!this.field.value.trim().length) {
          validation.isValid = false;
          validation.error = "required";
        }
      }
    }

    if (validation.isValid) {
      for (let setting of this.validate.filter((v) => v !== "required")) {
        switch (setting) {
          case "phone": {
            if (
              this.field.cleave?.getRawValue().trim() !== "+7" &&
              this.field.cleave?.getRawValue().length !== 12
            ) {
              validation.isValid = false;
              validation.error = "phone";
            }

            break;
          }
          case "email": {
            if (
              this.field.value &&
              !/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test(
                this.field.value,
              )
            ) {
              validation.isValid = false;
              validation.error = "email";
            }

            break;
          }
          case "name": {
            if (
              this.field.value &&
              !/^[а-яА-Яa-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s,.'-]+$/u.test(
                this.field.value,
              )
            ) {
              validation.isValid = false;
              validation.error = "name";
            }

            break;
          }
          case "title": {
            if (
              (this.field.value &&
                !/^[а-яА-Яa-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\d\s,.'-]+$/u.test(
                  this.field.value,
                )) ||
              this.field.value.trim().length > 50
            ) {
              validation.isValid = false;
              validation.error = "title";
            }
            break;
          }
          case "description": {
            if (
              (this.field.value &&
                !/^[а-яА-Яa-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\d\s,.'-]+$/u.test(
                  this.field.value,
                )) ||
              this.field.value.trim().length > 250
            ) {
              validation.isValid = false;
              validation.error = "description";
            }
            break;
          }
          case "price": {
            break;
          }
        }
      }
    }

    return validation;
  };
}

export function initTextFields() {
  const textFields = document.querySelectorAll<HTMLElement>(
    `.js-text-field:not(.${states.init})`,
  );

  textFields.forEach((textField) => {
    new TextField(textField);
  });
}

export function initTextFieldsByFormId(id: string, hard: boolean = false) {
  const textFields = document.querySelectorAll<HTMLElement>(
    `#${id}.js-form .js-text-field${!hard ? `:not(.${states.init})` : ""}`,
  );

  textFields.forEach((textField) => {
    new TextField(textField);
  });
}
