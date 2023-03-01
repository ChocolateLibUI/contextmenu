import { Component } from "solid-js";

export default function Line(props: { text: string }) {
    return (
        <div>
            <div></div>
            <div>{props.text}</div>
            <div></div>
            <div></div>
        </div>
    );
}
