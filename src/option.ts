import "./option.scss"
import { defineElement } from "@chocolatelibui/core"
import { Line } from "./line"

export interface OptionOptions {
    text: string,
    func: () => void
}

export class Option extends Line {
    readonly func: () => void;

    /**Returns the name used to define the element */
    static elementName() {
        return 'option';
    }

    constructor(text: string, func: () => void, icon?: SVGSVGElement, shortcut?: string, checkmark?: boolean) {
        super();
        this.func = func;
        this.tabIndex = 0;
        let iconBox = this.appendChild(document.createElement('div'));
        iconBox.className = 'icon';
        if (icon) {
            iconBox.appendChild(icon)
        }
        let textBox = this.appendChild(document.createElement('div'))
        textBox.innerHTML = text;
        textBox.className = 'text';
        let shortcutBox = this.appendChild(document.createElement('div'));
        if (shortcut) {
            shortcutBox.innerHTML = shortcut;
        }
        shortcutBox.className = 'shortcut';
        let checkMarkBox = this.appendChild(document.createElement('div'));
        if (checkmark) {
            checkMarkBox.innerHTML = '✓'
        }
        checkMarkBox.className = 'checkmark';
    }
}
defineElement(Option);