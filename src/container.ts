import "./container.scss"
import { Base, defineElement } from "@chocolatelibui/core"
import { events, forDocuments } from "@chocolatelibui/document"
import { Menu } from "./menu";

export class Container extends Base {
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
        let preventer = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        }
        this.oncontextmenu = preventer
        this.onkeyup = preventer
        this.onkeydown = preventer
        this.onpointerdown = preventer
        this.onpointerup = preventer
        this.onpointercancel = preventer
        this.onpointerenter = preventer
        this.onpointerleave = preventer
        this.onpointermove = preventer
        this.onpointerout = preventer
        this.onpointerout = preventer
    }

    /**Returns the zindex of the context menu container default is 999999999 */
    get zIndex() {
        return parseInt(this.style.zIndex);
    }

    /**Changes z index of the context menu container, this should always be the highest element of the dom */
    set zIndex(z: number) {
        this.style.zIndex = String(z);
    }

    attachMenu(menu: Menu, x: number, y: number) {
        this.appendChild(menu);
        let box = menu.getBoundingClientRect();
        let top = NaN;
        let bottom = NaN;
        let left = NaN;
        let right = NaN;
        if (y >= box.height) {
            bottom = (window.innerHeight - y);
        } else if (y + box.height >= window.innerHeight) {
            top = (window.innerHeight - box.height);
        } else {
            top = y;
        }
        if (box.width >= window.innerWidth) {
            right = 0;
        } else if (x >= box.width) {
            right = (window.innerWidth - x);
        } else if (x + box.width >= window.innerWidth) {
            left = (window.innerWidth - box.width);
        } else {
            left = x;
        }
        menu.style.top = (top === top ? top + 'px' : '');
        menu.style.bottom = (bottom === bottom ? bottom + 'px' : '')
        menu.style.left = (left === left ? left + 'px' : '')
        menu.style.right = (right === right ? right + 'px' : '')
        //@ts-expect-error
        menu.fullscreen = (top === 0 || right === 0);
        menu.focus();
        // menu.onblur = () => {
        //     menu.remove();
        // }
    }
}
defineElement(Container);

events.on('documentAdded', (e) => {
    (<any>e.data)["@chocolatelibui/contextmenu"] = e.data.documentElement.appendChild(new Container);
});
forDocuments((doc) => {
    (<any>doc)["@chocolatelibui/contextmenu"] = doc.documentElement.appendChild(new Container);
})