import "./buffer.scss"
import { defineElement } from "@chocolatelibui/core"
import { Dots } from "@chocolatelibui/spinners";
import { Line } from "./line"

export class Buffer extends Line {

    /**Returns the name used to define the element */
    static elementName() {
        return 'buffer';
    }

    constructor() {
        super();
        this.appendChild(new Dots)
    }

    focus(dir: FocusOptions) {
        this.focusNext(<boolean><any>dir);
    }
}
defineElement(Buffer);