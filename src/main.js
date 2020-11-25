// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/assets/fonts/index.scss";
import "~/assets/style/globals.scss";
import DefaultLayout from "~/layouts/Default.vue";

// eslint-disable-next-line no-unused-vars
export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
}
