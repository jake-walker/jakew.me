const git = require("git-rev-sync");

hexo.extend.helper.register("gitinfo", function() {
  return `Version ${git.short()} (${git.message()})`;
});