<template>
  <section class="shop flex flex-col p-4 h-full">
    <h1 class="text-5xl mb-8">Bubble Tea Menu</h1>

    <div class="grid grid-cols-3 gap-4">
      <div v-for="tea in teas" v-bind:key="tea.id">
        <div class="flex flex-col items-center mb-4">
          <div class="w-1/4">
            <img :src="getImagePath(tea.productImageFile)" />
          </div>
          <div class="w-full p-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-4xl">
                {{ tea.name }}
              </h2>
              <span class="price text-base p-2 rounded-full">{{
                tea.price
              }}</span>
            </div>

            <p class="leading-relaxed">{{ tea.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import teas from '../data/teas.json';

export default {
  name: 'Shop',
  data: function() {
    return {
      teas,
    };
  },
  methods: {
    getImagePath: function(fileName) {
      const path = require.context(
        '@/assets/full',
        false,
        /\.svg$/
      )(`./${fileName}`);

      return path;
    },
  },
};
</script>

<style scoped>
.shop {
  background-color: floralwhite;
}

.price {
  background-color: #02bfff;
  color: #fff;
}
</style>
