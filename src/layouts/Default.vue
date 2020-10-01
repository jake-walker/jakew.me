<template>
  <div class="layout">
    <div id="header" class="bg-gray-300 dark:bg-gray-900">
      <div class="container mx-auto text-center py-10">
        <g-image alt="Jake Walker Avatar" class="inline" src="~/assets/avatar.png" width="150" height="150" fit="inside"/>
        <g-link to="/">
          <h1 class="text-5xl tracking-tight font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text bg-repeat" id="site-title">{{ $static.metadata.siteName }}</h1>
        </g-link>
        <ul class="flex justify-center">
          <li class="mr-3" v-for="item in nav" :key="item.name">
            <g-link class="nav-link text-primary text-lg" exact-active-class="text-secondary underline" :to="item.path">{{ item.name }}</g-link>
          </li>
        </ul>
      </div>
    </div>

    <div id="content">
      <transition name="fade" appear>
        <main>
          <slot/>
        </main>
      </transition>
    </div>

    <div id="footer" class="bg-gray-200 dark:bg-gray-800">
      <div class="container mx-auto text-center py-2 text-gray-700 dark:text-gray-500 text-xs">
        <p>
          <span class="font-bold">{{ $static.metadata.siteName }}</span>
          &bull;
          <span class="">
            Powered by <a rel="nofollow noopener noreferrer" target="_blank" href="https://gridsome.org/" class="no-underline hover:underline text-primary dark:text-secondary">Gridsome</a>, <a rel="nofollow noopener noreferrer" target="_blank" href="https://tailwindcss.com/" class="no-underline hover:underline text-primary dark:text-secondary">Tailwind CSS</a> and <a rel="nofollow noopener noreferrer" target="_blank" href="https://www.netlify.com/" class="no-underline hover:underline text-primary dark:text-secondary">Netlify</a>.
            Licensed under the <a rel="nofollow noopener noreferrer" target="_blank" href="https://www.gnu.org/licenses/gpl-3.0.en.html" class="no-underline hover:underline text-primary dark:text-secondary">GNU GPL v3.0 licence</a> and source code is available on <a rel="nofollow noopener noreferrer" target="_blank" href="https://www.github.com/jake-walker/jakew.me" class="no-underline hover:underline text-primary dark:text-secondary">GitHub</a>.
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  data: () => ({
    nav: [
      {
        name: "Home",
        path: "/"
      },
      {
        name: "Blog",
        path: "/blog"
      },
      {
        name: "Contact",
        path: "/contact"
      }
    ]
  })
}
</script>

<style scoped>
  #site-title {
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
  }

  .nav-link.underline {
    text-decoration: none;
    border-bottom: 2px solid currentColor;
  }

  .nav-link:hover {
    text-decoration: none;
    border-bottom: 2px solid currentColor;
  }

  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter {
    opacity: 0;
  }

  .layout {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  #content {
    flex: 1;
  }
</style>
