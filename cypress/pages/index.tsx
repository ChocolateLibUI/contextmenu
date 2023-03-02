document.body.appendChild(document.createElement('div')).innerHTML = 'Test99'
document.body.appendChild(document.createElement('div')).innerHTML = 'Test994'

import { render } from 'solid-js/web';
import { App1, App2 } from '../../src';

function HelloWorld() {
  return (
    <div>Hello World!

      <App1 text='yo'></App1>
      <App2 test={1}></App2>
    </div>
  );
}

render(() => <HelloWorld />, document.body)