<template>
  <div id="location">
    <p class='title my-6'>Location</p>
    <div class='columns is-centered has-text-centered is-multiline is-size-5'>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's current city" type='is-dark'>
          <p class='is-size-3 m-4'>{{ geocode ? geocode.short_city : 'N/A' }}</p>
          <p><i class="fas fa-city my-4 mr-4" style='color: silver'></i>City</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's current country" type='is-dark'>
          <p class='is-size-3 m-4'>{{ geocode ? geocode.short_country : 'N/A' }}</p>
          <p><i class="fas fa-flag my-4 mr-4" style='color: orange'></i>Country</p>
        </b-tooltip>
      </div>
      <div class='column box m-4'>
        <b-tooltip
          label="Hotspot's location hex" type='is-dark'>
          <p class='is-size-3 m-4'>
            {{ miner.location_hex ? miner.location_hex : 'N/A' }}</p>
          <p><i class="fab fa-first-order my-4 mr-4" style='color: rebeccapurple'></i>Location Hex</p>
        </b-tooltip>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';
import {Miner} from '~/interfaces/Miner';

@Component
export default class Rewards extends Vue {
  @Prop() private minerName!: string

  get geocode(): object {
  	return this.miner.geocode;
  }

  get miner(): Miner {
  	return this.$store.getters.miners[this.minerName];
  }
}
</script>
