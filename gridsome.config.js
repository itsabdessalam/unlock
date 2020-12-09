// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
require("dotenv").config();

const purgeConfig = {
  keyframes: false,
  content: [
    "./src/**/*.vue",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./src/**/*.html",
    "./src/**/*.pug",
    "./src/**/*.md",
    "./src/**/*.svg"
  ],
  whitelist: [
    "body",
    "html",
    "img",
    "a",
    "g-image",
    "g-image--lazy",
    "g-image--loaded",
    "active",
    "active--exact",
    "checkbox__input"
  ],
  whitelistPatterns: [
    /shiki/,
    /prism/,
    /token$/,
    /markdown/,
    /rich-text/,
    /richtext/,
    /.*-(enter|enter-active|enter-to|leave|leave-active|leave-to)/,
    /data-v-.*/,
    /data-device/,
    />>>/,
    /::v-deep/,
    /alert-.*/
  ],
  defaultExtractor: content => {
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  }
};

module.exports = {
  siteName: "Unlock",

  chainWebpack: config => {
    ["css", "scss", "sass", "less", "stylus", "postcss"].forEach(lang => {
      config.module
        .rule(lang)
        .oneOf("normal")
        .use("postcss-loader")
        .tap(options => {
          options.plugins = [];
          options.plugins.push(
            require("autoprefixer")(),
            require("cssnano")({
              preset: [
                "default",
                {
                  discardComments: {
                    removeAll: true
                  },
                  discardUnused: true,
                  mergeIdents: true
                }
              ]
            })
          );

          if (process.env.NODE_ENV === "production") {
            options.plugins.push(
              require("@fullhuman/postcss-purgecss")(purgeConfig)
            );
          }

          options.plugins.push(require("css-mqpacker")());

          return options;
        });
    });
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "${require("path").resolve(
          __dirname,
          "./src/assets/style/_variables.scss"
        )}";`
      }
    }
  }
};
