// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(async actions => {
    const Checklist = require("./src/data/checklist.json");

    const collection = actions.addCollection({
      typeName: "Checklist"
    });

    for (const item of Checklist) {
      collection.addNode(item);
    }
  });
  api.createPages(({ createPage }) => {
    createPage({
      path: "/",
      component: "./src/pages/Tester.vue"
    });
  });
};
