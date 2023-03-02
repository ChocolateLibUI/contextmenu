import { Component } from "solid-js";
import styles from "./styles.module.scss";

export interface OptionProps {
    /**Text for line */
    text: string,
    /**Action for click on line */
    action?: () => void,
    /**Icon for line */
    icon?: SVGSVGElement,
    /**Keyboard shortcut for action */
    shortcut?: string,
    /**If the lines functionality is already active */
    checkmark?: boolean,
}

export const Option: Component<OptionProps> = (props) => {
    return (
        <div onClick={props.action} class={styles.line} tabIndex='0'>
            <div>{props.icon}</div>
            <div>{props.text}</div>
            <div>{props.shortcut}</div>
            <div>{(props.checkmark ? '✓' : '')}</div>
        </div>
    );
}
