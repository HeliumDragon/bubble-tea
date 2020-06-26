<template>
  <div class="flex flex-col items-center w-full bg-white py-4">
    <div class="p-4 w-1/3">
      <h2 class="font-bold">Size</h2>

      <div class="flex flex-col justify-center py-4">
        <div class="flex justify-between items-baseline px-1">
          <label for="regular" class="text-left w-full">Regular</label>
          <input
            type="radio"
            id="regular"
            value="Regular"
            v-model="size"
            @change="$emit('customisation', ['size', size])"
          />
        </div>

        <div class="flex justify-between items-baseline px-1">
          <label for="large" class="text-left w-full mb-2">Large</label>
          <input
            type="radio"
            id="large"
            value="Large"
            v-model="size"
            @change="$emit('customisation', ['size', size])"
          />
        </div>
      </div>
    </div>

    <div class="extras">
      <h2 class="font-bold">Extras</h2>

      <div class="bobas">
        <h3>Bobas</h3>
        <button
          class="bg-green-100 px-3 py-3 m-3 font-semibold text-gray-700"
          :class="{
            'bg-green-400': selectedBoba && selectedBoba.id === boba.id
          }"
          @click="$emit('customisation', ['selectBobas', boba])"
          v-for="boba in bobas"
          :key="boba.id"
        >
          {{ boba.name }}
        </button>
      </div>
      <div class="icings">
        <h3>Icings</h3>
        <button
          class="bg-blue-100 px-3 py-3 m-3 font-semibold text-gray-700"
          :class="{
            'bg-blue-400': selectedIcing && selectedIcing.id === icing.id
          }"
          @click="$emit('customisation', ['selectIcing', icing])"
          v-for="icing in icings"
          :key="icing.id"
        >
          {{ icing.name }}
        </button>
      </div>
    </div>

    <hr class="my-4" />

    <div class="flex justify-end p-4">
      <button
        @click="$emit('customisation', ['reset-toppings'])"
        class="confirm-options-btn font-bold border rounded-lg p-4 mr-8"
      >
        Remove Extras
      </button>

      <button
        @click="$emit('customisation', ['confirm'])"
        class="confirm-options-btn font-bold border rounded-lg p-4"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 'Regular'
    };
  },
  props: {
    selectedBoba: Object,
    selectedIcing: Object,
    icings: {
      type: Array,
      default: () => []
    },
    bobas: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.confirm-options-btn {
  background-color: #02bfff;
  color: white;
}
</style>
