<template>
  <section class="h-screen w-full p-4">
    <h1 class="text-5xl">Your Cart</h1>

    <div class="grid grid-cols-3 gap-4">
      <div class="mt-8 col-span-2">
        <div
          class="grid grid-cols-4 gap-4 bg-white border-bottom p-4"
          v-for="item in cart"
          :key="item.id"
        >
          <h2 class="text-4xl w-full">{{ item.base.name }}</h2>

          <div>
            <h3 class="font-bold text-xl">Size</h3>
            <p>{{ item.base.options.size }}</p>
          </div>

          <div>
            <h3 class="font-bold text-xl" v-if="item.boba || item.icing">Extras</h3>

            <div v-if="item.boba">
              <h4 class="text-lg">Bobas</h4>
              <p>{{ item.boba.name }}</p>
            </div>
            <div v-if="item.icing">
              <h4 class="text-lg">Icing</h4>
              <p>{{ item.icing.name }}</p>
            </div>
          </div>

          <div>
            <button class="font-bold border rounded-lg mt-2 p-2">Remove</button>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-4xl">Order</h2>
        <hr />
      </div>
    </div>
  </section>
</template>

<script>
import httpService from '../services/http-service';

export default {
  data() {
    return {
      cart: []
    };
  },
  async created() {
    const cart = await httpService.get(`cart`);
    this.cart = cart;
  }
};
</script>

<style scoped>
</style>