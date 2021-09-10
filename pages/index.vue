<template>
  <section>
    <Home />
  </section>
</template>

<script lang='ts'>
import { Vue } from 'vue-property-decorator'
import Component from 'vue-class-component'
import Home from '~/components/sections/Home.vue'

@Component({
  components: {
    Home
  }
})
export default class Index extends Vue {
}
</script>
