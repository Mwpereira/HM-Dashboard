<template>
  <footer class='footer has-text-centered py-6' :class="{ 'is-hidden': isHomePage }">
    <div class='content has-text-centered'>
      <p>
        Designed & Built by
        <a href='https://mwpereira.ca/' rel='noopener' target='_blank'>Michael Pereira</a>
      </p>
    </div>
  </footer>
</template>

<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Footer extends Vue {
	get isHomePage(): boolean {
		return this.$store.getters.isHomePage;
	}
}
</script>
