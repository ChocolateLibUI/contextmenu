import "./index.scss"
import { attachContexMenu } from "../src"

let test1 = document.body.appendChild(document.createElement('div'));
let test2 = document.body.appendChild(document.createElement('div'));
let test3 = document.body.appendChild(document.createElement('div'));
let test4 = document.body.appendChild(document.createElement('div'));

attachContexMenu(test1);

document.body.oncontextmenu = (e) => {
    console.warn('test');
    e.preventDefault();
}

window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});