import "./option.scss"
import "./shared"
import { Base, defineElement } from "@chocolatelibui/core"
import { Menu } from "./menu"

export interface OptionOptions {
    text: string,
    func: () => void
}

export class Option extends Base {
    readonly menu: Menu | undefined;
    readonly func: () => void;

    /**Returns the name used to define the element */
    static elementName() {
        return 'option';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(text: string, func: () => void, icon?: SVGSVGElement, shortcut?: string, checkmark?: boolean) {
        super();
        this.func = func;
        this.tabIndex = 0;
        let iconBox = this.appendChild(document.createElement('div'));
        if (icon) {
            iconBox.appendChild(icon)
        }
        this.appendChild(document.createElement('span')).innerHTML = text;
        let shortcutText = this.appendChild(document.createElement('div'));
        if (shortcut) {
            shortcutText.innerHTML = shortcut;
        }
        let checkMark = this.appendChild(document.createElement('span'));
        if (checkmark) {
            checkMark.innerHTML = '✓'
        }
    }
}
defineElement(Option);