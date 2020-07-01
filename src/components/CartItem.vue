<template>
  <div class="grid grid-cols-4 md:grid-cols-5 gap-2 bg-white border-b p-2 md:p-4">
    <div class="-mt-8 h-24 sm:h-32 hidden md:flex flex-col">
      <slot></slot>
    </div>

    <div class="flex flex-col justify-center items-center w-full">
      <h2 class="text-base font-bold">{{ item.base.name }}</h2>
      <hr />
      <p>{{item.unitPrice}}</p>
    </div>

    <div class="flex flex-col justify-center items-center">
      <div>
        <h3 class="font-bold text-base md:text-xl">Size</h3>
        <hr />
        <p class="mt-2">{{ item.base.options.size }}</p>
      </div>
    </div>

    <div class="flex flex-col justify-center items-center">
      <h3 class="font-bold text-base md:text-xl">Quantity</h3>
      <hr />
      <input
        class="text-center border p-2 w-3/5 focus:outline-none focus:shadow-outline"
        type="number"
        name="quantity"
        id="quantity"
        min="1"
        max="9"
        @input="updateQuantity(item)"
        v-model="item.quantity"
      />
    </div>

    <div class="flex justify-center items-center">
      <button
        @click="removeFromCart(item.id)"
        class="bg-red-500 text-gray-100 font-bold text-xs md:text-base focus:outline-none focus:shadow-outline rounded sm:rounded-lg mt-2 px-2 py-0 sm:p-2"
      >
        <span class="hidden sm:inline">Remove</span>
        <span class="sm:hidden">X</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cart-item',
  props: {
    item: Object
  },
  methods: {
    updateQuantity(event, item) {
      this.$emit('input', item);
    },
    removeFromCart() {
      this.$emit('remove-item');
    }
  }
};
</script>