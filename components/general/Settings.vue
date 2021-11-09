<template>
  <form>
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
          <div class="column is-12 pt-4">
            <b-button class='settings-button is-fullwidth' @click="removeMinerHistory">Delete Miner History</b-button>
          </div>
          <div class="column is-12">
            <b-button class='settings-button is-fullwidth' @click="removeFavourites">Delete Favourites</b-button>
          </div>
          <div class="column is-12">
            <b-button class='settings-button is-fullwidth' @click="removeRecentlyViewed">Delete Recently Viewed</b-button>
          </div>
          <div class="column is-12 pb-4">
            <b-button class='settings-button is-fullwidth' @click="removeAllData">Delete All Cache</b-button>
          </div>
        </div>
      </section>
    </div>
  </form>
</template>


<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator'
import BuefyService from "~/services/buefy-service";
import MessageConstants from "~/constants/message-constants";

@Component
export default class Settings extends Vue {
  removeAllData(): void {
    this.redirectToHomePage('removeAllData');
  }

  removeFavourites(): void {
    this.redirectToHomePage('removeFavourites');
  }

  removeMinerHistory(): void {
    this.redirectToHomePage('removeMinerHistory');
  }

  removeRecentlyViewed(): void {
    this.redirectToHomePage('removeRecentlyViewed');
  }

  redirectToHomePage(action: string): void {
    try {
      this.$store.commit(action)
      this.$router.push('/');
      BuefyService.successToast(MessageConstants.SUCCESS_DELETING_CACHE);
      this.$emit('close')
    } catch {
      BuefyService.successToast(MessageConstants.ERROR_DELETING_CACHE);
    }
  }
}
</script>

<style scoped>
.modal-card {
  max-width: 300px;
  border-radius: 6px;
}

.column.is-12{
  padding: 10px;
}

@media screen and (max-width: 768px) {
  .modal-card {
    max-width: unset;
    margin: 30px !important;
  }
}
</style>
