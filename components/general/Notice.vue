<template>
  <div>
    <b-tooltip
      label="Out of date information. The Helium API servers did not respond successfully" type='is-danger'>
      <i class="fas fa-exclamation-circle ml-5 mr-5 mt-3" style="color: orange"></i>
    </b-tooltip>
    <b-tooltip
      label="Retry loading data" type='is-dark'>
      <i class="fas fa-redo" id="refresh" @click="loadingComp"></i>
    </b-tooltip>
  </div>
</template>

<script lang='ts'>
import {Component, Emit, Prop, Vue} from 'nuxt-property-decorator'

@Component({})
export default class Notice extends Vue {
  @Prop() private action!: string

  private isLoading = false;

  @Emit()
  loadingComp() {
    return this.isLoading;
  }
}
</script>

<style>
#refresh {
  cursor: pointer;
}
</style>
