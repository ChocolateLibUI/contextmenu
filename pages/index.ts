import "./index.scss"
import * as contextMenu from "../src"
import { Devider, Menu, Option, Submenu } from "../src";
import { theme } from "@chocolatelibui/theme"
import { material_content_text_format_rounded } from "@chocolatelibui/icons"

document.body.appendChild(document.createElement('button')).onclick = () => { theme.set = 'light' };
document.body.appendChild(document.createElement('button')).onclick = () => { theme.set = 'dark' };

let test1 = document.body.appendChild(document.createElement('div'));
let test2 = document.body.appendChild(document.createElement('div'));
let test3 = document.body.appendChild(document.createElement('div'));
let test4 = document.body.appendChild(document.createElement('div'));

let testMenu = new Menu([
    new Option('Text for option 1', () => { console.warn('YOYO'); }),
    new Option('Text for option 2', () => { console.warn('YOYO'); }, material_content_text_format_rounded()),
    new Option('Text for option 3', () => { console.warn('YOYO'); }, material_content_text_format_rounded(), 'Shift + K'),
    new Option('Text for option 4', () => { console.warn('YOYO'); }, material_content_text_format_rounded(), undefined, true),
    new Option('Text for option 5', () => { console.warn('YOYO'); }, material_content_text_format_rounded(), 'Ctrl + G', true),
    new Option('Text for option 6', () => { console.warn('YOYO'); }, undefined, 'Shift + K'),
    new Option('Text for option 7', () => { console.warn('YOYO'); }, undefined, undefined, true),
    new Option('Text for option 8', () => { console.warn('YOYO'); }, undefined, 'Ctrl + G', true),
    new Option('Text for option 9 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('YOYO'); }),
    new Option('Text for option 10 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('YOYO'); }, material_content_text_format_rounded()),
    new Option('Text for option 11 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('YOYO'); }, undefined, 'Shift + K'),
    new Option('Text for option 12 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('YOYO'); }, undefined, undefined, true),
    new Devider(),
    new Option('Text for option 4', () => { console.warn('YOYO'); }),
    new Option('Text for option 4', () => { console.warn('YOYO'); }),
    new Submenu('Text for sub 1', new Menu([
        new Option('Text for option 1', () => { console.warn('YOYO'); }),
        new Option('Text for option 2', () => { console.warn('YOYO'); }, material_content_text_format_rounded()),
        new Option('Text for option 3', () => { console.warn('YOYO'); }, undefined, 'Test'),
        new Option('Text for option 4', () => { console.warn('YOYO'); }),])),
    new Option('Text for option 4', () => { console.warn('YOYO'); }),
    new Option('Text for option 4', () => { console.warn('YOYO'); }),
    new Option('Text for option 4', () => { console.warn('YOYO'); }),
    new Submenu('Text for sub 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', new Menu([
        new Option('Text for option 1', () => { console.warn('YOYO'); }),
        new Option('Text for option 2', () => { console.warn('YOYO'); }, material_content_text_format_rounded()),
        new Option('Text for option 3', () => { console.warn('YOYO'); }, undefined, 'Test'),
        new Option('Text for option 4', () => { console.warn('YOYO'); }),])),
    new Option('Text for option 4', () => { console.warn('YOYO'); }),
    new Option('Text for option 4', () => { console.warn('YOYO'); }),
]);

contextMenu.attachContexMenu(document.body, testMenu);
contextMenu.attachContexMenu(test1, testMenu);
contextMenu.attachContexMenu(test2, testMenu);
contextMenu.attachContexMenu(test3, testMenu);
contextMenu.attachContexMenu(test4, testMenu);