import { Base, defineElement } from "@chocolatelibui/core"

let containerList: ContextMenuContainer[] = []

class ContextMenuContainer extends Base {

    /**Returns the name used to define the element */
    static elementName() {
        return 'container';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return '@chocolatelibui/contextmenu';
    }

    constructor() {
        super();
        this.style.zIndex = 
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

document.appendChild(new ContextMenuContainer);