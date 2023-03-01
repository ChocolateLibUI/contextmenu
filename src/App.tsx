import { Component, createSignal, Index } from 'solid-js';
import Line from "./line";

export default function ContextMenu(props: { text: string }) {
  const [t1, t2] = createSignal('zxvc')

  setTimeout(() => {
    t2('øææææ')
  }, 1000);

  return (
    <Line text={props.text} func={() => {
      console.warn('test');
    }}></Line>
  );
};
