// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
require("dotenv").config();

module.exports = {
  siteName: "mypasswd",

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
