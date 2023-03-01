/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { createSignal } from 'solid-js';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

let [asfd, ooo] = createSignal('asdfasdf')

setTimeout(() => {
  ooo('yoyoyoyo')
}, 500);

render(() => <App text={asfd()} />, root!);
