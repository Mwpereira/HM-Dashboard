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
import { Component, Vue } from 'nuxt-property-decorator'
import Footer from '~/components/general/Footer.vue'
import NavBar from '~/components/general/NavBar.vue'

@Component({
  components: {
    NavBar,
    Footer
  }
})
export default class Default extends Vue {
}
</script>
