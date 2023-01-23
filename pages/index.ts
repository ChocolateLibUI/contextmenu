import "./index.scss"
import * as contextMenu from "../src"
import { theme } from "@chocolatelibui/theme"
import { material_content_text_format_rounded } from "@chocolatelibui/icons"
import { deregisterDocument, registerDocument } from "@chocolatelibui/document";

document.body.appendChild(document.createElement('button')).onclick = () => { theme.set = 'light' };
document.body.appendChild(document.createElement('button')).onclick = () => { theme.set = 'dark' };

let testButt = document.body.appendChild(document.createElement('button'))
testButt.innerHTML = 'Open Window'
testButt.onclick = () => {
    let wind = window.open('', '', "popup")
    registerDocument(wind!.document, true);
    wind?.addEventListener('unload', () => {
        deregisterDocument(wind!.document);
    })
}

let test1 = document.body.appendChild(document.createElement('div'));
test1.innerHTML = 'Big Menu';
let test2 = document.body.appendChild(document.createElement('div'));
test2.innerHTML = 'Empty Menu';
let test3 = document.body.appendChild(document.createElement('div'));
test3.innerHTML = 'Single Devider';
let test4 = document.body.appendChild(document.createElement('div'));
test4.innerHTML = 'Async Menu';


let testLines = [
    new contextMenu.Option('Text for option 1', () => { console.warn('1'); }),
    new contextMenu.Option('Text for option 2', () => { console.warn('2'); }, material_content_text_format_rounded()),
    new contextMenu.Option('Text for option 3', () => { console.warn('3'); }, material_content_text_format_rounded(), 'Shift + K'),
    new contextMenu.Option('Text for option 4', () => { console.warn('4'); }, material_content_text_format_rounded(), undefined, true),
    new contextMenu.Submenu('Text for sub 1', new contextMenu.Menu([
        new contextMenu.Option('Text for option 1', () => { console.warn('1_1'); }),
        new contextMenu.Option('Text for option 2', () => { console.warn('1_2'); }, material_content_text_format_rounded()),
        new contextMenu.Option('Text for option 3', () => { console.warn('1_3'); }, undefined, 'Test'),
        new contextMenu.Option('Text for option 4', () => { console.warn('1_4'); }),
        new contextMenu.Submenu('Text for sub 1', new contextMenu.Menu([
            new contextMenu.Option('Text for option 1', () => { console.warn('1_1_1'); }),
            new contextMenu.Option('Text for option 2', () => { console.warn('1_1_2'); }, material_content_text_format_rounded()),
            new contextMenu.Option('Text for option 3', () => { console.warn('1_1_3'); }, undefined, 'Test'),
            new contextMenu.Option('Text for option 4', () => { console.warn('1_1_4'); }),
        ])),
    ])),
    new contextMenu.Option('Text for option 5', () => { console.warn('5'); }, material_content_text_format_rounded(), 'Ctrl + G', true),
    new contextMenu.Option('Text for option 6', () => { console.warn('6'); }, undefined, 'Shift + K'),
    new contextMenu.Option('Text for option 7', () => { console.warn('7'); }, undefined, undefined, true),
    new contextMenu.Option('Text for option 8', () => { console.warn('8'); }, undefined, 'Ctrl + G', true),
    new contextMenu.Option('Text for option 9 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('9'); }),
    new contextMenu.Option('Text for option 10 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('10'); }, material_content_text_format_rounded()),
    new contextMenu.Option('Text for option 11 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('11'); }, undefined, 'Shift + K'),
    new contextMenu.Option('Text for option 12 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { console.warn('12'); }, undefined, undefined, true),
    new contextMenu.Devider(),
    new contextMenu.Option('Text for option 13', () => { console.warn('13'); }),
    new contextMenu.Option('Text for option 14', () => { console.warn('14'); }),
    new contextMenu.Submenu('Text for sub 1', new contextMenu.Menu([
        new contextMenu.Option('Text for option 1', () => { console.warn('YOYO'); }),
        new contextMenu.Option('Text for option 2', () => { console.warn('YOYO'); }, material_content_text_format_rounded()),
        new contextMenu.Option('Text for option 3', () => { console.warn('YOYO'); }, undefined, 'Test'),
        new contextMenu.Option('Text for option 4', () => { console.warn('YOYO'); }),
    ])),
    new contextMenu.Option('Text for option 4', () => { console.warn('YOYO'); }),
    new contextMenu.Option('Text for option 4', () => { console.warn('YOYO'); }),
    new contextMenu.Option('Text for option 4', () => { console.warn('YOYO'); }),
    new contextMenu.Submenu('Text for sub 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', new contextMenu.Menu([
        new contextMenu.Option('Text for option 1', () => { console.warn('YOYO'); }),
        new contextMenu.Option('Text for option 2', () => { console.warn('YOYO'); }, material_content_text_format_rounded()),
        new contextMenu.Option('Text for option 3', () => { console.warn('YOYO'); }, undefined, 'Test'),
        new contextMenu.Option('Text for option 4', () => { console.warn('YOYO'); }),
    ])),
    new contextMenu.Option('Text for option 4', () => { console.warn('YOYO'); }),
    new contextMenu.Option('Text for option 4', () => { console.warn('YOYO'); }),
];
let testMenu2 = [];
let testMenu3 = [new contextMenu.Devider(),];

contextMenu.defaultContextMenu([]);
contextMenu.defaultContextMenu(testLines);


contextMenu.attachContexMenu(test1, testLines);
contextMenu.attachContexMenu(test2, testMenu2);
contextMenu.attachContexMenu(test3, testMenu3);
contextMenu.attachContexMenu(test4, async () => {
    await new Promise((a) => { setTimeout(a, 1000) });
    return [
        new contextMenu.Option('Test1', () => { }),
        new contextMenu.Option('Text for option 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { }),
        new contextMenu.Option('Test3', () => { }),
        new contextMenu.Option('Test4', () => { }),
        new contextMenu.Submenu('Text for sub 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', new contextMenu.Menu(async () => {
            await new Promise((a) => { setTimeout(a, 2000) });
            return [
                new contextMenu.Option('Test1', () => { }),
                new contextMenu.Option('Text for option 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.', () => { }),
                new contextMenu.Option('Test3', () => { }),
                new contextMenu.Option('Test4', () => { }),
            ]
        }))
    ];
});
