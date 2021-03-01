<template>
  <div class="layout">
    <section class="hero is-primary is-medium">
      <div class="hero-head">
        <NavBar :transparent="true"/>
      </div>

      <div class="hero-body">
        <div class="container has-text-centered">
          <g-image alt="Jake Walker Avatar" class="inline" src="~/assets/avatar.png" width="150" height="150" fit="inside"/>
          <p class="title is-1" v-text="$static.metadata.siteName"/>
        </div>
      </div>
    </section>


    <div id="content">
      <transition name="fade" appear>
        <main>
          <slot/>
        </main>
      </transition>
    </div>

    <Footer/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteDescription
  }
}
</static-query>

<script>
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default {
  components: {
    NavBar,
    Footer
  }
}
</script>

<style scoped>
  .layout {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  #content {
    flex: 1;
  }
</style>
