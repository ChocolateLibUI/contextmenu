import "./container.scss"
import { Base, defineElement } from "@chocolatelibui/core"
import { events, forDocuments } from "@chocolatelibui/document"
import { Menu } from "./menu";

let containerZIndex = '99999999';
export let setContainerZIndex = (zIndex: number) => {
    containerZIndex = String(zIndex);
    forDocuments((doc) => {
        (<Container>(<any>doc)["@chocolatelibui/prompts"]).style.zIndex = containerZIndex;
    })
}

export class Container extends Base {
    private activeElementBuffer: HTMLOrSVGElement | null | undefined;

    /**Returns the name used to define the element */
    static elementName() {
        return 'container';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor() {
        super();
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

events.on('documentAdded', (e) => {
    (<any>e.data)["@chocolatelibui/contextmenu"] = e.data.documentElement.appendChild(new Container);
});
forDocuments((doc) => {
    (<any>doc)["@chocolatelibui/contextmenu"] = doc.documentElement.appendChild(new Container);
})