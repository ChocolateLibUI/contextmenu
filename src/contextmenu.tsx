import { Component, For, Switch, Match } from 'solid-js';
import { Option } from './option';
import styles from "./styles.module.scss";

/**All options needed for creating a context menu line */
type LineOptions = {
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
  /**Lines for sub menu */
  lines?: LineOptions[]
}

export const ContextMenu: Component<{ lines: LineOptions[] }> = (props) => {
  return (
    <div class={styles.contextmenu}>
      <For each={props.lines}>{(line) =>
        <Switch>
          <Match when={line.action}>
            <Option {...line}></Option>
          </Match>
          <Match when={line.lines}>

          </Match>
        </Switch>
      }</For>
    </div>
  );
};
