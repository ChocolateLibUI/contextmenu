import "./submenu.scss"
import "./shared"
import { Base, defineElement } from "@chocolatelibui/core"
import { material_navigation_chevron_right_rounded } from "@chocolatelibui/icons"
import { Menu } from "./menu";
import { Container } from "./container";

export class Submenu extends Base {
    private subContainer: Container | undefined
    private menu: Menu
    private hoverTime: number | undefined

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
        this.menu = menu;
        this.tabIndex = 0;
        let iconBox = this.appendChild(document.createElement('div'));
        if (icon) {
            iconBox.appendChild(icon)
        }
        this.appendChild(document.createElement('span')).innerHTML = text;
        this.appendChild(document.createElement('div'));
        iconBox = this.appendChild(document.createElement('div'));
        iconBox.appendChild(material_navigation_chevron_right_rounded());
        this.addEventListener('focusout', (e) => {
            if (!this.isAncestorOf(<HTMLElement>e.relatedTarget)) {
                this.open = false;
            }
        })

        this.onpointerenter = () => {
            if (!this.subContainer) {
                this.hoverTime = setTimeout(() => {
                    this.open = true;
                }, 200);
            }
        }
        this.onpointerleave = () => {
            clearTimeout(this.hoverTime);
        }
    }

    /**Checks if the given element has this element as ancestor*/
    isAncestorOf(element: HTMLElement) {
        let parent = element?.parentElement;
        while (parent) {
            if (this === parent) {
                return true;
            }
            parent = parent.parentElement;
        }
        return false;
    }


    subFunc(focusFirst?: boolean) {
        this.open = !Boolean(this.subContainer);
        if (focusFirst) {
            (<HTMLElement>this.subContainer?.firstChild?.firstChild).focus()
        }
    }

    /**Opens or closes the sub menu */
    set open(open: boolean) {
        if (open) {
            if (!this.subContainer) {
                this.subContainer = this.appendChild(new Container);
                this.subContainer.attachMenu(this.menu, 0, 0, this);
            }
        } else if (this.subContainer) {
            this.removeChild(this.subContainer);
            delete this.subContainer;
        }
    }
}
defineElement(Submenu);
