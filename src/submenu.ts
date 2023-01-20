import "./submenu.scss"
import "./shared"
import { Base, defineElement } from "@chocolatelibui/core"
import { material_navigation_chevron_right_rounded } from "@chocolatelibui/icons"
import { Menu } from "./menu";

export class Submenu extends Base {
    private subContainer: HTMLDivElement | undefined

    /**Returns the name used to define the element */
    static elementName() {
        return 'submenu';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(text: string, menu: Menu, icon?: SVGSVGElement) {
        super();
        let iconBox = this.appendChild(document.createElement('div'));
        if (icon) {
            iconBox.appendChild(icon)
        }
        this.appendChild(document.createElement('span')).innerHTML = text;
        this.appendChild(document.createElement('div'));
        iconBox = this.appendChild(document.createElement('div'));
        iconBox.appendChild(material_navigation_chevron_right_rounded());
        this.onclick


    }

    /**Opens or closes the sub menu */
    set open(open: boolean) {
        if (open) {
            if (!this.subContainer) {
                this.subContainer = this.appendChild(document.createElement('div'));

            }
        } else if (this.subContainer) {

        }
    }
}
defineElement(Submenu);
