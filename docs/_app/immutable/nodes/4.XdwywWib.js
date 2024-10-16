import{s as ee,e as z,l as w,t as j,T as me,c as x,f as b,o as M,b as S,d as R,m as K,p as v,x as X,h as d,g as U,U as ye,V as Q,j as G,i as _e,n as $,r as ie,w as ve,q as Y,W as re,X as ge}from"../chunks/scheduler.Bv63D3Z8.js";import{S as te,i as le,t as q,g as fe,e as ce,b as J,c as ue,a as de,m as he,d as pe}from"../chunks/index.DAQ889mv.js";import{e as Z}from"../chunks/each.D6YF6ztN.js";import{g as Ee,d as be}from"../chunks/transform.BrNFYyzW.js";import{b as Ce}from"../chunks/paths.BAJyUG43.js";async function ze(l){if("clipboard"in navigator)await navigator.clipboard.writeText(l);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=l,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}const xe=(l,e)=>{async function s(){if(r)try{await ze(r),l.dispatchEvent(new CustomEvent("svelte-copy",{detail:r}))}catch(o){l.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}let t=typeof e=="string"?["click"]:[e.events].flat(1),r=typeof e=="string"?e:e.text;return t.forEach(o=>{l.addEventListener(o,s,!0)}),{update:o=>{const C=typeof o=="string"?["click"]:[o.events].flat(1),g=typeof o=="string"?o:o.text,h=C.filter(y=>!t.includes(y)),n=t.filter(y=>!C.includes(y));h.forEach(y=>{l.addEventListener(y,s,!0)}),n.forEach(y=>{l.removeEventListener(y,s,!0)}),t=C,r=g},destroy:()=>{t.forEach(o=>{l.removeEventListener(o,s,!0)})}}};function ke(l){let e,s,t,r,o,C,g,h,n,y,a,f="CSS Snippet",p,_,H,P,B,T,L="Copy CSS to Clipboard",N,k,D,F,W;return{c(){e=z("link"),s=w(),t=z("div"),r=z("h3"),o=j(l[0]),C=w(),g=z("p"),h=j(l[1]),n=w(),y=z("details"),a=z("summary"),a.textContent=f,p=w(),_=z("code"),H=j(l[2]),P=w(),B=z("p"),T=z("button"),T.textContent=L,k=z("span"),D=j(l[3]),this.h()},l(E){const i=me("svelte-1uevrx3",document.head);e=x(i,"LINK",{rel:!0,href:!0}),i.forEach(b),s=M(E),t=x(E,"DIV",{style:!0,class:!0});var I=S(t);r=x(I,"H3",{class:!0});var c=S(r);o=R(c,l[0]),c.forEach(b),C=M(I),g=x(I,"P",{});var m=S(g);h=R(m,l[1]),m.forEach(b),n=M(I),y=x(I,"DETAILS",{class:!0});var u=S(y);a=x(u,"SUMMARY",{class:!0,"data-svelte-h":!0}),K(a)!=="svelte-1p4cxwi"&&(a.textContent=f),p=M(u),_=x(u,"CODE",{class:!0});var A=S(_);H=R(A,l[2]),A.forEach(b),u.forEach(b),P=M(I),B=x(I,"P",{});var O=S(B);T=x(O,"BUTTON",{class:!0,"data-svelte-h":!0}),K(T)!=="svelte-v2s51m"&&(T.textContent=L),k=x(O,"SPAN",{class:!0});var V=S(k);D=R(V,l[3]),V.forEach(b),O.forEach(b),I.forEach(b),this.h()},h(){v(e,"rel","external stylesheet"),v(e,"href",l[5]),v(r,"class","svelte-19ry7n"),X(g,"font-size",l[4]),v(a,"class","svelte-19ry7n"),v(_,"class","svelte-19ry7n"),v(y,"class","svelte-19ry7n"),v(T,"class","svelte-19ry7n"),v(k,"class","svelte-19ry7n"),X(t,"font-family","'"+l[0]+"'"),v(t,"class","svelte-19ry7n")},m(E,i){d(document.head,e),U(E,s,i),U(E,t,i),d(t,r),d(r,o),d(t,C),d(t,g),d(g,h),d(t,n),d(t,y),d(y,a),d(y,p),d(y,_),d(_,H),d(t,P),d(t,B),d(B,T),d(B,k),d(k,D),F||(W=[ye(N=xe.call(null,T,l[2])),Q(T,"svelte-copy",l[6])],F=!0)},p(E,[i]){i&1&&G(o,E[0]),i&2&&G(h,E[1]),i&16&&X(g,"font-size",E[4]),i&4&&G(H,E[2]),N&&_e(N.update)&&i&4&&N.update.call(null,E[2]),i&8&&G(D,E[3]),i&1&&X(t,"font-family","'"+E[0]+"'")},i:$,o:$,d(E){E&&(b(s),b(t)),b(e),F=!1,ie(W)}}}function Te(l,e,s){let t,{id:r=""}=e,{family:o=""}=e,{size:C=16}=e,{text:g}=e,h="",n="";const y=`${Ce}/assets/demo/fonts/${r}.css`,a=()=>{s(3,n="Copied!"),setTimeout(()=>{s(3,n="")},1e3)};return ve(async()=>{const f=await fetch(y);s(2,h=await f.text())}),l.$$set=f=>{"id"in f&&s(7,r=f.id),"family"in f&&s(0,o=f.family),"size"in f&&s(8,C=f.size),"text"in f&&s(1,g=f.text)},l.$$.update=()=>{l.$$.dirty&256&&s(4,t=`${C}px`)},[o,g,h,n,t,y,a,r,C]}class Le extends te{constructor(e){super(),le(this,e,Te,ke,ee,{id:7,family:0,size:8,text:1})}}const Se=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function se(l,e,s){const t=l.slice();return t[5]=e[s][0],t[6]=e[s][1],t}function ne(l,e,s){const t=l.slice();return t[9]=e[s].family,t[10]=e[s].id,t}function oe(l){let e,s;return e=new Le({props:{id:l[10],family:l[9],size:l[0],text:l[1]}}),{c(){ue(e.$$.fragment)},l(t){de(e.$$.fragment,t)},m(t,r){he(e,t,r),s=!0},p(t,r){const o={};r&1&&(o.size=t[0]),r&2&&(o.text=t[1]),e.$set(o)},i(t){s||(q(e.$$.fragment,t),s=!0)},o(t){J(e.$$.fragment,t),s=!1},d(t){pe(e,t)}}}function ae(l){let e,s=l[5]+"",t,r,o,C,g,h=Z(l[6]),n=[];for(let a=0;a<h.length;a+=1)n[a]=oe(ne(l,h,a));const y=a=>J(n[a],1,1,()=>{n[a]=null});return{c(){e=z("h2"),t=j(s),r=w(),o=z("section");for(let a=0;a<n.length;a+=1)n[a].c();C=w(),this.h()},l(a){e=x(a,"H2",{});var f=S(e);t=R(f,s),f.forEach(b),r=M(a),o=x(a,"SECTION",{class:!0});var p=S(o);for(let _=0;_<n.length;_+=1)n[_].l(p);C=M(p),p.forEach(b),this.h()},h(){v(o,"class","svelte-1lzc8ku")},m(a,f){U(a,e,f),d(e,t),U(a,r,f),U(a,o,f);for(let p=0;p<n.length;p+=1)n[p]&&n[p].m(o,null);d(o,C),g=!0},p(a,f){if(f&7){h=Z(a[6]);let p;for(p=0;p<h.length;p+=1){const _=ne(a,h,p);n[p]?(n[p].p(_,f),q(n[p],1)):(n[p]=oe(_),n[p].c(),q(n[p],1),n[p].m(o,C))}for(fe(),p=h.length;p<n.length;p+=1)y(p);ce()}},i(a){if(!g){for(let f=0;f<h.length;f+=1)q(n[f]);g=!0}},o(a){n=n.filter(Boolean);for(let f=0;f<n.length;f+=1)J(n[f]);g=!1},d(a){a&&(b(e),b(r),b(o)),re(n,a)}}}function we(l){let e,s,t="Hosted Fonts on The Pudding",r,o,C="<em>Do not use fonts hosted by The Pudding without written permission.</em>",g,h,n,y,a,f,p,_,H,P,B="text sample",T,L,N,k,D,F,W,E=Z(l[2]),i=[];for(let c=0;c<E.length;c+=1)i[c]=ae(se(l,E,c));const I=c=>J(i[c],1,1,()=>{i[c]=null});return{c(){e=z("div"),s=z("h1"),s.textContent=t,r=w(),o=z("p"),o.innerHTML=C,g=w(),h=z("form"),n=z("label"),y=j("font-size: "),a=j(l[0]),f=j("px"),p=w(),_=z("input"),H=w(),P=z("label"),P.textContent=B,T=w(),L=z("input"),N=w(),k=z("article");for(let c=0;c<i.length;c+=1)i[c].c();this.h()},l(c){e=x(c,"DIV",{id:!0,class:!0});var m=S(e);s=x(m,"H1",{"data-svelte-h":!0}),K(s)!=="svelte-1m2hcwq"&&(s.textContent=t),r=M(m),o=x(m,"P",{"data-svelte-h":!0}),K(o)!=="svelte-895ja5"&&(o.innerHTML=C),g=M(m),h=x(m,"FORM",{});var u=S(h);n=x(u,"LABEL",{for:!0,class:!0});var A=S(n);y=R(A,"font-size: "),a=R(A,l[0]),f=R(A,"px"),A.forEach(b),p=M(u),_=x(u,"INPUT",{id:!0,type:!0,min:!0,max:!0}),H=M(u),P=x(u,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),K(P)!=="svelte-16zo6eo"&&(P.textContent=B),T=M(u),L=x(u,"INPUT",{id:!0,type:!0,maxlength:!0}),u.forEach(b),m.forEach(b),N=M(c),k=x(c,"ARTICLE",{class:!0});var O=S(k);for(let V=0;V<i.length;V+=1)i[V].l(O);O.forEach(b),this.h()},h(){v(n,"for","size"),v(n,"class","svelte-1lzc8ku"),v(_,"id","size"),v(_,"type","range"),v(_,"min","12"),v(_,"max","48"),v(P,"for","text"),v(P,"class","svelte-1lzc8ku"),v(L,"id","text"),v(L,"type","text"),v(L,"maxlength","100"),v(e,"id","info"),v(e,"class","svelte-1lzc8ku"),v(k,"class","svelte-1lzc8ku")},m(c,m){U(c,e,m),d(e,s),d(e,r),d(e,o),d(e,g),d(e,h),d(h,n),d(n,y),d(n,a),d(n,f),d(h,p),d(h,_),Y(_,l[0]),d(h,H),d(h,P),d(h,T),d(h,L),Y(L,l[1]),U(c,N,m),U(c,k,m);for(let u=0;u<i.length;u+=1)i[u]&&i[u].m(k,null);D=!0,F||(W=[Q(_,"change",l[3]),Q(_,"input",l[3]),Q(L,"input",l[4])],F=!0)},p(c,[m]){if((!D||m&1)&&G(a,c[0]),m&1&&Y(_,c[0]),m&2&&L.value!==c[1]&&Y(L,c[1]),m&7){E=Z(c[2]);let u;for(u=0;u<E.length;u+=1){const A=se(c,E,u);i[u]?(i[u].p(A,m),q(i[u],1)):(i[u]=ae(A),i[u].c(),q(i[u],1),i[u].m(k,null))}for(fe(),u=E.length;u<i.length;u+=1)I(u);ce()}},i(c){if(!D){for(let m=0;m<E.length;m+=1)q(i[m]);D=!0}},o(c){i=i.filter(Boolean);for(let m=0;m<i.length;m+=1)J(i[m]);D=!1},d(c){c&&(b(e),b(N),b(k)),re(i,c),F=!1,ie(W)}}}function Me(l,e,s){let t=18,r="The quick brown fox jumps over the lazy dog.";const o=Ee(Se,h=>h.type);o.sort((h,n)=>be(h[1].length,n[1].length));function C(){t=ge(this.value),s(0,t)}function g(){r=this.value,s(1,r)}return[t,r,o,C,g]}class Pe extends te{constructor(e){super(),le(this,e,Me,we,ee,{})}}function De(l){let e,s;return e=new Pe({}),{c(){ue(e.$$.fragment)},l(t){de(e.$$.fragment,t)},m(t,r){he(e,t,r),s=!0},p:$,i(t){s||(q(e.$$.fragment,t),s=!0)},o(t){J(e.$$.fragment,t),s=!1},d(t){pe(e,t)}}}class je extends te{constructor(e){super(),le(this,e,null,De,ee,{})}}export{je as component};