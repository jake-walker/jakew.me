# 🌐 jakew.me

[![GitHub last commit](https://img.shields.io/github/last-commit/jake-walker/jakew.me/source.svg?style=for-the-badge)](https://github.com/jake-walker/jakew.me/commits/source) [![Travis CI Status](https://img.shields.io/travis/com/jake-walker/jakew.me.svg?style=for-the-badge)](https://travis-ci.com/jake-walker/jakew.me) [![GitHub Repository Size](https://img.shields.io/github/repo-size/jake-walker/jakew.me.svg?style=for-the-badge)](https://github.com/jake-walker/jakew.me/tree/source)

<!-- TOC -->

- [Structure](#structure)
- [Custom Theme](#custom-theme)
  - [Structure](#structure-1)
- [Contributing](#contributing)

<!-- /TOC -->

---

This is my main website which contains my blog along with some social links and other things. This website is built using the [Hexo](https://hexo.io) static site generator and uses [Travis CI](https://travis-ci.com) to automatically build the `source` branch and push the generated site to the `master` branch.

This site is available at [https://jakew.me](https://jakew.me).

## Structure

As with all [Hexo](https://hexo.io) sites, there is 3 main directories:

* **`scaffolds`** where all the 'templates' for blog posts and pages are stored. These templates include placeholders for things like the date and title to be inserted.
* **`source`** where the 'raw' posts and pages are held. All these 'raw' posts and pages are written using Markdown, which is then converted to HTML and inserted into the theme once the site is generated.
* **`themes`** where all the site's HTML, CSS and JS is contained. In the `themes` folder there is a folder for each of the installed themes.

## Custom Theme

This site uses my own custom built theme which is in the themes folder (`themes/jake`).

### Structure

My custom theme is split up into 3 folders:

* **`layout`** where all of the HTML is contained, however, this isn't plain old HTML and is actually [EJS](https://ejs.co/). [EJS](https://ejs.co/) is an 'Embedded JavaScript templating' language which is essentially HTML with special tags (starting with `<%`) that let you embed server-side JavaScript. This server-side JavaScript allows us to insert the content from our `source` folder and insert them in.
  * **`partials`** are smaller, reusable bits of EJS code. I've made a couple of files for things that are used over a lot of the pages such as the footer, navigation bar, etc..
  * **`sidebar`** which contains all of the sidebar widgets for things like my GPG key, recent posts and the tag cloud.
* **`scripts`** which are JavaScript files that get included in the build process. I have a file in there called `gitinfo.js` which is a little helper file which gets the current Git commit (which I show in my footer).
* **`source`** which contains 'raw' files that are just placed into the generated code. I have some CSS and images in here which just get put into the root directory of the built website.

## Contributing

Feel free to open GitHub issues for things that I've missed out or mistakes that I've made 😀.