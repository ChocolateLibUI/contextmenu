import "./option.scss"
import "./shared"
import { Base } from "@chocolatelibui/core"

export abstract class Line extends Base {
    /**Returns the name used to define the element */
    static elementName() {
        return '@abstract@';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }
}