const fs = require("fs");
const yaml = require("js-yaml");

const navContents = fs.readFileSync("./src/data/nav.yaml", "utf8");
const navItems = yaml.load(navContents);

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    const navCollection = addCollection({
      typeName: 'NavItems'
    })

    for (const navItem of navItems) {
      navCollection.addNode(navItem);
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
