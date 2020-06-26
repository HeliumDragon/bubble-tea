<template>
  <div class="flex flex-col ml-3">
    <div class="drink-container relative w-64 m-auto">
      <img
        v-if="selectedIcing"
        :src="getIcingPath()"
        :alt="img"
        class="w-11/12 absolute top-0 transform translate-y-15 translate-x-3"
      />
      <img
        v-if="selectedBoba"
        :src="getBobaPath()"
        :alt="img"
        class=" w-8/12 absolute bottom-0 origin-bottom-left transform translate-x-10 -translate-y-1"
      />
      <img :src="getImagePath(img)" :alt="img" />
    </div>
    <div class="mt-3 w-1/3 m-auto ">
      <h2 class="text-4xl">{{ name }}</h2>
      <p>{{ description }}</p>
      <hr class="my-4" />
      <p>{{ price }}</p>
    </div>
    <div class="extras w-1/3 m-auto">
      <div class="bobas">
        <button
          class="bg-green-100 px-3 py-3 m-3 font-semibold text-gray-700"
          :class="{ 'bg-green-400': selectedBoba.id === boba.id }"
          @click="selectedBoba = boba"
          v-for="boba in bobas"
          :key="boba.id"
        >
          {{ boba.name }}
        </button>
      </div>
      <div class="icings">
        <button
          class="bg-blue-100 px-3 py-3 m-3 font-semibold text-gray-700"
          :class="{ 'bg-blue-400': selectedIcing.id === icing.id }"
          @click="selectedIcing = icing"
          v-for="icing in icings"
          :key="icing.id"
        >
          {{ icing.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      selectedIcing: null,
      selectedBoba: null,
      icings: [],
      bobas: []
    };
  },
  props: {
    name: String,
    description: String,
    price: Number,
    img: String
  },
  created() {
    fetch(`http://localhost:5050/extras`)
      .then(response => response.json())
      .then(data => {
        this.icings = data.icings;
        this.bobas = data.bobas;
      });
  },
  methods: {
    getImagePath: function(fileName) {
      if (!fileName) {
        return;
      }
      return require.context('@/assets/base', false, /\.svg$/)(`./${fileName}`);
    },
    getBobaPath: function() {
      if (!this.selectedBoba) {
        return;
      }
      return require.context(
        '@/assets/boba',
        false,
        /\.svg$/
      )(`./${this.selectedBoba.svg}`);
    },
    getIcingPath: function() {
      if (!this.selectedIcing) {
        return;
      }
      return require.context(
        '@/assets/icing',
        false,
        /\.svg$/
      )(`./${this.selectedIcing.svg}`);
    }
  }
};
</script>

<style scoped>
.translate-y-15 {
  --transform-translate-y: 2.5rem;
}
</style>
