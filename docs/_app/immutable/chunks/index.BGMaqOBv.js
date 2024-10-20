var j=Object.defineProperty;var z=(e,t,n)=>t in e?j(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var d=(e,t,n)=>(z(e,typeof t!="symbol"?t+"":t,n),n);import{r as y,n as v,h as A,j as R,i as L,k as W,l as E,m as q,p as G,q as S,v as O,w as F,x as J}from"./scheduler.iXrG7Hdt.js";let g=!1;function K(){g=!0}function U(){g=!1}function V(e,t,n,i){for(;e<t;){const s=e+(t-e>>1);n(s)<=i?e=s+1:t=s}return e}function k(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const o=[];for(let l=0;l<t.length;l++){const f=t[l];f.claim_order!==void 0&&o.push(f)}t=o}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let s=0;for(let o=0;o<t.length;o++){const l=t[o].claim_order,f=(s>0&&t[n[s]].claim_order<=l?s+1:V(1,s,m=>t[n[m]].claim_order,l))-1;i[o]=n[f]+1;const u=f+1;n[u]=o,s=Math.max(u,s)}const c=[],r=[];let a=t.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(t[o-1]);a>=o;a--)r.push(t[a]);a--}for(;a>=0;a--)r.push(t[a]);c.reverse(),r.sort((o,l)=>o.claim_order-l.claim_order);for(let o=0,l=0;o<r.length;o++){for(;l<c.length&&r[o].claim_order>=c[l].claim_order;)l++;const f=l<c.length?c[l]:null;e.insertBefore(r[o],f)}}function M(e,t){e.appendChild(t)}function Q(e){if(!e)return document;const t=e.getRootNode?e.getRootNode():e.ownerDocument;return t&&t.host?t:e.ownerDocument}function de(e){const t=x("style");return t.textContent="/* empty */",X(Q(e),t),t.sheet}function X(e,t){return M(e.head||e,t),t.sheet}function Y(e,t){if(g){for(k(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function Z(e,t,n){e.insertBefore(t,n||null)}function ee(e,t,n){g&&!n?Y(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function h(e){e.parentNode&&e.parentNode.removeChild(e)}function _e(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function x(e){return document.createElement(e)}function D(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function N(e){return document.createTextNode(e)}function he(){return N(" ")}function me(){return N("")}function C(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function pe(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function $e(e){return e.dataset.svelteH}function te(e){return Array.from(e.childNodes)}function B(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function I(e,t,n,i,s=!1){B(e);const c=(()=>{for(let r=e.claim_info.last_index;r<e.length;r++){const a=e[r];if(t(a)){const o=n(a);return o===void 0?e.splice(r,1):e[r]=o,s||(e.claim_info.last_index=r),a}}for(let r=e.claim_info.last_index-1;r>=0;r--){const a=e[r];if(t(a)){const o=n(a);return o===void 0?e.splice(r,1):e[r]=o,s?o===void 0&&e.claim_info.last_index--:e.claim_info.last_index=r,a}}return i()})();return c.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,c}function P(e,t,n,i){return I(e,s=>s.nodeName===t,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const a=s.attributes[r];n[a.name]||c.push(a.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(t))}function ye(e,t,n){return P(e,t,n,x)}function ge(e,t,n){return P(e,t,n,D)}function ne(e,t){return I(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>N(t),!0)}function xe(e){return ne(e," ")}function H(e,t,n){for(let i=n;i<e.length;i+=1){const s=e[i];if(s.nodeType===8&&s.textContent.trim()===t)return i}return-1}function we(e,t){const n=H(e,"HTML_TAG_START",0),i=H(e,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new w(t);B(e);const s=e.splice(n,i-n+1);h(s[0]),h(s[s.length-1]);const c=s.slice(1,s.length-1);if(c.length===0)return new w(t);for(const r of c)r.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1;return new w(t,c)}function ve(e,t){t=""+t,e.data!==t&&(e.data=t)}function Ne(e,t){e.value=t??""}function be(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function Te(e,t,n){for(let i=0;i<e.options.length;i+=1){const s=e.options[i];if(s.__value===t){s.selected=!0;return}}(!n||t!==void 0)&&(e.selectedIndex=-1)}function Ae(e){const t=e.querySelector(":checked");return t&&t.__value}let p;function ie(){if(p===void 0){p=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{p=!0}}return p}function Ee(e,t){getComputedStyle(e).position==="static"&&(e.style.position="relative");const i=x("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=ie();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=C(window,"message",r=>{r.source===i.contentWindow&&t()})):(i.src="about:blank",i.onload=()=>{c=C(i.contentWindow,"resize",t),t()}),M(e,i),()=>{(s||c&&i.contentWindow)&&c(),h(i)}}function Se(e,t,n){e.classList.toggle(t,!!n)}function Ce(e,t){const n=[];let i=0;for(const s of t.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${e}_END`?(i-=1,n.push(s)):c===`HEAD_${e}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class se{constructor(t=!1){d(this,"is_svg",!1);d(this,"e");d(this,"n");d(this,"t");d(this,"a");this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,n,i=null){this.e||(this.is_svg?this.e=D(n.nodeName):this.e=x(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(t)),this.i(i)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)Z(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(h)}}class w extends se{constructor(n=!1,i){super(n);d(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)ee(this.t,this.n[i],n)}}function He(e,t){return new e(t)}const $=new Set;let _;function Le(){_={r:0,c:[],p:_}}function Me(){_.r||y(_.c),_=_.p}function re(e,t){e&&e.i&&($.delete(e),e.i(t))}function De(e,t,n,i){if(e&&e.o){if($.has(e))return;$.add(e),_.c.push(()=>{$.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function Be(e,t,n){const i=e.$$.props[t];i!==void 0&&(e.$$.bound[i]=n,n(e.$$.ctx[i]))}function Ie(e){e&&e.c()}function Pe(e,t){e&&e.l(t)}function oe(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),E(()=>{const c=e.$$.on_mount.map(O).filter(L);e.$$.on_destroy?e.$$.on_destroy.push(...c):y(c),e.$$.on_mount=[]}),s.forEach(E)}function le(e,t){const n=e.$$;n.fragment!==null&&(q(n.after_update),y(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ce(e,t){e.$$.dirty[0]===-1&&(F.push(e),J(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function je(e,t,n,i,s,c,r=null,a=[-1]){const o=G;S(e);const l=e.$$={fragment:null,ctx:[],props:c,update:v,not_equal:s,bound:A(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(o?o.$$.context:[])),callbacks:A(),dirty:a,skip_bound:!1,root:t.target||o.$$.root};r&&r(l.root);let f=!1;if(l.ctx=n?n(e,t.props||{},(u,m,...b)=>{const T=b.length?b[0]:m;return l.ctx&&s(l.ctx[u],l.ctx[u]=T)&&(!l.skip_bound&&l.bound[u]&&l.bound[u](T),f&&ce(e,u)),m}):[],l.update(),f=!0,y(l.before_update),l.fragment=i?i(l.ctx):!1,t.target){if(t.hydrate){K();const u=te(t.target);l.fragment&&l.fragment.l(u),u.forEach(h)}else l.fragment&&l.fragment.c();t.intro&&re(e.$$.fragment),oe(e,t.target,t.anchor),U(),R()}S(o)}class ze{constructor(){d(this,"$$");d(this,"$$set")}$destroy(){le(this,1),this.$destroy=v}$on(t,n){if(!L(n))return v;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!W(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ae="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ae);export{de as A,Ce as B,_e as C,Ee as D,D as E,ge as F,$e as G,w as H,C as I,Se as J,Be as K,Te as L,Ne as M,Ae as N,ze as S,te as a,ne as b,ye as c,h as d,x as e,ee as f,Y as g,he as h,je as i,me as j,xe as k,De as l,Me as m,re as n,pe as o,be as p,Le as q,He as r,ve as s,N as t,Ie as u,Pe as v,oe as w,le as x,we as y,Q as z};
