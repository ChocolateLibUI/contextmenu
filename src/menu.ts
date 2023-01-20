import "./menu.scss"
import "./shared"
import { Base, defineElement } from "@chocolatelibui/core"
import { material_navigation_close_rounded } from "@chocolatelibui/icons"
import { Option } from "./option";
import { Devider } from "./devider";
import { Submenu } from "./submenu";
import { Container } from "./container";

export type MenuLine = Option | Devider | Submenu

export class Menu extends Base {
    private closer: Option | undefined
    readonly container: Container | undefined;

    /**Returns the name used to define the element */
    static elementName() {
        return 'menu';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(lines?: MenuLine[]) {
        super();
        this.tabIndex = 0;
        if (lines) {
            this.lines = lines
        }
        this.onclick = (e) => {

            console.warn('test', e.target);
        }
    }

    /**Sets the lines of the context menu */
    set lines(lines: MenuLine[]) {
        this.replaceChildren();
        if (this.closer) {
            this.appendChild(this.closer);
        }
        for (let i = 0; i < lines.length; i++) {
            this.appendChild(lines[i])
        }
    }

    /**Changes the context menu to fullscreen mode*/
    private set fullscreen(full: boolean) {
        if (full) {
            this.classList.add('fullscreen');
            if (!this.closer) {
                this.closer = new Option('Close', () => { this.remove(); }, material_navigation_close_rounded());
                this.prepend(this.closer);
            }
        } else {
            this.classList.remove('fullscreen');
            if (this.closer) {
                this.closer.remove();
                delete this.closer;
            }
        }
    }
}
defineElement(Menu);
