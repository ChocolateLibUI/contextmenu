import { mainDocument } from "@chocolatelibui/document"
import { Container } from "./container"
import { Menu } from "./menu"

export * from "./container"
export * from "./menu"
export * from "./devider"
export * from "./option"
export * from "./submenu"

/**Sets the default context menu for the page, the one used if no other context menu has been attached to the element
 * If set to false the operating system context menu is disabled and nothing will appear
 * If set undefined the operating systems context menu will be used*/
export let defaultContextMenu = (menu?: boolean) => {

}

/**Attaches a context menu to the given element*/
export let attachContexMenu = (element: Element, menu?: Menu) => {
    if ((<any>element)["@chocolatelibui/contextmenu"]) {
        console.warn('Context menu already attached to node', element);
    } else {
        if (menu) {
            var listener = element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                summonContexMenu(menu, element, (<MouseEvent>e).clientX, (<MouseEvent>e).clientY)
            }, true);
        } else {
            var listener = element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, true);
        }
        (<any>element)["@chocolatelibui/contextmenu"] = listener;
    }
}

/**Dettaches the context menu from the given element */
export let dettachContexMenu = (element: Element) => {
    if ((<any>element)["@chocolatelibui/contextmenu"]) {
        element.removeEventListener('contextmenu', (<any>element)["@chocolatelibui/contextmenu"]);
        delete (<any>element)["@chocolatelibui/contextmenu"];
    } else {
        console.warn('No context menu registered with node', element);
    }
}

/**Summons a context menu at a given location
* @param menu the context menu to summon
* @param element the element the context menu is referenced to, if undefined the context menu will appear in the main document
* @param x x position for context menu, if undefined, will use element middle, if element undefined, will put context menu in the top left corner of the screen
* @param y y position for context menu, if undefined, will use element middle, if element undefined, will put context menu in the top left corner of the screen*/
export let summonContexMenu = (menu: Menu, element?: Element, x?: number, y?: number) => {
    if (element) {
        let container = <Container>(<any>element.ownerDocument)["@chocolatelibui/contextmenu"]
        if (x && y) {
            container.attachMenu(menu, x, y);
        } else {
            let box = element.getBoundingClientRect();
            container.attachMenu(menu, box.left + (box.width / 2), box.top + (box.height / 2));
        }
    } else {
        let container = <Container>(<any>mainDocument)["@chocolatelibui/contextmenu"]
        if (x && y) {
            container.attachMenu(menu, x, y);
        } else {
            container.attachMenu(menu, 0, 0);
        }
    }
}