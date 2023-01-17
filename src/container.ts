import "./container.scss"
import { Base, defineElement } from "@chocolatelibui/core"
import { events, forDocuments } from "@chocolatelibui/document"

class ContextMenuContainer extends Base {

    /**Returns the name used to define the element */
    static elementName() {
        return 'container';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(document: Document) {
        super();
        this.style.zIndex = '999999999'
        if (document.defaultView) {
            document.defaultView.addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
        } else {
            throw 'Document not in window'
        }
    }

    /**Returns the zindex of the context menu container default is 999999999 */
    get zIndex() {
        return parseInt(this.style.zIndex);
    }

    /**Changes z index of the context menu container, this should always be the highest element of the dom */
    set zIndex(z: number) {
        this.style.zIndex = String(z);
    }
}
defineElement(ContextMenuContainer);

events.on('documentAdded', (e) => {
    let container = e.data.documentElement.appendChild(new ContextMenuContainer(e.data));
    //@ts-expect-error
    e.data["@chocolatelibui/contextmenu"] = container;
});
forDocuments((doc) => {
    let container = doc.documentElement.appendChild(new ContextMenuContainer(doc));
    //@ts-expect-error
    doc["@chocolatelibui/contextmenu"] = container;
})

export let attachContexMenu = (element: Node, menu?: boolean) => {

}