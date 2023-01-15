import "./container.scss"
import { Base, defineElement } from "@chocolatelibui/core"

let containerList: ContextMenuContainer[] = []

class ContextMenuContainer extends Base {

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
        this.style.zIndex = '999999999'
    }

    /**Returns the zindex of the context menu container default is 999999999 */
    get zIndex() {
        return parseInt(this.style.zIndex);
    }

    /**Changes z index of the context menu container, this should always be the highest element of the dom */
    set zIndex(z: number) {
        this.style.zIndex = String(z);
    }


    /**Runs when element is attached to document*/
    connectedCallback() {
        containerList.push(this);
    }
    /**Runs when element is dettached from document*/
    disconnectedCallback() {
        let index = containerList.indexOf(this);
        if (index != -1) {

        } else {
            console.warn('');
        }
    }

}
defineElement(ContextMenuContainer);

document.documentElement.appendChild(new ContextMenuContainer);



export let attachContexMenu = (element: Node, menu?: boolean) => {
    console.warn('test');
    element.addEventListener('contextmenu', (e) => {
        console.warn('test');
        e.preventDefault();
    })
}