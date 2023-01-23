import "./option.scss"
import { defineElement } from "@chocolatelibui/core"
import { Line } from "./line"
import { Menu } from "./menu";

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

        this.onclick = (e) => {
            e.stopPropagation();
            this.func();
            navigator?.vibrate(25);
            (<Menu>this.parentElement).closeUp();
        }

        this.onkeydown = (e) => {
            switch (e.code) {
                case 'Tab':
                case 'ArrowUp':
                case 'ArrowDown':
                    this.focusNext(e.shiftKey || e.code === 'ArrowUp')
                    break;
                case 'Enter':
                case 'Space':
                    this.func();
                    (<any>this.parentElement).closeUp();
                    break;
                case 'ArrowLeft':
                case 'Escape':
                    return;
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }
}
defineElement(Option);