import "./container.scss"
import { Base, defineElement } from "@chocolatelibui/core"
import { events, forDocuments } from "@chocolatelibui/document"
import { Menu } from "./menu";
import { Submenu } from "./submenu";
import { remToPx, touch } from "@chocolatelibui/theme";

export class Container extends Base {
    readonly root: boolean;
    /**Returns the name used to define the element */
    static elementName() {
        return 'container';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(root?: boolean) {
        super();
        this.root = root || false;
        let preventer = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        }
        this.oncontextmenu = preventer;
        this.onkeydown = preventer;
        this.onkeyup = preventer;
        this.onpointerdown = preventer;
        this.onpointerup = preventer;
        this.onpointercancel = preventer;
        this.onpointerenter = preventer;
        this.onpointerleave = preventer;
        this.onpointermove = preventer;
        this.onpointerout = preventer;
        this.onpointerout = preventer;
        this.onclick = preventer;
    }

    /**Returns the zindex of the context menu container default is 999999999 */
    get zIndex() {
        return parseInt(this.style.zIndex);
    }

    /**Changes z index of the context menu container, this should always be the highest element of the dom */
    set zIndex(z: number) {
        this.style.zIndex = String(z);
    }

    attachMenu(menu: Menu, x: number, y: number, sub?: Submenu) {
        this.replaceChildren(menu)
        let box = menu.getBoundingClientRect();
        let top = NaN;
        let bottom = NaN;
        let left = NaN;
        let right = NaN;
        if (sub) {
            let subBox = sub.getBoundingClientRect();
            if (subBox.x + subBox.width + box.width > window.innerWidth) {
                x = subBox.x;
                if (box.width < x) {
                    right = (window.innerWidth - x);
                } else {
                    right = (window.innerWidth - (subBox.x + subBox.width));
                }
            } else {
                x = subBox.x + subBox.width;
            }
            y = subBox.y + remToPx((touch.get ? 2 : 1));
        }
        if (y + box.height >= window.innerHeight) {
            if (y >= box.height) {
                bottom = (window.innerHeight - y);
            } else {
                top = (window.innerHeight - box.height);
            }
        } else {
            top = y;
        }
        if (right !== right && left !== left) {
            if (box.width >= window.innerWidth) {
                right = 0;
            } else if (x + box.width >= window.innerWidth) {
                if (x >= box.width) {
                    right = (window.innerWidth - x);
                } else {
                    left = (window.innerWidth - box.width);
                }
            } else {
                left = x;
            }
        }
        menu.style.top = (top === top ? top + 'px' : '');
        menu.style.bottom = (bottom === bottom ? bottom + 'px' : '')
        menu.style.left = (left === left ? left + 'px' : '')
        menu.style.right = (right === right ? right + 'px' : '')
        //@ts-expect-error
        menu.fullscreen = (top === 0 || right === 0);
        menu.focus();
    }
}
defineElement(Container);

events.on('documentAdded', (e) => {
    (<any>e.data)["@chocolatelibui/contextmenu"] = e.data.documentElement.appendChild(new Container(true));
});
forDocuments((doc) => {
    (<any>doc)["@chocolatelibui/contextmenu"] = doc.documentElement.appendChild(new Container(true));
})