/**All options needed for creating a context menu line */
export type LineOptions = {
    /**Text for line */
    text: string,
    /**Action for click on line */
    action?: () => {},
    /**Icon for line */
    icon?: SVGSVGElement,
    /**Keyboard shortcut for action */
    shortcut?: string,
    /**If the lines functionality is already active */
    checkmark?: boolean,
    /**Lines for sub menu */
    subMenu?: LineOptions[]
}

/**A line for the context menu */
export type LineType = LineOptions | number | (() => LineOptions | number | Promise<LineOptions | number>)

export let menuGenerator = (options: LineType[]) => {

}