<template>
  <div class="flex flex-col">
    <div class="drink-container">
      <img :src="getImagePath(img)" :alt="img" class="m-auto w-64" />
      <img :src="getIcingPath()" :alt="img" class="w-48 mx-auto" />
      <img :src="getBobaPath()" :alt="img" class="w-40 mx-auto" />
    </div>
    <div class="mt-3">
      <h2 class="text-4xl">{{ name }}</h2>
      <p>{{ description }}</p>
      <hr class="my-4" />
      <p>{{ price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    name: String,
    description: String,
    price: Number,
    img: String
  },
  methods: {
    getImagePath: function(fileName) {
      if (!fileName) {
        return;
      }
      return require.context('@/assets/base', false, /\.svg$/)(`./${fileName}`);
    },
    getBobaPath: function() {
      return require.context('@/assets/boba', false, /\.svg$/)(`./classic.svg`);
    },
    getIcingPath: function() {
      return require.context('@/assets/icing', false, /\.svg$/)(`./coco.svg`);
    }
  }
};
</script>

<style scoped></style>
