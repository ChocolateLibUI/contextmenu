import { Base, defineElement } from "@chocolatelibui/core"

class Line extends Base {

    /**Returns the name used to define the element */
    static elementName() {
        return 'line';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor() {
        super();
    }
}
defineElement(Line);
