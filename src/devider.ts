import "./devider.scss"
import "./shared"
import { Base, defineElement } from "@chocolatelibui/core"

export class Devider extends Base {

    /**Returns the name used to define the element */
    static elementName() {
        return 'devider';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    focus(dir: FocusOptions) {
        if (dir) {
            if (this.nextElementSibling) {
                (<HTMLElement>this.nextElementSibling).focus({})
            } else {
                (<HTMLElement>this.parentElement?.firstElementChild).focus({})
            }
        } else {
            if (this.previousElementSibling) {
                (<HTMLElement>this.previousElementSibling).focus()
            } else {
                (<HTMLElement>this.parentElement?.lastElementChild).focus()
            }
        }
    }
}
defineElement(Devider);
