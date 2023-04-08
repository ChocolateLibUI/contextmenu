var ge=Object.defineProperty;var Se=(i,e,t)=>e in i?ge(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var f=(i,e,t)=>(Se(i,typeof e!="symbol"?e+"":e,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();class _e{constructor(e,t,s){this.type=e,this.target=t,this.data=s}}class se{constructor(e){this.eventHandler_ListenerStorage={},this.target=e}on(e,t){let s=this.eventHandler_ListenerStorage[e];return s?s.indexOf(t)==-1?s.push(t):console.warn("Subscriber already in handler"):this.eventHandler_ListenerStorage[e]=[t],t}once(e,t){return this.on(e,function(s){return t(s),!0}),t}off(e,t){let s=this.eventHandler_ListenerStorage[e];if(s){let n=s.indexOf(t);n!=-1?s.splice(n,1):console.warn("Subscriber not in handler")}return t}emit(e,t){let s=this.eventHandler_ListenerStorage[e];if(s&&s.length>0){let n=Object.freeze(new _e(e,this.target,t));s.length>1&&(s=[...s]);for(let r=0,o=s.length;r<o;r++)try{s[r](n)===!0&&(s.splice(r,1),o--,r--)}catch(a){console.warn("Failed while dispatching event",a)}}}clear(e){this.eventHandler_ListenerStorage[e]=[]}inUse(e){var t;return Boolean((t=this.eventHandler_ListenerStorage[e])==null?void 0:t.length)}has(e,t){var s;return Boolean(((s=this.eventHandler_ListenerStorage[e])==null?void 0:s.indexOf(t))!==-1)}amount(e){var t;return((t=this.eventHandler_ListenerStorage[e])==null?void 0:t.length)||0}}const xe=i=>{let e=new se(i);return e.target=i,{producer:e,consumer:e}};var ye=Object.defineProperty,Te=(i,e,t)=>e in i?ye(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,I=(i,e,t)=>(Te(i,typeof e!="symbol"?e+"":e,t),t);class Ee{constructor(e){I(this,"_documents"),I(this,"main"),I(this,"_events"),I(this,"events"),this.main=e,this._documents=[e],this.events=this._events=new se(this),this._events.target=this}forDocuments(e){for(let t=0;t<this._documents.length;t++)e(this._documents[t])}get documents(){return[...this._documents]}registerDocument(e,t){if(this._documents.includes(e))return console.warn("Document registered twice");if(this._documents.push(e),t){let s=this.main.head.children;for(let n=0;n<s.length;n++)switch(s[n].nodeName){case"LINK":if(s[n].rel!=="stylesheet")break;case"STYLE":e.head.appendChild(s[n].cloneNode(!0));break}}this._events.emit("added",e)}deregisterDocument(e){let t=this._documents.indexOf(e);if(t==-1)return console.warn("Document not registered");if(this._documents[t]===this.main)return console.warn("Main document cannot be removed");this._documents.splice(t,1),this._events.emit("removed",e)}}class ie{constructor(e,t,s,n){if(e!==void 0&&(this.min=e),t!==void 0&&(this.max=t),s!==void 0){this.step=s;const r=String(s).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);if(this.decimals=r?Math.max(0,(r[1]?r[1].length:0)-(r[2]?+r[2]:0)):0,n!==void 0){this.start=n;const o=String(n).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);this.decimals=Math.max(this.decimals,o?Math.max(0,(o[1]?o[1].length:0)-(o[2]?+o[2]:0)):0)}}}check(e){if("max"in this&&e>this.max)return e+" is bigger than the limit of "+this.max;if("min"in this&&e<this.min)return e+" is smaller than the limit of "+this.max}limit(e){var t,s;return this.step&&(this.start?e=parseFloat((Math.round((e-this.start+Number.EPSILON)/this.step)*this.step+this.start).toFixed(this.decimals)):e=parseFloat((Math.round((e+Number.EPSILON)/this.step)*this.step).toFixed(this.decimals))),Math.min((t=this.max)!=null?t:1/0,Math.max((s=this.min)!=null?s:-1/0,e))}}class V{constructor(){this._subscribers=[]}subscribe(e,t){if(this._subscribers.push(e),t)try{this.then(e)}catch{console.warn("Failed while calling update function",this,e)}return e}unsubscribe(e){const t=this._subscribers.indexOf(e);return t!=-1?this._subscribers.splice(t,1):console.warn("Subscriber not found with state",this,e),e}inUse(){return Boolean(this._subscribers.length)}hasSubscriber(e){return this._subscribers.includes(e)}_updateSubscribers(e){for(let t=0,s=this._subscribers.length;t<s;t++)try{this._subscribers[t](e)}catch(n){console.warn("Failed while calling subscribers ",n,this,this._subscribers[t])}}}class z extends V{constructor(e,t,s,n){super(),t&&(this._setter=t===!0?this.set:t),s&&(this._check=s),n&&(this._limit=n),this._value=e}async then(e){return await e(this._value)}write(e){this._setter&&this._value!==e&&this._setter(e,this)}check(e){return this._check?this._check(e):void 0}limit(e){return this._limit?this._limit(e):e}set(e){this._value=e,this._updateSubscribers(e)}}class Y extends V{constructor(e,t,s){super(),t&&(this._setter=t===!0?this.set:t),s&&(this._limit=s),this._value=e}async then(e){return await e(this._value)}write(e){this._setter&&this._value!==e&&(e=this._limit?this._limit.limit(e):e,this._value!==e&&this._setter(e,this))}check(e){return this._limit?this._limit.check(e):void 0}limit(e){return this._limit?this._limit.limit(e):e}set(e){this._value=e,this._updateSubscribers(e)}}class Me extends V{constructor(e,t,s){super(),t&&(this._setter=t===!0?this.set:t),s&&(this._limit=s),this._value=e}async then(e){return await e(this._value)}write(e){this._setter&&this._value!==e&&(e=this._limit?this._limit.limit(e):e,this._value!==e&&this._setter(e,this))}check(e){return this._limit?this._limit.check(e):void 0}limit(e){return this._limit?this._limit.limit(e):e}set(e){this._value=e,this._updateSubscribers(e)}}let Z={},ne=(i,e,t)=>(Z[i]=new G(i,e,t),Z[i]);class G{constructor(e,t,s){this.settings={},this.subGroups={},this.pathID=e,this.name=t,this.description=s}makeSubGroup(e,t,s){if(e in this.subGroups){console.warn("Sub group already registered "+e);return}return this.subGroups[e]=new G(this.pathID+"/"+e,t,s)}_addShared(e,t,s,n,r){let o=localStorage[this.pathID+"/"+e];o?r===!0?n.write(JSON.parse(o)):r?r(JSON.parse(o),n):s(JSON.parse(o)):t.then?n.then=async function(a){delete this.then;let d=await t;return r===!0?n.write(t):r?r(t,n):s(t),await a(d)}:r===!0?n.write(t):r?r(t,n):s(t),n.subscribe(a=>{localStorage[this.pathID+"/"+e]=JSON.stringify(a)},!o)}addState(e,t,s,n,r,o){if(e in this.settings)throw new Error("Settings already registered "+e);let a=this.settings[e]=new z(void 0,s,n,r);return this._addShared(e,t,a.set.bind(a),a,o),a}addNumber(e,t,s,n,r){if(e in this.settings)throw new Error("Settings already registered "+e);let o=this.settings[e]=new Y(void 0,s,n);return this._addShared(e,t,o.set.bind(o),o,r),o}addString(e,t,s,n,r){if(e in this.settings)throw new Error("Settings already registered "+e);let o=this.settings[e]=new Me(void 0,s,n);return this._addShared(e,t,o.set.bind(o),o,r),o}}let L=(i,e)=>{let t;return function(){return t||(t=new DOMParser().parseFromString(e,"image/svg+xml").firstChild,t.setAttribute("icon",i)),t.cloneNode(!0)}},g=L("material_content_text_format_rounded",'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"/></svg>'),oe=L("material_device_dark_mode_rounded",'<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"/></svg>'),re=L("material_device_light_mode_rounded",'<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><rect fill="none" height="24" width="24"/><path d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>'),De=L("material_navigation_chevron_right_rounded",'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/></svg>'),Ce=L("material_navigation_close_rounded",'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>');var ke=Object.defineProperty,Oe=(i,e,t)=>e in i?ke(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,u=(i,e,t)=>(Oe(i,typeof e!="symbol"?e+"":e,t),t),T=(i=>(i.Light="light",i.Dark="dark",i))(T||{});new z({light:{name:"Light",description:"Don't set touch mode automatically",icon:re},dark:{name:"Dark",description:"Change touch mode on first ui interaction",icon:oe}});var C=(i=>(i.THIN="thin",i.MEDIUM="medium",i.WIDE="wide",i))(C||{}),k=(i=>(i.ALL="all",i.MOST="most",i.SOME="some",i.NONE="none",i))(k||{}),q=(i=>(i.Off="off",i.OS="os",i))(q||{}),h=(i=>(i.MOUSE="mouse",i.PEN="pen",i.TOUCH="touch",i))(h||{}),A=(i=>(i.OFF="off",i.FIRST="first",i.EVERY="every",i))(A||{});let y=[],H={},X=ne("@chocolatelibui/theme","Theme/UI","Settings for UI elements and and color themes");const _=new ie(.5,4,.1);class Fe{constructor(e,t="",s="",n=""){u(this,"_handler"),u(this,"_listener"),u(this,"scrollbar"),u(this,"animations"),u(this,"theme"),u(this,"autoThemeMode"),u(this,"scale"),u(this,"_scale",0),u(this,"scaleMouse"),u(this,"scalePen"),u(this,"scaleTouch"),u(this,"inputMode"),u(this,"autoInputMode"),u(this,"textScale"),u(this,"textScaleMouse"),u(this,"textScalePen"),u(this,"textScaleTouch"),u(this,"_autoInputListenerEvery",o=>{switch(o.pointerType){case"mouse":this.inputMode.write(h.MOUSE);break;case"pen":this.inputMode.write(h.PEN);break;default:case"touch":this.inputMode.write(h.TOUCH);break}});let r=t?X.makeSubGroup(t,s,n):X;if(!r)throw new Error("Creating settings group for theme engine failed");this._handler=e,this.scrollbar=r.addState("scrollbar",C.THIN,(o,a)=>{this.applyScrollbar(o),a.set(o)}),this.animations=r.addState("animations",k.ALL,(o,a)=>{this.applyAnimation(o),a.set(o)}),this.theme=r.addState("theme",window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?T.Dark:T.Light,(o,a)=>{this.applyTheme(o),a.set(o)}),this.autoThemeMode=r.addState("autoTheme",q.OS,(o,a)=>{this.applyTheme(o),a.set(o)}),this.scaleMouse=r.addNumber("scaleMouse",1,async(o,a)=>{await this.inputMode===h.MOUSE?this.scale.write(o):a.set(o)},_),this.scalePen=r.addNumber("scalePen",1.2,async(o,a)=>{this.inputMode&&await this.inputMode===h.PEN?this.scale.write(o):a.set(o)},_),this.scaleTouch=r.addNumber("scaleTouch",1.6,async(o,a)=>{await this.inputMode===h.MOUSE?this.scale.write(o):a.set(o)},_),this.textScaleMouse=r.addNumber("textScaleMouse",1,async(o,a)=>{await this.inputMode===h.MOUSE?this.textScale.write(o):a.set(o)},_),this.textScalePen=r.addNumber("textScalePen",1.2,async(o,a)=>{await this.inputMode===h.MOUSE?this.textScale.write(o):a.set(o)},_),this.textScaleTouch=r.addNumber("textScaleTouch",1.6,async(o,a)=>{await this.inputMode===h.MOUSE?this.textScale.write(o):a.set(o)},_),this.scale=new Y(1,async(o,a)=>{switch(this._scale=o*16,this.applyScale(o),await this.inputMode){case h.MOUSE:this.scaleMouse.set(o);break;case h.PEN:this.scalePen.set(o);break;case h.TOUCH:this.scaleTouch.set(o);break}a.set(o)},_),this.textScale=new Y(1,async(o,a)=>{switch(a.set(o),this.applyTextScale(o),await this.inputMode){case h.MOUSE:this.textScaleMouse.set(o);break;case h.PEN:this.textScalePen.set(o);break;case h.TOUCH:this.textScaleTouch.set(o);break}},_),this.inputMode=r.addState("inputMode",h.MOUSE,async(o,a)=>{switch(o){case h.MOUSE:this.scale.write(await this.scaleMouse);break;case h.PEN:this.scale.write(await this.scalePen);break;case h.TOUCH:this.scale.write(await this.scaleTouch);break}this.applyInput(o),a.set(o)}),this.autoInputMode=r.addState("autoInputMode",A.EVERY,(o,a)=>{this.applyAutoInput(o),a.set(o)}),this._listener=this._handler.events.on("added",o=>{this.applyAllToDoc(o.data)}),e.forDocuments(o=>{this.applyAllToDoc(o)}),y.push(this)}destructor(){this._handler.events.off("added",this._listener);let e=y.indexOf(this);if(e==-1)return console.warn("Theme engine already destructed");y.splice(e,1)}async applyAllToDoc(e){this.applyScrollbarToDoc(e,await this.scrollbar),this.applyAnimationToDoc(e,await this.animations),this.applyThemeToDoc(e,await this.theme),this.applyAutoInputToDoc(e,await this.autoInputMode),this.applyInputToDoc(e,await this.inputMode),this.applyScaleToDoc(e,await this.scale),this.applyTextScaleToDoc(e,await this.textScale)}applyScrollbar(e){this._handler.forDocuments(t=>{this.applyScrollbarToDoc(t,e)})}applyScrollbarToDoc(e,t){e.documentElement.style.setProperty("--scrollbar",{[C.THIN]:"0.4rem",[C.MEDIUM]:"1rem",[C.WIDE]:"1.875rem"}[t])}applyAnimation(e){this._handler.forDocuments(t=>{this.applyAnimationToDoc(t,e)})}applyAnimationToDoc(e,t){switch(e.documentElement.classList.remove("anim-all","anim-most","anim-some"),t){case k.ALL:e.documentElement.classList.add("anim-all");case k.MOST:e.documentElement.classList.add("anim-most");case k.SOME:e.documentElement.classList.add("anim-some");break}}applyTheme(e){this._handler.forDocuments(t=>{this.applyThemeToDoc(t,e)})}applyThemeToDoc(e,t){for(const s in H)H[s].applyThemes(e.documentElement.style,t)}applyScale(e){this._handler.forDocuments(t=>{this.applyScaleToDoc(t,e)})}applyScaleToDoc(e,t){e.documentElement.style.fontSize=t*16+"px"}applyTextScale(e){this._handler.forDocuments(t=>{this.applyTextScaleToDoc(t,e)})}applyTextScaleToDoc(e,t){e.documentElement.style.setProperty("--textScale",String(t))}applyInput(e){this._handler.forDocuments(t=>{this.applyInputToDoc(t,e)})}applyInputToDoc(e,t){let s=e.documentElement.style;switch(s.setProperty("--mouse","0"),s.setProperty("--pen","0"),s.setProperty("--touch","0"),e.documentElement.classList.remove("mouse","pen","touch"),t){case h.MOUSE:s.setProperty("--mouse","1"),e.documentElement.classList.add("mouse");break;case h.PEN:s.setProperty("--pen","1"),e.documentElement.classList.add("pen");break;case h.TOUCH:s.setProperty("--touch","1"),e.documentElement.classList.add("touch");break}}applyAutoInput(e){this._handler.forDocuments(t=>{this.applyAutoInputToDoc(t,e)})}applyAutoInputToDoc(e,t){switch(e.documentElement.removeEventListener("pointerdown",this._autoInputListenerEvery,{capture:!0}),t){case A.FIRST:e.documentElement.addEventListener("pointerdown",this._autoInputListenerEvery,{capture:!0,once:!0});break;case A.EVERY:e.documentElement.addEventListener("pointerdown",this._autoInputListenerEvery,{capture:!0});break}}async applySingleProperty(e,t){let s=await this.theme;this._handler.forDocuments(n=>{n.documentElement.style.setProperty(e,t[s])})}remToPx(e){return e*this._scale}pxToRem(e){return e/this._scale}}window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",async i=>{for(let e=0;e<y.length;e++)await y[e].autoThemeMode===q.OS&&y[e].theme.set(i.matches?T.Dark:T.Light)});let Le=(i,e,t)=>(H[i]=new R(i,e,t),H[i]);class R{constructor(e,t,s){u(this,"pathID"),u(this,"variables",{}),u(this,"subGroups",{}),u(this,"name"),u(this,"description"),this.pathID=e,this.name=t,this.description=s}makeSubGroup(e,t,s){if(e in this.subGroups)throw new Error("Sub group already registered "+e);return this.subGroups[e]=new R(this.pathID+"/"+e,t,s)}makeVariable(e,t,s,n,r,o,a){if(e in this.variables)throw new Error("Settings already registered "+e);let d="--"+this.pathID+"/"+e,l=this.variables[d]={name:t,desc:s,vars:{[T.Light]:n,[T.Dark]:r}};for(let p=0;p<y.length;p++)y[p].applySingleProperty(d,l.vars)}applyThemes(e,t){for(const s in this.variables)e.setProperty(s,this.variables[s].vars[t]);for(const s in this.subGroups)this.subGroups[s].applyThemes(e,t)}}var O=(i=>(i.write="w",i.read="r",i.none="n",i))(O||{});class U extends HTMLElement{constructor(...e){super(),this.isVisible=!1;let t=xe(this);this._events=t.producer,this.events=t.consumer}static elementName(){return"@abstract@"}static elementNameSpace(){return"chocolatelibui-core"}connectedCallback(){if(this._events.emit("connect",0),this._connectStates&&this._connectSubscribers)for(let e=0;e<this._connectStates.length;e++)this._connectStates[e].subscribe(this._connectSubscribers[e],!0);this._observer?this._observer.observe(this):this._setVisible(!0)}disconnectedCallback(){if(this._events.emit("connect",1),this._connectStates&&this._connectSubscribers)for(let e=0;e<this._connectStates.length;e++)this._connectStates[e].unsubscribe(this._connectSubscribers[e]);this._observer&&(this._observer.unobserve(this),this._setVisible(!1))}adoptedCallback(){this._events.emit("connect",2)}_setVisible(e){if(this.isVisible!==e){if(this.isVisible=e,this._events.emit("visible",e),e){if(this._visibleStates&&this._visibleSubscribers)for(let t=0;t<this._visibleStates.length;t++)this._visibleStates[t].subscribe(this._visibleSubscribers[t],!0)}else if(this._visibleStates&&this._visibleSubscribers)for(let t=0;t<this._visibleStates.length;t++)this._visibleStates[t].unsubscribe(this._visibleSubscribers[t])}}options(e){return this.access=e.access,this}attachToObserver(e){e?(this.isConnected&&(this._observer&&this._observer.unobserve(this),e.observe(this)),this._observer=e):this._observer&&(this.isConnected&&this._observer.unobserve(this),this.isVisible||this._setVisible(!0),this._observer=void 0)}attachState(e,t,s){return s?(this._visibleStates||(this._visibleStates=[],this._visibleSubscribers=[]),this._visibleStates.push(e),this._visibleSubscribers.push(t),this.isVisible&&e.subscribe(t,!0),t):(this._connectStates||(this._connectStates=[],this._connectSubscribers=[]),this._connectStates.push(e),this._connectSubscribers.push(t),this.isConnected&&e.subscribe(t,!0),t)}dettachState(e,t){if(t){if(this._visibleSubscribers){let s=this._visibleSubscribers.indexOf(e);s===-1?console.warn("Function not registered with element",e,this):(this.isVisible&&this._visibleStates[s].unsubscribe(e),this._visibleStates.splice(s,1),this._visibleSubscribers.splice(s,1))}return}if(this._connectSubscribers){let s=this._connectSubscribers.indexOf(e);s===-1?console.warn("Function not registered with element",e,this):(this.isVisible&&this._connectStates[s].unsubscribe(e),this._connectStates.splice(s,1),this._connectSubscribers.splice(s,1))}}attachStateToProp(e,t,s){this._propStates||(this._propStates={}),this.dettachStateFromProp(e),this._propStates[e]=[this.attachState(t,n=>{this[e]=n},s),Boolean(s)]}dettachStateFromProp(e){this._propStates&&e in this._propStates&&this.dettachState(...this._propStates[e])}set access(e){switch(this._access=e,e){case O.write:this.inert=!1;break;case O.read:this.inert=!0;break;case O.none:this.setAttribute("inert","none");break}}get access(){var e;return(e=this._access)!=null?e:O.write}}const Ne=new Set(["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"]);var Pe=/^[a-z](?:[\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\x2D\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;let Ie=i=>i?/[A-Z]/.test(i)?"Custom element names must not contain uppercase ASCII characters.":i.includes("-")?/^\d/i.test(i)?"Custom element names must not start with a digit.":/^-/i.test(i)?"Custom element names must not start with a hyphen.":Pe.test(i)?Ne.has(i)?`The supplied element name is reserved and can't be used.
See: https://html.spec.whatwg.org/multipage/scripting.html#valid-custom-element-name`:"Unknown fault":"Invalid element name.":"Custom element names must contain a hyphen. Example: unicorn-cake":"Missing element name.",M=i=>{let e=i.elementNameSpace(),t=i.elementName,s="",n=i;for(;n!==HTMLElement&&e===n.elementNameSpace();){let r=n.elementName();if(n=Object.getPrototypeOf(n),t===n.elementName)throw new Error("Element uses same name as ancestor, abstract classes should return '@abstract@'");if(!r.length)throw new Error("Element doesn't define element name");r!=="@abstract@"&&(s="-"+r+s)}s=e+s;try{customElements.define(s,i)}catch(r){throw r.message.includes("has already been used with this registry")?r:new Error(Ie(s)+" "+s)}},ee={50:"#E3F2FD",100:"#BBDEFB",200:"#90CAF9",300:"#64B5F6",400:"#42A5F5",500:"#2196F3",600:"#1E88E5",700:"#1976D2",800:"#1565C0",900:"#0D47A1"},v={50:"#FAFAFA",100:"#F5F5F5",200:"#EEEEEE",300:"#E0E0E0",400:"#BDBDBD",500:"#9E9E9E",600:"#757575",700:"#616161",800:"#424242",900:"#212121"};const Ae="@chocolatelibui/contextmenu";let N=Le(Ae,"Context Menu","Right click or touch and hold context menu appearance");N.makeVariable("background","Background Color","Color of background",v[50],v[900],"Color",void 0);N.makeVariable("text","Text Color","Color of text",v[600],v[400],"Color",void 0);N.makeVariable("hover","Hover Color","Background color of line when hovering over it",ee[200],ee[900],"Color",void 0);N.makeVariable("hoverText","Text Color","Standard text color",v[900],v[50],"Color",void 0);N.makeVariable("border","Border Color","Color of border and deviders",v[300],v[800],"Color",void 0);class P extends U{static elementName(){return"@abstract@"}static elementNameSpace(){return"chocolatelibui-contextmenu"}focusNext(e){var t,s,n,r;e?this.previousElementSibling?this.previousElementSibling.focus({}):((t=this.parentElement)==null?void 0:t.lastElementChild)!==this&&((s=this.parentElement)==null?void 0:s.lastElementChild).focus({}):this.nextElementSibling?this.nextElementSibling.focus():((n=this.parentElement)==null?void 0:n.firstElementChild)!==this&&((r=this.parentElement)==null?void 0:r.firstElementChild).focus()}}class c extends P{constructor(t,s,n,r,o){super();f(this,"func");this.func=s,this.tabIndex=0;let a=this.appendChild(document.createElement("div"));a.className="icon",n&&a.appendChild(n);let d=this.appendChild(document.createElement("div"));d.innerHTML=t,d.className="text";let l=this.appendChild(document.createElement("div"));r&&(l.innerHTML=r),l.className="shortcut";let p=this.appendChild(document.createElement("div"));o&&(p.innerHTML="\u2713"),p.className="checkmark",this.onclick=m=>{m.stopPropagation(),this.func(),navigator==null||navigator.vibrate(25),this.parentElement.closeUp()},this.onkeydown=m=>{switch(m.code){case"Tab":case"ArrowUp":case"ArrowDown":this.focusNext(m.shiftKey||m.code==="ArrowUp");break;case"Enter":case"Space":this.func(),this.parentElement.closeUp();break;case"ArrowLeft":case"Escape":return}m.preventDefault(),m.stopPropagation()}}static elementName(){return"option"}}M(c);let He="99999999";class W extends U{constructor(t){super();f(this,"engine");f(this,"activeElementBuffer");this.engine=t,this.tabIndex=-1;let s=n=>{n.preventDefault(),n.stopPropagation()};this.oncontextmenu=s,this.onpointerdown=s,this.onpointerup=s,this.onpointercancel=s,this.onpointerenter=s,this.onpointerleave=s,this.onpointermove=s,this.onpointerout=s,this.onpointerout=s,this.onclick=s,this.style.zIndex=He}static elementName(){return"container"}static elementNameSpace(){return"chocolatelibui-contextmenu"}attachMenu(t){return t.container=this,this.activeElementBuffer=this.ownerDocument.activeElement,this.replaceChildren(t),t}closeUp(t){this.activeElementBuffer?(this.activeElementBuffer.focus(),this.ownerDocument.activeElement!==this.activeElementBuffer&&this.focus(),this.activeElementBuffer=void 0):this.focus(),this.removeChild(t)}}M(W);var Ue=Object.defineProperty,Be=(i,e,t)=>e in i?Ue(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,D=(i,e,t)=>(Be(i,typeof e!="symbol"?e+"":e,t),t),ae=(i=>(i.Off="off",i.OS="os",i))(ae||{}),E=(i=>(i.Light="light",i.Dark="dark",i))(E||{});let F=[],te={};new z({[E.Light]:{name:"Light",description:"Don't set touch mode automatically",icon:re},[E.Dark]:{name:"Dark",description:"Change touch mode on first ui interaction",icon:oe}});ne("@chocolatelibui/theme","Theme/UI","Settings for UI elements and and color themes");new ie(.5,4,.1);window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",async i=>{for(let e=0;e<F.length;e++)await F[e].autoThemeMode===ae.OS&&F[e].theme.set(i.matches?E.Dark:E.Light)});let Ye=(i,e,t)=>(te[i]=new K(i,e,t),te[i]);class K{constructor(e,t,s){D(this,"pathID"),D(this,"variables",{}),D(this,"subGroups",{}),D(this,"name"),D(this,"description"),this.pathID=e,this.name=t,this.description=s}makeSubGroup(e,t,s){if(e in this.subGroups)throw new Error("Sub group already registered "+e);return this.subGroups[e]=new K(this.pathID+"/"+e,t,s)}makeVariable(e,t,s,n,r,o,a){if(e in this.variables)throw new Error("Settings already registered "+e);let d="--"+this.pathID+"/"+e,l=this.variables[d]={name:t,desc:s,vars:{[E.Light]:n,[E.Dark]:r}};for(let p=0;p<F.length;p++)F[p].applySingleProperty(d,l.vars)}applyThemes(e,t){for(const s in this.variables)e.setProperty(s,this.variables[s].vars[t]);for(const s in this.subGroups)this.subGroups[s].applyThemes(e,t)}}let $e="http://www.w3.org/2000/svg",w=(i,e,t)=>{let s=document.createElementNS($e,"circle");return s.setAttribute("cx",String(i)),s.setAttribute("cy",String(e)),s.setAttribute("r",String(t)),s};const Ve="@chocolatelibui/spinners";let ze=Ye(Ve,"Spinner","Spinner used as a placeholder for data with and unknown arrival time");ze.makeVariable("color","Dot color","Color of dots in spinner",v[700],v[300],"Color",void 0);let b=document.createElementNS("http://www.w3.org/2000/svg","svg");b.setAttribute("viewBox","0 0 64 64");b.appendChild(w(32,6,0));b.appendChild(w(45,9.483,0));b.appendChild(w(54.516,19,0));b.appendChild(w(58,32,0));b.appendChild(w(54.516,45,0));b.appendChild(w(45,54.516,0));b.appendChild(w(32,58,0));b.appendChild(w(19,54.516,0));b.appendChild(w(9.483,45,0));b.appendChild(w(6,32,0));b.appendChild(w(9.483,19,0));b.appendChild(w(19,9.483,0));class ce extends U{static elementName(){return"dots"}static elementNameSpace(){return"chocolatelibui-spinner"}constructor(){super(),this.appendChild(b.cloneNode(!0))}}M(ce);class le extends P{static elementName(){return"buffer"}constructor(){super(),this.appendChild(new ce)}focus(e){this.focusNext(e)}}M(le);class Q extends U{constructor(t){super();f(this,"container");f(this,"submenu");f(this,"closer");f(this,"x");f(this,"y");f(this,"element");let s=typeof t=="function"?t():t;if(s instanceof Promise){let n=this.appendChild(new le);s.then(r=>{n.remove(),this.lines=r,this.setPosition(this.x,this.y,this.element)})}else this.lines=s;this.tabIndex=0,this.onblur=n=>{n.preventDefault(),n.stopPropagation(),n.relatedTarget||this.closeUp()},this.onscroll=()=>{this.closeDown()},this.onkeydown=n=>{switch(n.code){case"Tab":case"ArrowUp":case"ArrowDown":this.focusNext(n.shiftKey||n.code==="ArrowUp");break;case"ArrowLeft":this.parentElement instanceof W||(this.parentElement.focus(),this.parentElement.closeDown());break;case"Escape":this.closeUp();break}n.preventDefault(),n.stopPropagation()}}static elementName(){return"menu"}static elementNameSpace(){return"chocolatelibui-contextmenu"}set lines(t){this.replaceChildren(),this.closer&&this.appendChild(this.closer);for(let s=0;s<t.length;s++){let n=t[s],r=typeof n=="function"?n():n;this.appendChild(r)}}focusNext(t){var s,n;t?(s=this.lastChild)==null||s.focus():(n=this.firstChild)==null||n.focus({})}get fullscreen(){return Boolean(this.closer)}set fullscreen(t){t?(this.classList.add("fullscreen"),this.closer||(this.closer=new c("Close",()=>{},Ce()),this.closer.onclick=s=>{s.stopPropagation(),this.parentElement instanceof x?this.parentElement.closeDown():this.closeUp()},this.prepend(this.closer))):(this.classList.remove("fullscreen"),this.closer&&(this.closer.remove(),delete this.closer))}closeDown(){this.submenu&&this.submenu.closeDown(),this.submenu=void 0}closeUp(){this.closeDown(),this.parentElement.closeUp(this)}setPosition(t=0,s=0,n){var J;this.x=t,this.y=s,this.element=n;let r=this.getBoundingClientRect(),o=this.ownerDocument.defaultView,a=NaN,d=NaN,l=NaN,p=NaN;if(o){if(n){var m=n.getBoundingClientRect();m.x+m.width+r.width>o.innerWidth?(t=m.x,r.width<t?p=o.innerWidth-t:p=o.innerWidth-(m.x+m.width)):t=m.x+m.width,s=m.y+m.height,s+r.height>=o.innerHeight?s>=r.height?d=o.innerHeight-m.y:a=o.innerHeight-r.height:a=s}else s+r.height>=o.innerHeight?s>=r.height?d=o.innerHeight-s:a=o.innerHeight-r.height:a=s,r.width>=o.innerWidth?p=0:t+r.width>=o.innerWidth?t>=r.width?p=o.innerWidth-t:l=o.innerWidth-r.width:l=t;this.fullscreen=r.height>=o.innerHeight-(((J=this.container)==null?void 0:J.engine.themeEngine.remToPx(4))||64)||r.width===o.innerWidth}else a=0,l=0;this.style.top=a===a?a+"px":"",this.style.bottom=d===d?d+"px":"",this.style.left=l===l?l+"px":"",this.style.right=p===p?p+"px":"",this.focus()}}M(Q);class x extends P{constructor(t,s,n){super();f(this,"menu");f(this,"isOpen");f(this,"hoverTime");f(this,"blockTime");this.menu=new Q(s),this.tabIndex=0;let r=this.appendChild(document.createElement("div"));r.className="icon",n&&r.appendChild(n);let o=this.appendChild(document.createElement("div"));o.innerHTML=t,o.className="text";let a=this.appendChild(document.createElement("div"));a.className="shortcut";let d=this.appendChild(document.createElement("div"));d.appendChild(De()),d.className="chevron",this.onclick=l=>{l.stopPropagation(),this.blockTime||(navigator==null||navigator.vibrate(25),this.isOpen?this.closeDown():this.open())},this.onpointerenter=l=>{l.pointerType!=="touch"&&!this.isOpen&&(this.hoverTime=setTimeout(()=>{this.open(),this.blockTime=setTimeout(()=>{this.blockTime=0},500)},300))},this.onpointerleave=()=>{clearTimeout(this.hoverTime)},this.onkeydown=l=>{switch(l.code){case"Tab":case"ArrowUp":case"ArrowDown":this.focusNext(l.shiftKey||l.code==="ArrowUp");break;case"ArrowRight":case"Enter":case"Space":this.open(),this.menu.focusNext(!1);break;case"ArrowLeft":case"Escape":return}l.preventDefault(),l.stopPropagation()}}static elementName(){return"submenu"}open(){this.parentElement.submenu&&this.parentElement.submenu.closeDown(),this.parentElement.submenu=this,this.appendChild(this.menu),this.menu.setPosition(0,0,this),this.isOpen=!0}close(){this.focus(),this.parentElement.submenu=void 0,this.removeChild(this.menu),this.isOpen=!1}closeDown(){this.menu.closeDown(),this.close()}closeUp(){this.close(),this.parentElement.closeUp()}}M(x);class B extends P{static elementName(){return"devider"}focus(e){this.focusNext(e)}}M(B);let $=async i=>{let e=typeof i=="function"?i():i;if(e instanceof Promise){let t=await e;return $(t)}else{let t=[];for(let s=0;s<e.length;s++){let n=e[s],r=typeof n=="function"?n():n;typeof r=="number"?t.push(new B):r instanceof P?t.push(r):r.action?t.push(new c(r.text,r.action,r.icon,r.shortcut,r.checkmark)):r.lines?t.push(new x(r.text,$(r.lines),r.icon)):console.warn("Invalid option passed, missing either action or lines option",n)}return t}};class Ge{constructor(e,t){f(this,"handler");f(this,"themeEngine");f(this,"_listener");f(this,"defaultMenu");this.handler=e,this.themeEngine=t,this._listener=this.handler.events.on("added",s=>{this.applyToDoc(s.data)}),e.forDocuments(s=>{this.applyToDoc(s)})}destructor(){this.handler.events.off("added",this._listener)}applyToDoc(e){let t=new W(this);e["@chocolatelibui/contextmenu"]=t,e.documentElement.appendChild(t),this.defaultMenu&&this.attachContexMenu(e.documentElement,this.defaultMenu)}attachContexMenu(e,t){if(e["@chocolatelibui/contextmenu"])console.warn("Context menu already attached to node",e);else{if(t){var s=n=>{n.preventDefault(),n.stopPropagation(),this.summonContexMenu(t,e,n.clientX,n.clientY)};e.addEventListener("contextmenu",s)}else{var s=r=>{r.preventDefault(),r.stopPropagation()};e.addEventListener("contextmenu",s)}e["@chocolatelibui/contextmenu"]=s}}dettachContexMenu(e){e["@chocolatelibui/contextmenu"]?(e.removeEventListener("contextmenu",e["@chocolatelibui/contextmenu"]),delete e["@chocolatelibui/contextmenu"]):console.warn("No context menu registered with node",e)}async summonContexMenu(e,t,s,n,r){let o=t?t.ownerDocument["@chocolatelibui/contextmenu"]:this.handler.main["@chocolatelibui/contextmenu"];if(o){if(typeof s!="number"||typeof n!="number")if(t){let a=t.getBoundingClientRect();s=a.left+a.width/2,n=a.top+a.height/2}else s=0,n=0;o.attachMenu(new Q(e)).setPosition(s,n,r?t:void 0)}else console.warn("No context menu container available")}defaultContextMenu(e){this.defaultMenu&&this.handler.forDocuments(t=>{this.dettachContexMenu(t.body)}),e===!1||e===!0?this.defaultMenu=void 0:e&&(this.defaultMenu=e),this.handler.forDocuments(t=>{this.attachContexMenu(t.body,this.defaultMenu)})}}let he=new Ee(document),qe=new Fe(he),S=new Ge(he,qe),Re=document.body.appendChild(document.createElement("button"));Re.innerHTML="Open Window";let ue=document.body.appendChild(document.createElement("div"));ue.innerHTML="Big Menu";let de=document.body.appendChild(document.createElement("div"));de.innerHTML="Empty Menu";let pe=document.body.appendChild(document.createElement("div"));pe.innerHTML="Single Devider";let me=document.body.appendChild(document.createElement("div"));me.innerHTML="Async Menu";let fe=document.body.appendChild(document.createElement("div"));fe.innerHTML="Generator Function";let be=document.body.appendChild(document.createElement("div"));be.innerHTML="Generator Function Mix";let we=document.body.appendChild(document.createElement("div"));we.innerHTML="Generator Function Async";let ve=[new c("Text for option 1",()=>{console.warn("1")}),new c("Text for option 2",()=>{console.warn("2")},g()),new c("Text for option 3",()=>{console.warn("3")},g(),"Shift + K"),new c("Text for option 4",()=>{console.warn("4")},g(),void 0,!0),new x("Text for sub 1",[new c("Text for option 1",()=>{console.warn("1_1")}),new c("Text for option 2",()=>{console.warn("1_2")},g()),new c("Text for option 3",()=>{console.warn("1_3")},void 0,"Test"),new c("Text for option 4",()=>{console.warn("1_4")}),new x("Text for sub 1",[new c("Text for option 1",()=>{console.warn("1_1_1")}),new c("Text for option 2",()=>{console.warn("1_1_2")},g()),new c("Text for option 3",()=>{console.warn("1_1_3")},void 0,"Test"),new c("Text for option 4",()=>{console.warn("1_1_4")})])]),new c("Text for option 5",()=>{console.warn("5")},g(),"Ctrl + G",!0),new c("Text for option 6",()=>{console.warn("6")},void 0,"Shift + K"),new c("Text for option 7",()=>{console.warn("7")},void 0,void 0,!0),new c("Text for option 8",()=>{console.warn("8")},void 0,"Ctrl + G",!0),new c("Text for option 9 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",()=>{console.warn("9")}),new c("Text for option 10 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",()=>{console.warn("10")},g()),new c("Text for option 11 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",()=>{console.warn("11")},void 0,"Shift + K"),new c("Text for option 12 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",()=>{console.warn("12")},void 0,void 0,!0),new B,new c("Text for option 13",()=>{console.warn("13")}),new c("Text for option 14",()=>{console.warn("14")}),new x("Text for sub 1",[new c("Text for option 1",()=>{console.warn("YOYO")}),new c("Text for option 2",()=>{console.warn("YOYO")},g()),new c("Text for option 3",()=>{console.warn("YOYO")},void 0,"Test"),new c("Text for option 4",()=>{console.warn("YOYO")})]),new c("Text for option 4",()=>{console.warn("YOYO")}),new c("Text for option 4",()=>{console.warn("YOYO")}),new c("Text for option 4",()=>{console.warn("YOYO")}),new x("Text for sub 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",[new c("Text for option 1",()=>{console.warn("YOYO")}),new c("Text for option 2",()=>{console.warn("YOYO")},g()),new c("Text for option 3",()=>{console.warn("YOYO")},void 0,"Test"),new c("Text for option 4",()=>{console.warn("YOYO")})]),new c("Text for option 4",()=>{console.warn("YOYO")}),new c("Text for option 4",()=>{console.warn("YOYO")})],We=[],j=[new B];S.defaultContextMenu([]);S.defaultContextMenu(ve);S.attachContexMenu(ue,ve);S.attachContexMenu(de,We);S.attachContexMenu(pe,j);S.attachContexMenu(me,async()=>(await new Promise(i=>{setTimeout(i,1e3)}),[new c("Test1",()=>{}),new c("Text for option 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",()=>{}),new c("Test3",()=>{}),new c("Test4",()=>{}),new x("Text for sub 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",async()=>(await new Promise(i=>{setTimeout(i,2e3)}),[new c("Test1",()=>{}),new c("Text for option 2 Praesent ut elementum sapien. Fusce posuere ac libero ac consequat. Quisque rhoncus tellus at orci pretium suscipit. Sed accumsan cursus.",()=>{}),new c("Test3",()=>{}),new c("Test4",()=>{})]))]));S.attachContexMenu(fe,$([{text:"Test 1",action(){console.warn("Test1")}},0,{text:"SubMenu 1",lines:[{text:"Test 1_1",action(){console.warn("Test1_1")}}]}]));S.attachContexMenu(be,j);S.attachContexMenu(we,j);