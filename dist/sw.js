if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const f=e=>n(e,c),a={module:{uri:c},exports:o,require:f};i[c]=Promise.all(r.map((e=>a[e]||f(e)))).then((e=>(s(...e),o)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"b9bda631b2a8573d751254b937f19a09"},{url:"assets/fs-ba7123b1.js",revision:null},{url:"assets/index-9c2f7502.js",revision:null},{url:"assets/index-b809565d.css",revision:null},{url:"favicon.ico",revision:"349dd79132f0015a4ee6db7d795e3067"},{url:"index.html",revision:"6cb2ba4049c75319883b28be49211ea5"},{url:"logo.svg",revision:"d3983c9472565719e5855c1af2eb920e"},{url:"maskable-icon-512x512.png",revision:"222d4e4ca833b210040d653e50c71171"},{url:"pwa-192x192.png",revision:"fafdf7fc1cb3ea69808180aec8b5e57a"},{url:"pwa-512x512.png",revision:"f41a4edb6fb22888788f7d9b6acb36c9"},{url:"pwa-64x64.png",revision:"b3c4ff820623c0393bfc8c69ed7e38c4"},{url:"registerSW.js",revision:"272ac14f540045bc6b616318865f6336"},{url:"favicon.ico",revision:"349dd79132f0015a4ee6db7d795e3067"},{url:"pwa-64x64.png",revision:"b3c4ff820623c0393bfc8c69ed7e38c4"},{url:"pwa-192x192.png",revision:"fafdf7fc1cb3ea69808180aec8b5e57a"},{url:"pwa-512x512.png",revision:"f41a4edb6fb22888788f7d9b6acb36c9"},{url:"maskable-icon-512x512.png",revision:"222d4e4ca833b210040d653e50c71171"},{url:"manifest.webmanifest",revision:"73d24456ff82740ae0c1543af96380c9"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
