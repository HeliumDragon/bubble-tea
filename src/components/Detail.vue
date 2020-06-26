<template>
  <div class="flex flex-col ml-3">
    <div class="drink-container relative w-64 mx-auto">
      <img
        v-if="icing"
        :src="getIcingPath()"
        :alt="img"
        class="w-11/12 absolute top-0 transform translate-y-15 translate-x-3"
      />
      <img
        v-if="boba"
        :src="getBobaPath()"
        :alt="img"
        class=" w-8/12 absolute bottom-0 origin-bottom-left transform translate-x-10 -translate-y-1"
      />
      <img :src="getImagePath(img)" :alt="img" />
    </div>
    <div class="w-1/3 mt-8 mx-auto">
      <h2 class="text-4xl">{{ name }}</h2>
      <p>{{ description }}</p>
      <hr class="my-4" />
      <p class="font-bold text-lg">{{ price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      selectedIcing: null,
      selectedBoba: null
    };
  },
  props: {
    name: String,
    description: String,
    price: Number,
    img: String,
    boba: Object,
    icing: Object
  },
  methods: {
    getImagePath: function(fileName) {
      if (!fileName) {
        return;
      }
      return require.context('@/assets/base', false, /\.svg$/)(`./${fileName}`);
    },
    getBobaPath: function() {
      if (!this.boba) {
        return;
      }
      return require.context(
        '@/assets/boba',
        false,
        /\.svg$/
      )(`./${this.boba.svg}`);
    },
    getIcingPath: function() {
      if (!this.icing) {
        return;
      }
      return require.context(
        '@/assets/icing',
        false,
        /\.svg$/
      )(`./${this.icing.svg}`);
    }
  }
};
</script>

<style scoped>
.translate-y-15 {
  --transform-translate-y: 2.5rem;
}
</style>
