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
            <b-button class='settings-button is-fullwidth' @click="resetRecentlyViewed">Delete Recently Viewed
            </b-button>
          </div>
          <div class="column is-12 pb-4">
            <b-button class='settings-button is-fullwidth' @click="removeAllData">Delete All Cache</b-button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-4 is-4-mobile pb-4">
            <a href="https://ko-fi.com/michaelpereira" target="_blank" rel="noopener">
              <b-button class='coffee is-fullwidth'><i class="fas fa-coffee"></i></b-button>
            </a>
          </div>
          <div class="column is-4 is-4-mobile pb-4 is-dark">
            <a href="https://github.com/Mwpereira/HM-Dashboard" target="_blank" rel="noopener">
              <b-button class='github is-fullwidth'><i class="fab fa-github-alt"></i></b-button>
            </a>
          </div>
          <div class="column is-4 is-4-mobile pb-4">
            <a href="https://mwpereira.ca/#contact" target="_blank" rel="noopener">
              <b-button class='chat is-fullwidth'><i class="far fa-comments"></i></b-button>
            </a>
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

  resetRecentlyViewed(): void {
    this.redirectToHomePage('resetRecentlyViewed');
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

.column.is-12 {
  padding: 10px;
}

.coffee {
  background-color: #ffbd16 !important;
}

.github {
  background-color: #323232 !important;
}

.chat {
  background-color: #2c65c2 !important;
}

.coffee, .github, .chat {
  border-color: transparent !important;
  color: white;
}

.coffee:hover, .github:hover, .chat:hover {
  color: white !important;
}

.coffee:hover {
  background-color: #fbc43c !important;
}

.github:hover {
  background-color: #3d3d3d !important;
}

.chat:hover {
  background-color: #497edf !important;
}

@media screen and (max-width: 768px) {
  .modal-card {
    max-width: unset;
    margin: 30px !important;
  }
}
</style>
