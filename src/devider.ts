import "./devider.scss"
import { defineElement } from "@chocolatelibui/core"
import { Line } from "./line";

export class Devider extends Line {
    /**Returns the name used to define the element */
    static elementName() {
        return 'devider';
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
