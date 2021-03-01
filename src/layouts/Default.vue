<template>
  <div class="layout">
    <NavBar/>

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
