// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import "gridsome-plugin-remark-prismjs-all/themes/night-owl.css";
import "fontsource-space-mono";
import "fontsource-work-sans";

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  // Analytics
  head.script.push({
    src: "https://shynet.jakewalker.xyz/ingress/db7e13ba-9f5d-492c-a946-289a74e7ab00/script.js",
    body: true
  });
  head.noscript.push({
    innerHtml: "<img src='https://shynet.jakewalker.xyz/ingress/db7e13ba-9f5d-492c-a946-289a74e7ab00/pixel.gif'>"
  });
}
