<template>
  <section>
    <Home />
  </section>
</template>

<script lang='ts'>
import {Component, Vue} from 'nuxt-property-decorator';
import Home from '~/components/sections/Home.vue';

@Component({
	components: {
		Home
	}
})
export default class Index extends Vue {
}
</script>
