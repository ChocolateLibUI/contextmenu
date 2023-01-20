import "./menu.scss"
import "./shared"
import { Base, defineElement } from "@chocolatelibui/core"
import { material_navigation_close_rounded } from "@chocolatelibui/icons"
import { Option } from "./option";
import { Devider } from "./devider";
import { Submenu } from "./submenu";
import { Container } from "./container";

export type MenuLine = Option | Devider | Submenu

export class Menu extends Base {
    private closer: Option | undefined
    readonly container: Container | undefined;

    /**Returns the name used to define the element */
    static elementName() {
        return 'menu';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(lines?: MenuLine[]) {
        super();
        this.tabIndex = 0;
        if (lines) {
            this.lines = lines
        }
        this.addEventListener('focusout', (e) => {
            if (!e.relatedTarget) {
                this.remove();
            }
        })
        this.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if ((<any>e.target).func) {
                (<any>e.target).func()
                this.focus();
                this.blur();
            }
            if ((<any>e.target).subFunc) {
                (<any>e.target).subFunc()
            }
        }
        this.onkeydown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            switch (e.code) {
                case 'Tab':
                case 'ArrowUp':
                case 'ArrowDown':
                    if (e.target === this) {
                        if (e.shiftKey || e.code === 'ArrowUp') {
                            (<HTMLElement>this.lastChild).focus({})
                        } else {
                            (<HTMLElement>this.firstChild).focus()
                        }
                    } else {
                        if (e.shiftKey || e.code === 'ArrowUp') {
                            if ((<HTMLElement>e.target).previousElementSibling) {
                                (<HTMLElement>(<HTMLElement>e.target).previousElementSibling).focus()
                            } else {
                                (<HTMLElement>(<HTMLElement>e.target).parentElement?.lastElementChild).focus()
                            }
                        } else {
                            if ((<HTMLElement>e.target).nextElementSibling) {
                                (<HTMLElement>(<HTMLElement>e.target).nextElementSibling).focus({})
                            } else {
                                (<HTMLElement>(<HTMLElement>e.target).parentElement?.firstElementChild).focus({})
                            }
                        }
                    }
                    break;
                case 'ArrowRight':
                    if ((<Submenu>e.target).subFunc) {
                        (<Submenu>e.target).subFunc(true)
                    }
                    break;
                case 'ArrowLeft':
                    let parent = <Container>(<HTMLElement>e.target).parentElement;
                    if (parent instanceof Menu) {
                        parent = <Container>parent.parentElement;
                    }
                    if (!parent.root) {
                        parent.parentElement?.focus();
                    }
                    break;
                case 'Enter':
                case 'Space':
                    if ((<Option>e.target).func) {
                        (<Option>e.target).func()
                        this.focus();
                        this.blur();
                    }
                    if ((<Submenu>e.target).subFunc) {
                        (<Submenu>e.target).subFunc(true)
                    }
                    break;
                case 'Escape':
                    this.focus();
                    this.blur();
                    break;
            }
        }
    }

    /**Sets the lines of the context menu */
    set lines(lines: MenuLine[]) {
        this.replaceChildren();
        if (this.closer) {
            this.appendChild(this.closer);
        }
        for (let i = 0; i < lines.length; i++) {
            this.appendChild(lines[i])
        }
    }

    /**Changes the context menu to fullscreen mode*/
    private set fullscreen(full: boolean) {
        if (full) {
            this.classList.add('fullscreen');
            if (!this.closer) {
                this.closer = new Option('Close', () => {
                    this.remove();
                }, material_navigation_close_rounded());
                this.prepend(this.closer);
            }
        } else {
            this.classList.remove('fullscreen');
            if (this.closer) {
                this.closer.remove();
                delete this.closer;
            }
        }
    }
}
defineElement(Menu);
