import { Base, defineElement } from "@chocolatelibui/core"

class Menu extends Base {

    /**Returns the name used to define the element */
    static elementName() {
        return 'menu';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor() {
        super();
    }
}
defineElement(Menu);
