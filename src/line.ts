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

    /**Changes focus to the next line
     * @param direction false is next sibling, true is previous */
    focusNext(direction: boolean) {
        if (direction) {
            if (this.previousElementSibling) {
                (<HTMLElement>this.previousElementSibling).focus({})
            } else if (this.parentElement?.lastElementChild !== this) {
                (<HTMLElement>this.parentElement?.lastElementChild).focus({})
            }
        } else {
            if (this.nextElementSibling) {
                (<HTMLElement>this.nextElementSibling).focus()
            } else if (this.parentElement?.firstElementChild !== this) {
                (<HTMLElement>this.parentElement?.firstElementChild).focus()
            }
        }
    }
}