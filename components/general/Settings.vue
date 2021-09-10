<template>
  <form action=''>
    <div class='modal-card' style='width: auto'>
      <header class='modal-card-head'>
        <p class='modal-card-title'>Settings</p>
        <button
          type='button'
          class='delete'
          @click="$emit('close')" />
      </header>
      <section class='modal-card-body'>
        <b-button class='is-dark'>Delete Miner History</b-button>
        <b-button class='is-dark'>Delete Cache</b-button>
        <a href='https://ko-fi.com/michaelpereira' rel='noopener' target='_blank'>
          <b-button class='is-success'>
            <i class='fas fa-coffee'>Buy me a coffee</i>
          </b-button>
        </a>
      </section>
    </div>
  </form>
</template>


<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Settings extends Vue {
  launchDeleteMinerHistoryConfirmation() {

  }

  deleteMinerHistory() {

  }
}
</script>

<style scoped>
.modal-card {
  min-width: 300px;
  min-height: 300px;
}
</style>
