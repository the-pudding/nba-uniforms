import{s as q,l as le,Y as F,Z as Xe,z as X,_ as Ye,b as T,f as m,$ as he,g as j,h as P,u as ie,q as re,v as se,W as te,a0 as We,a1 as ee,e as N,c as W,p as b,n as x,t as ae,m as J,d as ce,o as Q,a2 as K,j as rt,k as $,B as Ze,F as st,K as Je,C as D,V as ke,i as ye,r as ot,a3 as ft,a4 as ut,a5 as at,D as de,U as ct,a6 as ht,a7 as dt,H as _t,w as mt,a8 as gt}from"../chunks/scheduler.B7GMGcOE.js";import{S as R,i as U,t as v,b as E,c as L,a as M,m as V,d as B,g as _e,e as me,f as bt}from"../chunks/index.RTPVtebj.js";import{e as H}from"../chunks/each.DqlaF5V0.js";import{r as wt,w as ne}from"../chunks/index.Dmr6e_P_.js";function ge(n,e){const l={},t={},i={$$scope:1};let s=n.length;for(;s--;){const r=n[s],o=e[s];if(o){for(const f in r)f in o||(t[f]=1);for(const f in o)i[f]||(l[f]=o[f],i[f]=1);n[s]=o}else for(const f in r)i[f]=1}for(const r in t)r in l||(l[r]=void 0);return l}function Qe(n){return typeof n=="object"&&n!==null?n:{}}/**
 * @license lucide-svelte v0.358.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},Ae=vt;function Ce(n,e,l){const t=n.slice();return t[10]=e[l][0],t[11]=e[l][1],t}function we(n){let e,l=[n[11]],t={};for(let i=0;i<l.length;i+=1)t=F(t,l[i]);return{c(){e=Xe(n[10]),this.h()},l(i){e=Ye(i,n[10],{}),T(e).forEach(m),this.h()},h(){he(e,t)},m(i,s){j(i,e,s)},p(i,s){he(e,t=ge(l,[s&32&&i[11]]))},d(i){i&&m(e)}}}function Oe(n){let e=n[10],l,t=n[10]&&we(n);return{c(){t&&t.c(),l=X()},l(i){t&&t.l(i),l=X()},m(i,s){t&&t.m(i,s),j(i,l,s)},p(i,s){i[10]?e?q(e,i[10])?(t.d(1),t=we(i),e=i[10],t.c(),t.m(l.parentNode,l)):t.p(i,s):(t=we(i),e=i[10],t.c(),t.m(l.parentNode,l)):e&&(t.d(1),t=null,e=i[10])},d(i){i&&m(l),t&&t.d(i)}}}function kt(n){let e,l,t,i,s,r=H(n[5]),o=[];for(let h=0;h<r.length;h+=1)o[h]=Oe(Ce(n,r,h));const f=n[9].default,a=le(f,n,n[8],null);let u=[Ae,n[6],{width:n[2]},{height:n[2]},{stroke:n[1]},{"stroke-width":t=n[4]?Number(n[3])*24/Number(n[2]):n[3]},{class:i=`lucide-icon lucide lucide-${n[0]} ${n[7].class??""}`}],_={};for(let h=0;h<u.length;h+=1)_=F(_,u[h]);return{c(){e=Xe("svg");for(let h=0;h<o.length;h+=1)o[h].c();l=X(),a&&a.c(),this.h()},l(h){e=Ye(h,"svg",{width:!0,height:!0,stroke:!0,"stroke-width":!0,class:!0});var c=T(e);for(let d=0;d<o.length;d+=1)o[d].l(c);l=X(),a&&a.l(c),c.forEach(m),this.h()},h(){he(e,_)},m(h,c){j(h,e,c);for(let d=0;d<o.length;d+=1)o[d]&&o[d].m(e,null);P(e,l),a&&a.m(e,null),s=!0},p(h,[c]){if(c&32){r=H(h[5]);let d;for(d=0;d<r.length;d+=1){const w=Ce(h,r,d);o[d]?o[d].p(w,c):(o[d]=Oe(w),o[d].c(),o[d].m(e,l))}for(;d<o.length;d+=1)o[d].d(1);o.length=r.length}a&&a.p&&(!s||c&256)&&ie(a,f,h,h[8],s?se(f,h[8],c,null):re(h[8]),null),he(e,_=ge(u,[Ae,c&64&&h[6],(!s||c&4)&&{width:h[2]},(!s||c&4)&&{height:h[2]},(!s||c&2)&&{stroke:h[1]},(!s||c&28&&t!==(t=h[4]?Number(h[3])*24/Number(h[2]):h[3]))&&{"stroke-width":t},(!s||c&129&&i!==(i=`lucide-icon lucide lucide-${h[0]} ${h[7].class??""}`))&&{class:i}]))},i(h){s||(v(a,h),s=!0)},o(h){E(a,h),s=!1},d(h){h&&m(e),te(o,h),a&&a.d(h)}}}function pt(n,e,l){const t=["name","color","size","strokeWidth","absoluteStrokeWidth","iconNode"];let i=We(e,t),{$$slots:s={},$$scope:r}=e,{name:o}=e,{color:f="currentColor"}=e,{size:a=24}=e,{strokeWidth:u=2}=e,{absoluteStrokeWidth:_=!1}=e,{iconNode:h}=e;return n.$$set=c=>{l(7,e=F(F({},e),ee(c))),l(6,i=We(e,t)),"name"in c&&l(0,o=c.name),"color"in c&&l(1,f=c.color),"size"in c&&l(2,a=c.size),"strokeWidth"in c&&l(3,u=c.strokeWidth),"absoluteStrokeWidth"in c&&l(4,_=c.absoluteStrokeWidth),"iconNode"in c&&l(5,h=c.iconNode),"$$scope"in c&&l(8,r=c.$$scope)},e=ee(e),[o,f,a,u,_,h,i,e,r,s]}class xe extends R{constructor(e){super(),U(this,e,pt,kt,q,{name:0,color:1,size:2,strokeWidth:3,absoluteStrokeWidth:4,iconNode:5})}}function yt(n){let e;const l=n[2].default,t=le(l,n,n[3],null);return{c(){t&&t.c()},l(i){t&&t.l(i)},m(i,s){t&&t.m(i,s),e=!0},p(i,s){t&&t.p&&(!e||s&8)&&ie(t,l,i,i[3],e?se(l,i[3],s,null):re(i[3]),null)},i(i){e||(v(t,i),e=!0)},o(i){E(t,i),e=!1},d(i){t&&t.d(i)}}}function St(n){let e,l;const t=[{name:"chevron-left"},n[1],{iconNode:n[0]}];let i={$$slots:{default:[yt]},$$scope:{ctx:n}};for(let s=0;s<t.length;s+=1)i=F(i,t[s]);return e=new xe({props:i}),{c(){L(e.$$.fragment)},l(s){M(e.$$.fragment,s)},m(s,r){V(e,s,r),l=!0},p(s,[r]){const o=r&3?ge(t,[t[0],r&2&&Qe(s[1]),r&1&&{iconNode:s[0]}]):{};r&8&&(o.$$scope={dirty:r,ctx:s}),e.$set(o)},i(s){l||(v(e.$$.fragment,s),l=!0)},o(s){E(e.$$.fragment,s),l=!1},d(s){B(e,s)}}}function Et(n,e,l){let{$$slots:t={},$$scope:i}=e;const s=[["path",{d:"m15 18-6-6 6-6"}]];return n.$$set=r=>{l(1,e=F(F({},e),ee(r))),"$$scope"in r&&l(3,i=r.$$scope)},e=ee(e),[s,e,t,i]}class zt extends R{constructor(e){super(),U(this,e,Et,St,q,{})}}const jt=zt;function Tt(n){let e;const l=n[2].default,t=le(l,n,n[3],null);return{c(){t&&t.c()},l(i){t&&t.l(i)},m(i,s){t&&t.m(i,s),e=!0},p(i,s){t&&t.p&&(!e||s&8)&&ie(t,l,i,i[3],e?se(l,i[3],s,null):re(i[3]),null)},i(i){e||(v(t,i),e=!0)},o(i){E(t,i),e=!1},d(i){t&&t.d(i)}}}function It(n){let e,l;const t=[{name:"chevron-right"},n[1],{iconNode:n[0]}];let i={$$slots:{default:[Tt]},$$scope:{ctx:n}};for(let s=0;s<t.length;s+=1)i=F(i,t[s]);return e=new xe({props:i}),{c(){L(e.$$.fragment)},l(s){M(e.$$.fragment,s)},m(s,r){V(e,s,r),l=!0},p(s,[r]){const o=r&3?ge(t,[t[0],r&2&&Qe(s[1]),r&1&&{iconNode:s[0]}]):{};r&8&&(o.$$scope={dirty:r,ctx:s}),e.$set(o)},i(s){l||(v(e.$$.fragment,s),l=!0)},o(s){E(e.$$.fragment,s),l=!1},d(s){B(e,s)}}}function Nt(n,e,l){let{$$slots:t={},$$scope:i}=e;const s=[["path",{d:"m9 18 6-6-6-6"}]];return n.$$set=r=>{l(1,e=F(F({},e),ee(r))),"$$scope"in r&&l(3,i=r.$$scope)},e=ee(e),[s,e,t,i]}class Wt extends R{constructor(e){super(),U(this,e,Nt,It,q,{})}}const At=Wt;function De(n,e,l){const t=n.slice();t[3]=e[l].title,t[4]=e[l].slides,t[7]=l;const i=t[2][t[0]].section===t[7];return t[5]=i,t}function He(n,e,l){const t=n.slice();t[8]=e[l];const i=t[8].i===t[0];return t[9]=i,t}function Ct(n){let e;return{c(){e=N("div"),this.h()},l(l){e=W(l,"DIV",{class:!0}),T(e).forEach(m),this.h()},h(){b(e,"class","block svelte-s3rw5i")},m(l,t){j(l,e,t)},p:x,d(l){l&&m(e)}}}function Ot(n){let e,l=H(n[4]),t=[];for(let i=0;i<l.length;i+=1)t[i]=Pe(He(n,l,i));return{c(){for(let i=0;i<t.length;i+=1)t[i].c();e=X()},l(i){for(let s=0;s<t.length;s+=1)t[s].l(i);e=X()},m(i,s){for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(i,s);j(i,e,s)},p(i,s){if(s&3){l=H(i[4]);let r;for(r=0;r<l.length;r+=1){const o=He(i,l,r);t[r]?t[r].p(o,s):(t[r]=Pe(o),t[r].c(),t[r].m(e.parentNode,e))}for(;r<t.length;r+=1)t[r].d(1);t.length=l.length}},d(i){i&&m(e),te(t,i)}}}function Pe(n){let e;return{c(){e=N("div"),this.h()},l(l){e=W(l,"DIV",{class:!0}),T(e).forEach(m),this.h()},h(){b(e,"class","block svelte-s3rw5i"),K(e,"active",n[9])},m(l,t){j(l,e,t)},p(l,t){t&3&&K(e,"active",l[9])},d(l){l&&m(e)}}}function qe(n){let e,l,t=n[7]+1+"",i,s,r,o=n[3]+"",f,a,u;function _(d,w){return d[5]?Ot:Ct}let h=_(n),c=h(n);return{c(){e=N("div"),l=N("span"),i=ae(t),s=N("span"),r=ae("— "),f=ae(o),a=J(),c.c(),u=J(),this.h()},l(d){e=W(d,"DIV",{class:!0});var w=T(e);l=W(w,"SPAN",{class:!0});var p=T(l);i=ce(p,t),s=W(p,"SPAN",{class:!0});var z=T(s);r=ce(z,"— "),f=ce(z,o),z.forEach(m),p.forEach(m),a=Q(w),c.l(w),u=Q(w),w.forEach(m),this.h()},h(){b(s,"class","title svelte-s3rw5i"),b(l,"class","text svelte-s3rw5i"),b(e,"class","chapter svelte-s3rw5i"),K(e,"active",n[5])},m(d,w){j(d,e,w),P(e,l),P(l,i),P(l,s),P(s,r),P(s,f),P(e,a),c.m(e,null),P(e,u)},p(d,w){w&2&&o!==(o=d[3]+"")&&rt(f,o),h===(h=_(d))&&c?c.p(d,w):(c.d(1),c=h(d),c&&(c.c(),c.m(e,u))),w&5&&K(e,"active",d[5])},d(d){d&&m(e),c.d()}}}function Dt(n){let e,l=H(n[1]),t=[];for(let i=0;i<l.length;i+=1)t[i]=qe(De(n,l,i));return{c(){e=N("div");for(let i=0;i<t.length;i+=1)t[i].c();this.h()},l(i){e=W(i,"DIV",{class:!0});var s=T(e);for(let r=0;r<t.length;r+=1)t[r].l(s);s.forEach(m),this.h()},h(){b(e,"class","chapters svelte-s3rw5i")},m(i,s){j(i,e,s);for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(e,null)},p(i,[s]){if(s&7){l=H(i[1]);let r;for(r=0;r<l.length;r+=1){const o=De(i,l,r);t[r]?t[r].p(o,s):(t[r]=qe(o),t[r].c(),t[r].m(e,null))}for(;r<t.length;r+=1)t[r].d(1);t.length=l.length}},i:x,o:x,d(i){i&&m(e),te(t,i)}}}function Ht(n,e,l){let{activeSlide:t}=e,{sections:i}=e,{allSlides:s}=e;return n.$$set=r=>{"activeSlide"in r&&l(0,t=r.activeSlide),"sections"in r&&l(1,i=r.sections),"allSlides"in r&&l(2,s=r.allSlides)},[t,i,s]}class Pt extends R{constructor(e){super(),U(this,e,Ht,Dt,q,{activeSlide:0,sections:1,allSlides:2})}}var ue=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function qt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var Lt="Expected a function",Le=NaN,Mt="[object Symbol]",Vt=/^\s+|\s+$/g,Bt=/^[-+]0x[0-9a-f]+$/i,Ft=/^0b[01]+$/i,Kt=/^0o[0-7]+$/i,Rt=parseInt,Ut=typeof ue=="object"&&ue&&ue.Object===Object&&ue,Gt=typeof self=="object"&&self&&self.Object===Object&&self,Xt=Ut||Gt||Function("return this")(),Yt=Object.prototype,Zt=Yt.toString,Jt=Math.max,Qt=Math.min,ve=function(){return Xt.Date.now()};function xt(n,e,l){var t,i,s,r,o,f,a=0,u=!1,_=!1,h=!0;if(typeof n!="function")throw new TypeError(Lt);e=Me(e)||0,pe(l)&&(u=!!l.leading,_="maxWait"in l,s=_?Jt(Me(l.maxWait)||0,e):s,h="trailing"in l?!!l.trailing:h);function c(y){var C=t,O=i;return t=i=void 0,a=y,r=n.apply(O,C),r}function d(y){return a=y,o=setTimeout(z,e),u?c(y):r}function w(y){var C=y-f,O=y-a,G=e-C;return _?Qt(G,s-O):G}function p(y){var C=y-f,O=y-a;return f===void 0||C>=e||C<0||_&&O>=s}function z(){var y=ve();if(p(y))return I(y);o=setTimeout(z,w(y))}function I(y){return o=void 0,h&&t?c(y):(t=i=void 0,r)}function A(){o!==void 0&&clearTimeout(o),a=0,t=f=i=o=void 0}function S(){return o===void 0?r:I(ve())}function g(){var y=ve(),C=p(y);if(t=arguments,i=this,f=y,C){if(o===void 0)return d(f);if(_)return o=setTimeout(z,e),c(f)}return o===void 0&&(o=setTimeout(z,e)),r}return g.cancel=A,g.flush=S,g}function pe(n){var e=typeof n;return!!n&&(e=="object"||e=="function")}function $t(n){return!!n&&typeof n=="object"}function en(n){return typeof n=="symbol"||$t(n)&&Zt.call(n)==Mt}function Me(n){if(typeof n=="number")return n;if(en(n))return Le;if(pe(n)){var e=typeof n.valueOf=="function"?n.valueOf():n;n=pe(e)?e+"":e}if(typeof n!="string")return n===0?n:+n;n=n.replace(Vt,"");var l=Ft.test(n);return l||Kt.test(n)?Rt(n.slice(2),l?2:8):Bt.test(n)?Le:+n}var tn=xt;const nn=qt(tn),ln=()=>{var n;return((n=window==null?void 0:window.visualViewport)==null?void 0:n.width)||document.documentElement.clientWidth},rn=()=>{var n;return((n=window==null?void 0:window.visualViewport)==null?void 0:n.height)||document.documentElement.clientHeight},sn=wt({width:0,height:0},n=>{const e=()=>n({width:ln(),height:rn()});return e(),window.addEventListener("resize",nn(e,250)),()=>{window.removeEventListener("resize",e)}});function on(n){let e,l,t;return{c(){e=N("figure"),l=ae("visual goes here"),this.h()},l(i){e=W(i,"FIGURE",{style:!0,class:!0});var s=T(e);l=ce(s,"visual goes here"),s.forEach(m),this.h()},h(){b(e,"style",t=`--offset: ${n[0]}px; --buffer: 2rem`),b(e,"class","svelte-4vfsg0")},m(i,s){j(i,e,s),P(e,l)},p(i,[s]){s&1&&t!==(t=`--offset: ${i[0]}px; --buffer: 2rem`)&&b(e,"style",t)},i:x,o:x,d(i){i&&m(e)}}}function fn(n,e,l){let t,i,s;$(n,sn,u=>l(3,s=u));let{activeSlide:r}=e,o,f=!1;const a=async()=>{if(f){await st();const u=document.getElementById(`slide-${r}`);l(0,o=u.clientHeight+i)}};return Ze(()=>{f=!0,a()}),n.$$set=u=>{"activeSlide"in u&&l(1,r=u.activeSlide)},n.$$.update=()=>{n.$$.dirty&8&&l(2,t=s.width<600),n.$$.dirty&4&&(i=t?10:100),n.$$.dirty&10&&(s.width,a())},[o,r,t,s]}class un extends R{constructor(e){super(),U(this,e,fn,on,q,{activeSlide:1})}}function Ve(n,e,l){const t=n.slice();return t[18]=e[l],t}function Be(n){let e,l,t,i;const s=[cn,an],r=[];function o(f,a){return f[18]==="left"?0:f[18]==="right"?1:-1}return~(l=o(n))&&(t=r[l]=s[l](n)),{c(){e=N("span"),t&&t.c(),this.h()},l(f){e=W(f,"SPAN",{style:!0,class:!0});var a=T(e);t&&t.l(a),a.forEach(m),this.h()},h(){D(e,"font-size",n[4]),b(e,"class","svelte-jjzds")},m(f,a){j(f,e,a),~l&&r[l].m(e,null),i=!0},p(f,a){let u=l;l=o(f),l===u?~l&&r[l].p(f,a):(t&&(_e(),E(r[u],1,1,()=>{r[u]=null}),me()),~l?(t=r[l],t?t.p(f,a):(t=r[l]=s[l](f),t.c()),v(t,1),t.m(e,null)):t=null),(!i||a&16)&&D(e,"font-size",f[4])},i(f){i||(v(t),i=!0)},o(f){E(t),i=!1},d(f){f&&m(e),~l&&r[l].d()}}}function an(n){let e,l;return e=new At({props:{color:n[5],strokeWidth:n[6]}}),{c(){L(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,i){V(e,t,i),l=!0},p(t,i){const s={};i&32&&(s.color=t[5]),i&64&&(s.strokeWidth=t[6]),e.$set(s)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){E(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function cn(n){let e,l;return e=new jt({props:{color:n[5],strokeWidth:n[6]}}),{c(){L(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,i){V(e,t,i),l=!0},p(t,i){const s={};i&32&&(s.color=t[5]),i&64&&(s.strokeWidth=t[6]),e.$set(s)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){E(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function Fe(n){let e,l=n[9].includes(n[18]),t,i,s,r,o,f,a,u=l&&Be(n);return{c(){e=N("button"),u&&u.c(),t=J(),this.h()},l(_){e=W(_,"BUTTON",{style:!0,"aria-label":!0,class:!0});var h=T(e);u&&u.l(h),t=Q(h),h.forEach(m),this.h()},h(){D(e,"width",n[12](n[18])),D(e,"height",n[11](n[18])),b(e,"aria-label",i=n[18]),b(e,"class",s=n[18]+" "+n[7]+" svelte-jjzds"),e.disabled=r=n[2].includes(n[18]),K(e,"full",n[1])},m(_,h){j(_,e,h),u&&u.m(e,null),P(e,t),o=!0,f||(a=ke(e,"click",function(){ye(n[13]("tap",n[18]))&&n[13]("tap",n[18]).apply(this,arguments)}),f=!0)},p(_,h){n=_,h&520&&(l=n[9].includes(n[18])),l?u?(u.p(n,h),h&520&&v(u,1)):(u=Be(n),u.c(),v(u,1),u.m(e,t)):u&&(_e(),E(u,1,1,()=>{u=null}),me()),(!o||h&4104)&&D(e,"width",n[12](n[18])),(!o||h&2056)&&D(e,"height",n[11](n[18])),(!o||h&8&&i!==(i=n[18]))&&b(e,"aria-label",i),(!o||h&136&&s!==(s=n[18]+" "+n[7]+" svelte-jjzds"))&&b(e,"class",s),(!o||h&12&&r!==(r=n[2].includes(n[18])))&&(e.disabled=r),(!o||h&138)&&K(e,"full",n[1])},i(_){o||(v(u),o=!0)},o(_){E(u),o=!1},d(_){_&&m(e),u&&u.d(),f=!1,a()}}}function hn(n){let e,l,t,i;Je(n[17]);let s=H(n[3]),r=[];for(let f=0;f<s.length;f+=1)r[f]=Fe(Ve(n,s,f));const o=f=>E(r[f],1,1,()=>{r[f]=null});return{c(){e=N("section");for(let f=0;f<r.length;f+=1)r[f].c();this.h()},l(f){e=W(f,"SECTION",{style:!0,class:!0});var a=T(e);for(let u=0;u<r.length;u+=1)r[u].l(a);a.forEach(m),this.h()},h(){D(e,"height",n[8]+"px"),b(e,"class","svelte-jjzds"),K(e,"debug",n[0])},m(f,a){j(f,e,a);for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(e,null);l=!0,t||(i=[ke(window,"keydown",function(){ye(n[10])&&n[10].apply(this,arguments)}),ke(window,"resize",n[17])],t=!0)},p(f,[a]){if(n=f,a&15102){s=H(n[3]);let u;for(u=0;u<s.length;u+=1){const _=Ve(n,s,u);r[u]?(r[u].p(_,a),v(r[u],1)):(r[u]=Fe(_),r[u].c(),v(r[u],1),r[u].m(e,null))}for(_e(),u=s.length;u<r.length;u+=1)o(u);me()}(!l||a&256)&&D(e,"height",n[8]+"px"),(!l||a&1)&&K(e,"debug",n[0])},i(f){if(!l){for(let a=0;a<s.length;a+=1)v(r[a]);l=!0}},o(f){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)E(r[a]);l=!1},d(f){f&&m(e),te(r,f),t=!1,ot(i)}}}function dn(n,e,l){let t,i,s,r,{debug:o=!1}=e,{enableKeyboard:f=!1}=e,{full:a=!1}=e,{showArrows:u=!1}=e,{disable:_=[]}=e,{directions:h=["left","right"]}=e,{size:c="64px"}=e,{arrowSize:d="48px"}=e,{arrowStroke:w="#000"}=e,{arrowStrokeWidth:p="2"}=e,{arrowPosition:z="center"}=e;const I=ft();let A;function S(){l(8,A=window.innerHeight)}return n.$$set=g=>{"debug"in g&&l(0,o=g.debug),"enableKeyboard"in g&&l(14,f=g.enableKeyboard),"full"in g&&l(1,a=g.full),"showArrows"in g&&l(15,u=g.showArrows),"disable"in g&&l(2,_=g.disable),"directions"in g&&l(3,h=g.directions),"size"in g&&l(16,c=g.size),"arrowSize"in g&&l(4,d=g.arrowSize),"arrowStroke"in g&&l(5,w=g.arrowStroke),"arrowStrokeWidth"in g&&l(6,p=g.arrowStrokeWidth),"arrowPosition"in g&&l(7,z=g.arrowPosition)},n.$$.update=()=>{n.$$.dirty&65546&&l(12,t=g=>Array.isArray(c)?c[h.indexOf(g)]:a?"100%":c),n.$$.dirty&65538&&l(11,i=g=>["up","down"].includes(g)?c:a?"100%":c),n.$$.dirty&16392&&l(10,s=g=>{const y=g.key.replace("Arrow","").toLowerCase(),C=h.includes(y);f&&C&&(g.preventDefault(),I("tap",y))}),n.$$.dirty&32776&&l(9,r=h.filter(g=>typeof u=="boolean"?u:u.includes(g)))},[o,a,_,h,d,w,p,z,A,r,s,i,t,I,f,u,c,S]}class _n extends R{constructor(e){super(),U(this,e,dn,hn,q,{debug:0,enableKeyboard:14,full:1,showArrows:15,disable:2,directions:3,size:16,arrowSize:4,arrowStroke:5,arrowStrokeWidth:6,arrowPosition:7})}}function mn(n){let e,l,t,i,s;const r=n[26].default,o=le(r,n,n[25],null);return{c(){e=N("section"),l=N("div"),o&&o.c(),this.h()},l(f){e=W(f,"SECTION",{"aria-label":!0,class:!0});var a=T(e);l=W(a,"DIV",{class:!0,style:!0});var u=T(l);o&&o.l(u),u.forEach(m),a.forEach(m),this.h()},h(){b(l,"class","slides svelte-1ceqw5z"),b(l,"style",n[5]),b(e,"aria-label","carousel"),b(e,"class",t="slider "+n[0]+" svelte-1ceqw5z"),Je(()=>n[29].call(e))},m(f,a){j(f,e,a),P(e,l),o&&o.m(l,null),n[27](l),n[28](e),i=ut(e,n[29].bind(e)),s=!0},p(f,a){o&&o.p&&(!s||a[0]&33554432)&&ie(o,r,f,f[25],s?se(r,f[25],a,null):re(f[25]),null),(!s||a[0]&32)&&b(l,"style",f[5]),(!s||a[0]&1&&t!==(t="slider "+f[0]+" svelte-1ceqw5z"))&&b(e,"class",t)},i(f){s||(v(o,f),s=!0)},o(f){E(o,f),s=!1},d(f){f&&m(e),o&&o.d(f),n[27](null),n[28](null),i()}}}function gn(n,e,l){let t,i,s,r,o,f,a,u,_,h,c,{$$slots:d={},$$scope:w}=e,{direction:p="horizontal"}=e,{duration:z="500ms"}=e,{timing:I="ease"}=e,{count:A=0}=e,{current:S=0}=e;const g=()=>be(1),y=()=>be(-1),C=k=>be(k,!0);let O=0,G=0,Y,Z,Se=!1,oe,fe,Ee,ze=ne(),je=ne(),Te=ne(),Ie=ne(),Ne=ne();const be=(k,lt)=>{if(!Se)return!1;const it=lt?k:G+k;l(14,G=Math.max(0,Math.min(O-1,it))),l(6,S=G)},$e=k=>{Se=k[0].isIntersecting};Ze(()=>{l(13,O=fe.children.length),l(7,A=O),Ne.set(A),Ee=new IntersectionObserver($e,{root:null,rootMargin:"-1px"}),Ee.observe(oe),l(2,Z),l(1,Y)});function et(k){de[k?"unshift":"push"](()=>{fe=k,l(4,fe)})}function tt(k){de[k?"unshift":"push"](()=>{oe=k,l(3,oe)})}function nt(){Y=this.clientWidth,Z=this.clientHeight,l(1,Y),l(2,Z)}return n.$$set=k=>{"direction"in k&&l(0,p=k.direction),"duration"in k&&l(8,z=k.duration),"timing"in k&&l(9,I=k.timing),"count"in k&&l(7,A=k.count),"current"in k&&l(6,S=k.current),"$$scope"in k&&l(25,w=k.$$scope)},n.$$.update=()=>{n.$$.dirty[0]&8195&&l(24,t=p==="horizontal"?`${O*Y}px`:"100%"),n.$$.dirty[0]&8197&&l(23,i=p==="vertical"?`${O*Z}px`:"100%"),n.$$.dirty[0]&16387&&l(22,s=p==="horizontal"?`${G*Y*-1}px`:0),n.$$.dirty[0]&16389&&l(21,r=p==="vertical"?`${G*Z*-1}px`:0),n.$$.dirty[0]&16777216&&l(20,o=`width: ${t};`),n.$$.dirty[0]&8388608&&l(19,f=`height: ${i};`),n.$$.dirty[0]&6291456&&l(18,a=`transform: translate3d(${s}, ${r}, 0);`),n.$$.dirty[0]&256&&l(17,u=`transition-duration: ${z};`),n.$$.dirty[0]&512&&l(16,_=`transition-timing-function: ${I};`),n.$$.dirty[0]&2031616&&l(5,h=`${o} ${f} ${a} ${u} ${_}`),n.$$.dirty[0]&1&&ze.set(p),n.$$.dirty[0]&2&&je.set(Y),n.$$.dirty[0]&4&&Te.set(Z),n.$$.dirty[0]&64&&Ie.set(S),n.$$.dirty[0]&32768&&at("Slider",c)},l(15,c={dir:ze,cur:Ie,w:je,h:Te,count:Ne}),[p,Y,Z,oe,fe,h,S,A,z,I,g,y,C,O,G,c,_,u,a,f,o,r,s,i,t,w,d,et,tt,nt]}class bn extends R{constructor(e){super(),U(this,e,gn,mn,q,{direction:0,duration:8,timing:9,count:7,current:6,next:10,prev:11,jump:12},null,[-1,-1])}get next(){return this.$$.ctx[10]}get prev(){return this.$$.ctx[11]}get jump(){return this.$$.ctx[12]}}function wn(n,e){const l=["a","button","input","textarea","select","details","[tabindex]:not([tabindex='-1'])"],t=r=>{s.forEach(o=>{r&&r.disable?o.setAttribute("tabindex",-1):o.removeAttribute("tabindex")})},i=l.join(", "),s=[...n.querySelectorAll(i)];return t(e),{update(r){t(r)},destroy(){s.forEach(r=>r.removeAttribute("tabindex"))}}}function vn(n){let e,l,t,i,s,r,o;const f=n[16].default,a=le(f,n,n[15],null);return{c(){e=N("div"),a&&a.c(),this.h()},l(u){e=W(u,"DIV",{id:!0,class:!0,role:!0,"aria-label":!0,"aria-current":!0});var _=T(e);a&&a.l(_),_.forEach(m),this.h()},h(){b(e,"id",l="slide-"+n[0]),b(e,"class","slide svelte-1h814z3"),b(e,"role","group"),b(e,"aria-label",t="slide "+(n[0]+1)+" of "+n[5]),b(e,"aria-current",n[1]),K(e,"visible",n[1]),D(e,"width",n[4]),D(e,"height",n[3])},m(u,_){j(u,e,_),a&&a.m(e,null),s=!0,r||(o=ct(i=wn.call(null,e,{disable:n[2]})),r=!0)},p(u,[_]){a&&a.p&&(!s||_&32768)&&ie(a,f,u,u[15],s?se(f,u[15],_,null):re(u[15]),null),(!s||_&1&&l!==(l="slide-"+u[0]))&&b(e,"id",l),(!s||_&33&&t!==(t="slide "+(u[0]+1)+" of "+u[5]))&&b(e,"aria-label",t),(!s||_&2)&&b(e,"aria-current",u[1]),i&&ye(i.update)&&_&4&&i.update.call(null,{disable:u[2]}),(!s||_&2)&&K(e,"visible",u[1]),_&16&&D(e,"width",u[4]),_&8&&D(e,"height",u[3])},i(u){s||(v(a,u),s=!0)},o(u){E(a,u),s=!1},d(u){u&&m(e),a&&a.d(u),r=!1,o()}}}function kn(n,e,l){let t,i,s,r,o,f,a,u,_,{$$slots:h={},$$scope:c}=e;const{dir:d,cur:w,w:p,h:z,count:I}=ht("Slider");$(n,d,S=>l(13,a=S)),$(n,w,S=>l(11,o=S)),$(n,p,S=>l(14,u=S)),$(n,z,S=>l(12,f=S)),$(n,I,S=>l(5,_=S));let{index:A}=e;return n.$$set=S=>{"index"in S&&l(0,A=S.index),"$$scope"in S&&l(15,c=S.$$scope)},n.$$.update=()=>{n.$$.dirty&24576&&l(4,t=a==="horizontal"?`${u}px`:"100%"),n.$$.dirty&12288&&l(3,i=a==="vertical"?`${f}px`:"100%"),n.$$.dirty&2049&&l(1,s=A===o),n.$$.dirty&2&&l(2,r=!s)},[A,s,r,i,t,_,d,w,p,z,I,o,f,a,u,c,h]}class pn extends R{constructor(e){super(),U(this,e,kn,vn,q,{index:0})}}function Ke(n,e,l){const t=n.slice();return t[8]=e[l],t[10]=l,t}function Re(n,e,l){const t=n.slice();return t[11]=e[l].type,t[12]=e[l].text,t}function yn(n){let e,l,t=n[12]+"";return{c(){e=N(n[11]),l=new _t(!1),this.h()},l(i){e=W(i,(n[11]||"null").toUpperCase(),{class:!0});var s=T(e);l=mt(s,!1),s.forEach(m),this.h()},h(){l.a=null,gt(n[11])(e,{class:"slide-content svelte-1myyodm"})},m(i,s){j(i,e,s),l.m(t,e)},p:x,d(i){i&&m(e)}}}function Ue(n){let e=n[11]&&yn(n);return{c(){e&&e.c()},l(l){e&&e.l(l)},m(l,t){e&&e.m(l,t)},p(l,t){l[11]&&e.p(l,t)},d(l){e&&e.d(l)}}}function Sn(n){let e,l=H(n[8].text),t=[];for(let i=0;i<l.length;i+=1)t[i]=Ue(Re(n,l,i));return{c(){for(let i=0;i<t.length;i+=1)t[i].c();e=J()},l(i){for(let s=0;s<t.length;s+=1)t[s].l(i);e=Q(i)},m(i,s){for(let r=0;r<t.length;r+=1)t[r]&&t[r].m(i,s);j(i,e,s)},p(i,s){if(s&8){l=H(i[8].text);let r;for(r=0;r<l.length;r+=1){const o=Re(i,l,r);t[r]?t[r].p(o,s):(t[r]=Ue(o),t[r].c(),t[r].m(e.parentNode,e))}for(;r<t.length;r+=1)t[r].d(1);t.length=l.length}},d(i){i&&m(e),te(t,i)}}}function Ge(n){let e,l;return e=new pn({props:{index:n[10],$$slots:{default:[Sn]},$$scope:{ctx:n}}}),{c(){L(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,i){V(e,t,i),l=!0},p(t,i){const s={};i&32768&&(s.$$scope={dirty:i,ctx:t}),e.$set(s)},i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){E(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function En(n){let e,l,t=H(n[3]),i=[];for(let r=0;r<t.length;r+=1)i[r]=Ge(Ke(n,t,r));const s=r=>E(i[r],1,1,()=>{i[r]=null});return{c(){for(let r=0;r<i.length;r+=1)i[r].c();e=X()},l(r){for(let o=0;o<i.length;o+=1)i[o].l(r);e=X()},m(r,o){for(let f=0;f<i.length;f+=1)i[f]&&i[f].m(r,o);j(r,e,o),l=!0},p(r,o){if(o&8){t=H(r[3]);let f;for(f=0;f<t.length;f+=1){const a=Ke(r,t,f);i[f]?(i[f].p(a,o),v(i[f],1)):(i[f]=Ge(a),i[f].c(),v(i[f],1),i[f].m(e.parentNode,e))}for(_e(),f=t.length;f<i.length;f+=1)s(f);me()}},i(r){if(!l){for(let o=0;o<t.length;o+=1)v(i[o]);l=!0}},o(r){i=i.filter(Boolean);for(let o=0;o<i.length;o+=1)E(i[o]);l=!1},d(r){r&&m(e),te(i,r)}}}function zn(n){let e,l,t,i,s,r,o,f,a,u;e=new Pt({props:{activeSlide:n[1],sections:n[2],allSlides:n[3]}});function _(c){n[6](c)}let h={duration:"0",$$slots:{default:[En]},$$scope:{ctx:n}};return n[1]!==void 0&&(h.current=n[1]),i=new bn({props:h}),n[5](i),de.push(()=>bt(i,"current",_)),o=new un({props:{activeSlide:n[1]}}),a=new _n({props:{debug:!1,full:!0,directions:n[1]===0?["right"]:["left","right"],size:n[1]===0?"100%":["33%","67%"],enableKeyboard:!0,marginTop:0}}),a.$on("tap",n[4]),{c(){L(e.$$.fragment),l=J(),t=N("article"),L(i.$$.fragment),r=J(),L(o.$$.fragment),f=J(),L(a.$$.fragment),this.h()},l(c){M(e.$$.fragment,c),l=Q(c),t=W(c,"ARTICLE",{class:!0});var d=T(t);M(i.$$.fragment,d),d.forEach(m),r=Q(c),M(o.$$.fragment,c),f=Q(c),M(a.$$.fragment,c),this.h()},h(){b(t,"class","svelte-1myyodm")},m(c,d){V(e,c,d),j(c,l,d),j(c,t,d),V(i,t,null),j(c,r,d),V(o,c,d),j(c,f,d),V(a,c,d),u=!0},p(c,[d]){const w={};d&2&&(w.activeSlide=c[1]),e.$set(w);const p={};d&32768&&(p.$$scope={dirty:d,ctx:c}),!s&&d&2&&(s=!0,p.current=c[1],dt(()=>s=!1)),i.$set(p);const z={};d&2&&(z.activeSlide=c[1]),o.$set(z);const I={};d&2&&(I.directions=c[1]===0?["right"]:["left","right"]),d&2&&(I.size=c[1]===0?"100%":["33%","67%"]),a.$set(I)},i(c){u||(v(e.$$.fragment,c),v(i.$$.fragment,c),v(o.$$.fragment,c),v(a.$$.fragment,c),u=!0)},o(c){E(e.$$.fragment,c),E(i.$$.fragment,c),E(o.$$.fragment,c),E(a.$$.fragment,c),u=!1},d(c){c&&(m(l),m(t),m(r),m(f)),B(e,c),n[5](null),B(i),B(o,c),B(a,c)}}}function jn(n,e,l){let t,i=0;const s=[{title:"Intro",slides:[{i:0,text:[{type:"h1",text:"title"},{type:"p",text:"welcome"}]}]},{title:"Middle",slides:[{i:1,text:[{type:"p",text:"the quick brown"},{type:"p",text:"the quick brown"},{type:"p",text:"the quick brown"}]},{i:2,text:[{type:"p",text:"fox jumps over"},{type:"p",text:"fox jumps over"}]},{i:3,text:[{type:"p",text:"the lazy dog"}]}]},{title:"Outro",slides:[{i:4,text:[{type:"h2",text:"the end."}]}]}],r=s.map((u,_)=>u.slides.map(h=>({...h,section:_}))).flat(),o=({detail:u})=>{u==="right"?t.next():t.prev(),window.scrollTo(0,0)};function f(u){de[u?"unshift":"push"](()=>{t=u,l(0,t)})}function a(u){i=u,l(1,i)}return[t,i,s,r,o,f,a]}class Tn extends R{constructor(e){super(),U(this,e,jn,zn,q,{})}}function In(n){let e,l;return e=new Tn({}),{c(){L(e.$$.fragment)},l(t){M(e.$$.fragment,t)},m(t,i){V(e,t,i),l=!0},p:x,i(t){l||(v(e.$$.fragment,t),l=!0)},o(t){E(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}class On extends R{constructor(e){super(),U(this,e,null,In,q,{})}}export{On as component};