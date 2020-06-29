<template>
  <section class="flex flex-col items-center h-screen w-full p-4">
    <h1 class="text-5xl">Your Cart</h1>

    <div class="mt-2 grid md:grid-cols-3 gap-4 w-full lg:w-5/6 xl:w-3/4">
      <div class="mt-8 p-2 md:col-span-2">
        <div
          class="grid grid-cols-4 md:grid-cols-5 gap-2 bg-white border-b p-2 md:p-4"
          v-for="item in cart"
          :key="item.id"
        >
          <div class="h-24 sm:h-32 flex flex-col self-center">
            <BubbleTeaDisplay
              :base1="getColor(item, 'base1')"
              :base2="getColor(item, 'base2')"
              :base3="getColor(item, 'base3')"
              :base4="getColor(item, 'base4')"
              :icing="getColor(item, 'icing')"
              :boba1="getColor(item, 'bobas', 0)"
              :boba2="getColor(item, 'bobas', 1)"
            ></BubbleTeaDisplay>
          </div>
          <h2
            class="flex justify-center items-center w-full text-base sm:font-bold"
          >{{ item.base.name }}</h2>

          <div class="flex flex-col justify-center items-center">
            <div>
              <h3 class="font-bold text-base md:text-xl">Size</h3>
              <hr />
              <p class="mt-2">{{ item.base.options.size }}</p>
            </div>
          </div>

          <div class="hidden md:flex md:flex-col justify-center items-center">
            <div v-if="item.ingredients.bobas">
              <h4 class="font-bold text-base">Bobas</h4>
              <hr />
              <ul class="mt-2">
                <li
                  class="capitalize inline-block"
                  :class="{'mr-1': index !== item.ingredients.bobas.length - 1}"
                  v-for="(boba, index) in item.ingredients.bobas"
                  :key="boba"
                >
                  {{boba}}
                  <span v-if="index !== item.ingredients.bobas.length - 1">|</span>
                </li>
              </ul>
            </div>
            <div class="ml-4 md:ml-0" v-if="item.ingredients.icing">
              <h4 class="font-bold text-base">Icing</h4>
              <hr />
              <p class="mt-2 capitalize">{{ item.ingredients.icing }}</p>
            </div>
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
      </div>
      <div>
        <h2 class="text-4xl">Order</h2>
        <hr />
        <h3 class="mt-4 text-2xl">
          Total Price
          <span class="text-lg">({{ totalItemsText }})</span>
        </h3>
        <p class="font-bold text-lg">{{ totalPrice }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import BubbleTeaDisplay from '../components/BubbleTeaDisplay';
import httpService from '../services/http-service';
import { colorCodes } from '../data/ingredient-colors';

export default {
  data() {
    return {
      cart: []
    };
  },
  components: {
    BubbleTeaDisplay
  },
  methods: {
    getColor(drink, prop, index) {
      let ingredient = drink.ingredients[prop];

      if (index !== undefined) {
        ingredient = ingredient[index];
      }

      return colorCodes[ingredient];
    },
    async removeFromCart(cartItemId) {
      await httpService.delete(`cart/${cartItemId}`);
      this.cart = this.cart.filter(item => item.id !== cartItemId);
    }
  },
  computed: {
    totalItemsText() {
      const numberOfCartItems = this.cart.length;
      return `${numberOfCartItems} item${numberOfCartItems !== 1 ? 's' : ''}`;
    },
    totalPrice() {
      return this.cart
        .reduce((prev, current) => {
          return (prev += current.unitPrice);
        }, 0)
        .toFixed(2);
    }
  },
  async created() {
    const cart = await httpService.get(`cart`);
    this.cart = cart;
  }
};
</script>

<style scoped>
</style>