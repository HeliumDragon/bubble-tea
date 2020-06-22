<template>
  <div id="app">
    <Hero />
    <Shop />
  </div>
</template>

<script>
import Hero from './components/Hero';
import Shop from './components/Shop';

export default {
  name: 'App',
  components: {
    Hero,
    Shop,
  },
};
</script>
