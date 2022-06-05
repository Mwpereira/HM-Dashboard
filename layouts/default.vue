<template>
  <div>
    <NavBar />
    <section class='main-content columns'>
      <div class='container column is-10'>
        <Nuxt />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator';
import Footer from '~/components/general/Footer.vue';
import NavBar from '~/components/general/NavBar.vue';

@Component({
	components: {
		Footer,
		NavBar,
	}
})
export default class Default extends Vue {
}
</script>

<style>
html, body {
  overflow-x: hidden;
  scroll-padding: 14vh;
}

@media screen and (max-width: 1500px) {
  html, body {
    scroll-padding: 16vh;
  }
}

@media screen and (max-width: 768px) {
  html, body {
    scroll-padding: 18vh;
  }

  .toast div {
    color: white !important;
  }

  .toast.is-success {
    background-color: rgb(70, 201, 58) !important;
    opacity: 1;
  }

  .toast.is-warning {
    background-color: rgb(255, 186, 0) !important;
    opacity: 1;
  }

  .toast.is-danger {
    background-color: rgb(255, 71, 87) !important;
    opacity: 1;
  }

  .toast.is-info {
    background-color: rgb(59, 222, 200) !important;
    opacity: 1;
  }
}
</style>
