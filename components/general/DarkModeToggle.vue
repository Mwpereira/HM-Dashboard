<template>
  <b-field>
    <b-switch
      v-model='isDarkModeActive'
      passive-type='is-dark'
      type='is-warning'>
    </b-switch>
  </b-field>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class DarkModeToggle extends Vue {
  get isDarkModeActive(): boolean {
    return this.$store.getters.isDarkModeActive
  }

  private darkModeToggle(): void {
    this.$store.commit('darkModeToggle')
  }
}
</script>

