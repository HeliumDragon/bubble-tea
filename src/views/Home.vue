<template>
  <div class="home">
    <Hero />
    <Shop :teas="teas" />
  </div>
</template>

<script>
import Hero from '../components/Hero';
import Shop from '../components/Shop';

export default {
  name: 'Home',
  data() {
    return {
      teas: [],
    };
  },
  components: {
    Hero,
    Shop,
  },
  created() {
    fetch('http://localhost:5050/teas/')
      .then((response) => response.json())
      .then((data) => (this.teas = data));
  },
};
</script>
