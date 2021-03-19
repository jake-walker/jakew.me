// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';
import Buefy from 'buefy';
import "gridsome-plugin-remark-prismjs-all/themes/tomorrow.css";
import "prismjs/plugins/command-line/prism-command-line.css";
// import "buefy/dist/buefy.css";
import "./style/main.scss";

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);

  // Analytics
  head.script.push({
    src: "https://shynet.jakewalker.xyz/ingress/a54b2aec-e9d5-41e3-ba04-b02e70271cdf/script.js",
    body: true
  });
  head.noscript.push({
    innerHtml: "<img src='https://shynet.jakewalker.xyz/ingress/a54b2aec-e9d5-41e3-ba04-b02e70271cdf/pixel.gif'>"
  });
}
