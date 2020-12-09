// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "~/assets/fonts/index.scss";
import "~/assets/style/globals.scss";
import DefaultLayout from "~/layouts/Default.vue";

// eslint-disable-next-line no-unused-vars
export default function(Vue, { appOptions, router, head, isClient }) {
  Vue.component("Layout", DefaultLayout);

  if (process.isClient) {
    router.beforeEach((to, from, next) => {
      if (to.fullPath === "/") {
        next("/tester");
      } else {
        next();
      }
    });
  }
}
