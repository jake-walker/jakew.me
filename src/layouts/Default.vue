<template>
  <div class="layout">
    <div id="header" class="bg-gray-300">
      <div class="container mx-auto text-center py-10">
        <g-image class="inline" src="~/assets/avatar.png" width="150" height="150" fit="inside"/>
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
    <slot/>
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
</style>
