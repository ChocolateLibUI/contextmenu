import { Component } from "solid-js";

export default function Line(props: { text: string, func: () => void, icon?: SVGSVGElement, }) {
    return (
        <div onClick={props.func}>
            <div></div>
            <div>{props.text}</div>
            <div></div>
            <div></div>
        </div>
    );
}
