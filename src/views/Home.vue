<template>
  <div class="home">
    <Hero />
    <Shop />
  </div>
</template>

<script>
import Hero from '../components/Hero';
import Shop from '../components/Shop';

export default {
  name: 'Home',
  components: {
    Hero,
    Shop,
  },
};
</script>
