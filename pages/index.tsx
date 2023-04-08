import { Accessor, createSignal, Setter } from 'solid-js';
import { render } from 'solid-js/web';
import { ContextMenu, Option } from "../src"

let yo: Accessor<number>[] = []
let yo2: Setter<number>[] = []
window.yo = yo;
window.yo2 = yo2;

for (let i = 0; i < 1000000; i++) {
  let test = createSignal(1)
  yo[i] = test[0];
  yo2[i] = test[1];
}


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
