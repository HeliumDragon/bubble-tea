<template>
  <div class="home">
    <Hero v-on:scrollTo="scrollTo" />
    <Shop :teas="teas" />
  </div>
</template>

<script>
import Hero from '../components/Hero';
import Shop from '../components/Shop';
import httpService from '../services/http-service';

export default {
  name: 'Home',
  data() {
    return {
      teas: []
    };
  },
  components: {
    Hero,
    Shop
  },
  methods: {
    scrollTo() {
      const el = document.querySelector('.shop');

      console.log(el);

      el.scrollIntoView({ behavior: 'smooth' });
    }
  },
  created() {
    httpService.get('teas/').then(data => (this.teas = data));
  }
};
</script>
