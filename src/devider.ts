import "./devider.scss"
import { defineElement } from "@chocolatelibui/core"
import { Line } from "./line";

export class Devider extends Line {
    /**Returns the name used to define the element */
    static elementName() {
        return 'devider';
    }

    focus(dir: FocusOptions) {
        this.focusNext(<boolean><any>dir);
    }
}
defineElement(Devider);
