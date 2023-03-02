import { render } from 'solid-js/web';
import { ContextMenu, Option } from "../src"

function HelloWorld() {
  return (
    <div>Hello World!
      <ContextMenu lines={[
        { text: 'YOYO', action: () => { console.warn('YO') }, checkmark: true },
        { text: 'YOYO', action: () => { console.warn('YO') }, shortcut: 'Ctrl+A' },
        { text: 'YOYO', action: () => { console.warn('YO') } },
      ]}></ContextMenu>
    </div>
  );
}

render(() => <HelloWorld />, document.body)
