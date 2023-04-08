import "./container.scss"
import { Base, defineElement } from "@chocolatelibui/core"
import { Menu } from "./menu";
import { Engine } from "./engine";

let containerZIndex = '99999999';

export class Container extends Base {
    engine: Engine;

    private activeElementBuffer: HTMLOrSVGElement | null | undefined;

    /**Returns the name used to define the element */
    static elementName() {
        return 'container';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(engine: Engine) {
        super();
        this.engine = engine;
        this.tabIndex = -1;
        let preventer = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        }
        this.oncontextmenu = preventer;
        this.onpointerdown = preventer;
        this.onpointerup = preventer;
        this.onpointercancel = preventer;
        this.onpointerenter = preventer;
        this.onpointerleave = preventer;
        this.onpointermove = preventer;
        this.onpointerout = preventer;
        this.onpointerout = preventer;
        this.onclick = preventer;
        this.style.zIndex = containerZIndex;
    }

    /**Attaches a menu to the container */
    attachMenu(menu: Menu) {
        //@ts-expect-error
        menu.container = this;
        this.activeElementBuffer = (<HTMLOrSVGElement | null>this.ownerDocument.activeElement);
        this.replaceChildren(menu);
        return menu;
    }

    /**Closes open context menu */
    closeUp(menu: Menu) {
        if (this.activeElementBuffer) {
            this.activeElementBuffer.focus();
            if (<any>this.ownerDocument.activeElement !== <any>this.activeElementBuffer) {
                this.focus();
            }
            this.activeElementBuffer = undefined;
        } else {
            this.focus();
        }
        this.removeChild(menu);
    }
}
defineElement(Container);