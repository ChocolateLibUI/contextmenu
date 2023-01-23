import { events, forDocuments, mainDocument } from "@chocolatelibui/document";
import "./container";
import { Container } from "./container";
import { Lines, Menu } from "./menu";

/**Sets the default context menu for the page, the one used if no other context menu has been attached to the element
 * If set to a boolean the operating system context menu is disabled and nothing will appear
 * If set undefined the operating systems context menu will be used*/
let defaultMenu: Lines | undefined;
let defaultMenuListening: boolean = false;
export let defaultContextMenu = (lines?: Lines | boolean) => {
    if (defaultMenu) {
        forDocuments((doc) => { dettachContexMenu(doc.body); })
    }
    if (lines === false || lines === true) {
        defaultMenu = undefined;
    } else if (lines) {
        defaultMenu = lines;
    }
    forDocuments((doc) => { attachContexMenu(doc.body, defaultMenu); })
    if (!defaultMenuListening) {
        events.on('documentAdded', (e) => {
            attachContexMenu(e.data.body, defaultMenu);
        });
        defaultMenuListening = true;
    }
}

/**Attaches a context menu to the given element*/
export let attachContexMenu = (element: Element, lines?: Lines) => {
    if ((<any>element)["@chocolatelibui/contextmenu"]) {
        console.warn('Context menu already attached to node', element);
    } else {
        if (lines) {
            var listener = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                summonContexMenu(lines, element, (<MouseEvent>e).clientX, (<MouseEvent>e).clientY)
            };
            element.addEventListener('contextmenu', listener);
        } else {
            var listener = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
            };
            element.addEventListener('contextmenu', listener);
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
* @param lines the context menu to summon
* @param element the element the context menu is referenced to, if undefined the context menu will appear in the main document
* @param x x position for context menu, if undefined, will use element middle, if element undefined, will put context menu in the top left corner of the screen
* @param y y position for context menu, if undefined, will use element middle, if element undefined, will put context menu in the top left corner of the screen
* @param dontCover when set true */
export let summonContexMenu = async (lines: Lines, element?: Element, x?: number, y?: number, dontCover?: boolean) => {
    let container = <Container>(element ? (<any>element.ownerDocument)["@chocolatelibui/contextmenu"] : (<any>mainDocument)["@chocolatelibui/contextmenu"]);
    if (typeof x !== 'number' || typeof y !== 'number') {
        if (element) {
            let box = element.getBoundingClientRect();
            x = box.left + (box.width / 2);
            y = box.top + (box.height / 2)
        } else {
            x = 0;
            y = 0;
        }
    }
    container.attachMenu(new Menu(lines)).setPosition(<number>x, <number>y, (dontCover ? element : undefined));
}