var b=Object.defineProperty;var E=(t,e,n)=>e in t?b(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var _=(t,e,n)=>(E(t,typeof e!="symbol"?e+"":e,n),n);import{r as $,n as c,B as x,b as C,f as I,C as B,i as v,D as L,E as p,F as M,G as O,H as w,I as j,J as D,K as F,L as G,M as H}from"./scheduler.Bv63D3Z8.js";const o=new Set;let f;function z(){f={r:0,c:[],p:f}}function A(){f.r||$(f.c),f=f.p}function J(t,e){t&&t.i&&(o.delete(t),t.i(e))}function Q(t,e,n,s){if(t&&t.o){if(o.has(t))return;o.add(t),f.c.push(()=>{o.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}function T(t,e,n){const s=t.$$.props[e];s!==void 0&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function W(t){t&&t.c()}function X(t,e){t&&t.l(e)}function K(t,e,n){const{fragment:s,after_update:i}=t.$$;s&&s.m(e,n),p(()=>{const d=t.$$.on_mount.map(j).filter(v);t.$$.on_destroy?t.$$.on_destroy.push(...d):$(d),t.$$.on_mount=[]}),i.forEach(p)}function N(t,e){const n=t.$$;n.fragment!==null&&(M(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function P(t,e){t.$$.dirty[0]===-1&&(D.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Y(t,e,n,s,i,d,h=null,S=[-1]){const u=O;w(t);const r=t.$$={fragment:null,ctx:[],props:d,update:c,not_equal:i,bound:x(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:x(),dirty:S,skip_bound:!1,root:e.target||u.$$.root};h&&h(r.root);let l=!1;if(r.ctx=n?n(t,e.props||{},(a,g,...m)=>{const y=m.length?m[0]:g;return r.ctx&&i(r.ctx[a],r.ctx[a]=y)&&(!r.skip_bound&&r.bound[a]&&r.bound[a](y),l&&P(t,a)),g}):[],r.update(),l=!0,$(r.before_update),r.fragment=s?s(r.ctx):!1,e.target){if(e.hydrate){G();const a=C(e.target);r.fragment&&r.fragment.l(a),a.forEach(I)}else r.fragment&&r.fragment.c();e.intro&&J(t.$$.fragment),K(t,e.target,e.anchor),H(),B()}w(u)}class Z{constructor(){_(this,"$$");_(this,"$$set")}$destroy(){N(this,1),this.$destroy=c}$on(e,n){if(!v(n))return c;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(e){this.$$set&&!L(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const R="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(R);export{Z as S,X as a,Q as b,W as c,N as d,A as e,T as f,z as g,Y as i,K as m,J as t};
