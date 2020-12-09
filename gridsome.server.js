// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const getChecklist = actions => {
  const checklist = require("./src/data/checklist.json");
  const collection = actions.addCollection({
    typeName: "Checklist"
  });

  for (const item of checklist) {
    collection.addNode(item);
  }
};

const getResources = actions => {
  const resources = require("./src/data/resources.json");
  const collection = actions.addCollection({
    typeName: "Resource"
  });

  for (const item of resources) {
    collection.addNode(item);
  }
};

module.exports = api => {
  api.loadSource(async actions => {
    getChecklist(actions);
    getResources(actions);
  });
  api.createPages(({ createPage }) => {
    createPage({
      path: "/",
      component: "./src/pages/Tester.vue"
    });
  });
};
