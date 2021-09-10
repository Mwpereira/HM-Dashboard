<template>
  <form action=''>
    <div class='modal-card' style='width: auto'>
      <header class='modal-card-head'>
        <p class='modal-card-title'>Settings</p>
        <button
          type='button'
          class='delete'
          @click="$emit('close')"/>
      </header>
      <section class='modal-card-body'>
        <div class="columns is-multiline">
          <div class="column is-12">
            <b-button class='is-danger-mc is-fullwidth' @click="removeMinerHistory">Delete Miner History</b-button>
          </div>
          <div class="column is-12">
            <b-button class='is-danger-mc is-fullwidth' @click="removeFavourites">Delete Favourites</b-button>
          </div>
          <div class="column is-12">
            <b-button class='is-danger-mc is-fullwidth' @click="removeRecentlyViewed">Delete Recently Viewed</b-button>
          </div>
          <div class="column is-12">
            <b-button class='is-danger-mc is-fullwidth' @click="removeAllData">Delete All Cache</b-button>
          </div>
        </div>
      </section>
    </div>
  </form>
</template>


<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import BuefyService from "~/services/buefy-service";

@Component
export default class Settings extends Vue {
  removeAllData() {
    this.$store.commit('removeAllData')
    this.redirectToHomePage('Success');
  }

  removeFavourites() {
    this.$store.commit('removeFavourites')
    this.redirectToHomePage('Success');
  }

  removeMinerHistory() {
    this.$store.commit('removeMinerHistory')
    this.redirectToHomePage('Success');
  }

  removeRecentlyViewed() {
    this.$store.commit('removeRecentlyVisited')
    this.redirectToHomePage('Success');
  }

  redirectToHomePage(message: string) {
    this.$router.push('/');
    BuefyService.successToast(message);
    this.$emit('close')
  }
}
</script>

<style scoped>
.modal-card {
  max-width: 300px;
  max-width: 300px;
}

/*.button.is-danger-mc {*/
/*  background-color: rgb(215, 14, 80);*/
/*  border-color: rgb(242, 19, 93) !important;*/
/*  color: white !important;*/
/*}*/

/*.is-danger-mc:hover {*/
/*  background-color: rgb(188, 12, 70) !important;*/
/*}*/
</style>
