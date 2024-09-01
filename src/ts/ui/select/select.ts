import { states } from "../../utils";
import Choices from "choices.js";
import type { Options, Item } from "choices.js";

export type SelectElement = HTMLDivElement & { select?: Select };

export class Select {
  element: SelectElement;
  select: HTMLSelectElement & { choises?: Choices };
  isCity: boolean;

  constructor(element: HTMLDivElement) {
    if (element.classList.contains(states.init)) return;

    this.element = element;

    this.init();
  }

  private init = () => {
    this.select = this.element.querySelector(".js-select-field");

    this.isCity = this.element.classList.contains("select-type--city");

    this.select.choises = new Choices(this.select, {
      searchEnabled: false,
      allowHTML: true,
      placeholder: true,
      shouldSort: false,
      choices: JSON.parse(
        decodeURIComponent((this.select.dataset as any).selectOptions || []),
      ),
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
      callbackOnCreateTemplates(template) {
        return {
          item(
            {
              allowHTML,
              classNames: {
                item,
                button,
                highlightedState,
                itemSelectable,
                placeholder,
              },
            }: Options,
            {
              id,
              value,
              label,
              customProperties,
              active,
              disabled,
              highlighted,
              placeholder: isPlaceholder,
            }: Item,
            removeItemButton: boolean,
          ): HTMLDivElement {
            const labelElement = Object.assign(document.createElement("div"), {
              [allowHTML ? "innerHTML" : "innerText"]: label,
            });
            
            const div = Object.assign(document.createElement("div"), {
              className: item,
              [allowHTML ? "innerHTML" : "innerText"]: labelElement?.querySelector(".js-select-choise-item")?.innerHTML || label,
            });

            Object.assign(div.dataset, {
              item: "",
              id,
              value,
              customProperties,
            });

            if (active) {
              div.setAttribute("aria-selected", "true");
            }

            if (disabled) {
              div.setAttribute("aria-disabled", "true");
            }

            if (isPlaceholder) {
              div.classList.add(placeholder);
            }

            div.classList.add(highlighted ? highlightedState : itemSelectable);

            if (removeItemButton) {
              if (disabled) {
                div.classList.remove(itemSelectable);
              }
              // @ts-ignore
              div.dataset.deletable = "";
              /** @todo This MUST be localizable, not hardcoded! */
              const REMOVE_ITEM_TEXT = "Remove item";
              const removeButton = Object.assign(
                document.createElement("button"),
                {
                  type: "button",
                  className: button,
                  [allowHTML ? "innerHTML" : "innerText"]: REMOVE_ITEM_TEXT,
                },
              );
              removeButton.setAttribute(
                "aria-label",
                `${REMOVE_ITEM_TEXT}: '${value}'`,
              );

              // @ts-ignore
              removeButton.dataset.button = "";
              div.appendChild(removeButton);
            }

            return div;
          },
        };
      },
    });
    this.element.select = this;
    this.element.classList.add(states.init);
  };
}

export function initSelects() {
  const selects = document.querySelectorAll<HTMLDivElement>(
    `.js-select:not(.${states.init})`,
  );

  selects.forEach((select) => {
    new Select(select);
  });
}
