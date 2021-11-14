<template>
  <div>
    <i class="fas fa-exclamation-circle"></i>
    <i class="fas fa-redo"></i>
  </div>
</template>

<script lang='ts'>
import {Component, Prop, Vue} from 'nuxt-property-decorator'

@Component
export default class Footer extends Vue {
  @Prop() private action!: string

  get isHomePage(): boolean {
    return this.$store.getters.isHomePage
  }
}
</script>
