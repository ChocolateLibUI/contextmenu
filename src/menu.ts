import "./menu.scss"
import "./shared"
import { Base, defineElement } from "@chocolatelibui/core"
import { material_navigation_close_rounded, } from "@chocolatelibui/icons"
import { Option } from "./option";
import { Line } from "./line";
import { remToPx } from "@chocolatelibui/theme";
import { Container } from "./container";
import { Buffer } from "./buffer";
import { Submenu } from "./submenu";

export type LineAny = (Line | (() => Line))[]
export type Lines = LineAny | (() => LineAny | Promise<LineAny>) | Promise<LineAny>;

export class Menu extends Base {
    private submenu: Menu | undefined;
    private closer: Option | undefined;
    private x: number | undefined;
    private y: number | undefined;
    private element: Element | undefined;

    /**Returns the name used to define the element */
    static elementName() {
        return 'menu';
    }
    /**Returns the namespace override for the element*/
    static elementNameSpace() {
        return 'chocolatelibui-contextmenu';
    }

    constructor(lines: Lines) {
        super();
        let linesOpt = (typeof lines === 'function' ? lines() : lines);
        if (linesOpt instanceof Promise) {
            let buffer = this.appendChild(new Buffer);
            linesOpt.then((line) => {
                buffer.remove();
                this.lines = line;
                this.setPosition(this.x, this.y, this.element);
            })
        } else {
            this.lines = linesOpt;
        }
        this.tabIndex = 0;
        this.onblur = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!e.relatedTarget) {
                this.closeUp();
            }
        }
        this.onscroll = () => {
            this.closeDown();
        }
        this.onkeydown = (e) => {
            switch (e.code) {
                case 'Tab':
                case 'ArrowUp':
                case 'ArrowDown':
                    this.focusNext(e.shiftKey || e.code === 'ArrowUp');
                    break;
                case 'ArrowLeft':
                    if (!(this.parentElement instanceof Container)) {
                        (<any>this.parentElement).focus();
                        (<any>this.parentElement).closeDown();
                    }
                    break;
                case 'Escape':
                    this.closeUp();
                    break;
            }
            e.preventDefault();
            e.stopPropagation();
        }
    }

    /**Sets the lines of the context menu */
    set lines(lines: LineAny) {
        this.replaceChildren();
        if (this.closer) {
            this.appendChild(this.closer);
        }
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            let lineInst = (typeof line === 'function' ? line() : line);
            this.appendChild(lineInst);
        }
    }

    /**Changes focus to the next line
     * @param direction false is first child, true is last child */
    focusNext(direction: boolean) {
        if (direction) {
            (<HTMLElement>this.lastChild)?.focus()
        } else {
            (<HTMLElement>this.firstChild)?.focus({})
        }
    }

    /**Returns wether the menu is in fullscreen mode */
    get fullscreen() {
        return Boolean(this.closer);
    }

    /**Sets the context menu to fullscreen mode */
    set fullscreen(full: boolean) {
        if (full) {
            this.classList.add('fullscreen');
            if (!this.closer) {
                this.closer = new Option('Close', () => { }, material_navigation_close_rounded());
                this.closer.onclick = (e) => {
                    e.stopPropagation();
                    if (this.parentElement instanceof Submenu) {
                        this.parentElement.closeDown();
                    } else {
                        this.closeUp();
                    }
                };
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

    /**Closes the context menu down the tree*/
    closeDown() {
        if (this.submenu) {
            (<any>this.submenu).closeDown();
        }
        this.submenu = undefined;
    }

    /**Closes the context menu up the tree to the root*/
    closeUp() {
        this.closeDown();
        (<any>this.parentElement).closeUp(this);
    }

    /**Updates the position of the menu
     * @param x x coordinate for menu, this will be ignored if needed for contextmenu to fit
     * @param y y coordinate for menu, this will be ignored if needed for contextmenu to fit
     * @param element element to use instead of coordinates, the contextemenu will avoid covering the element if possible*/
    setPosition(x: number = 0, y: number = 0, element?: Element) {
        this.x = x;
        this.y = y;
        this.element = element;
        let box = this.getBoundingClientRect();
        let window = this.ownerDocument.defaultView;
        let top = NaN;
        let bottom = NaN;
        let left = NaN;
        let right = NaN;
        if (window) {
            if (element) {
                var subBox = element.getBoundingClientRect();
                if (subBox.x + subBox.width + box.width > window.innerWidth) {
                    x = subBox.x;
                    if (box.width < x) {
                        right = (window.innerWidth - x);
                    } else {
                        right = (window.innerWidth - (subBox.x + subBox.width));
                    }
                } else {
                    x = subBox.x + subBox.width;
                }
                y = subBox.y + subBox.height;
                if (y + box.height >= window.innerHeight) {
                    if (y >= box.height) {
                        bottom = (window.innerHeight - subBox.y);
                    } else {
                        top = (window.innerHeight - box.height);
                    }
                } else {
                    top = y;
                }
            } else {
                if (y + box.height >= window.innerHeight) {
                    if (y >= box.height) {
                        bottom = (window.innerHeight - y);
                    } else {
                        top = (window.innerHeight - box.height);
                    }
                } else {
                    top = y;
                }
                if (box.width >= window.innerWidth) {
                    right = 0;
                } else if (x + box.width >= window.innerWidth) {
                    if (x >= box.width) {
                        right = (window.innerWidth - x);
                    } else {
                        left = (window.innerWidth - box.width);
                    }
                } else {
                    left = x;
                }
            }
            this.fullscreen = (box.height >= window.innerHeight - remToPx(4) || box.width === window.innerWidth);
        } else {
            top = 0;
            left = 0;
        }
        this.style.top = (top === top ? top + 'px' : '');
        this.style.bottom = (bottom === bottom ? bottom + 'px' : '')
        this.style.left = (left === left ? left + 'px' : '')
        this.style.right = (right === right ? right + 'px' : '')
        this.focus();
    }
}
defineElement(Menu);
