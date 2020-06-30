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
          <div class="-mt-8 h-24 sm:h-32 hidden md:flex flex-col">
            <BubbleTeaDisplay
              :base1="getColor(item, 'base1')"
              :base2="getColor(item, 'base2')"
              :base3="getColor(item, 'base3')"
              :base4="getColor(item, 'base4')"
              :icing="getColor(item, 'icing')"
              :boba1="getColor(item, 'bobas', 0)"
              :boba2="getColor(item, 'bobas', 1)"
              :showStraw="false"
            ></BubbleTeaDisplay>
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
              @input="handleItemQuantity(item)"
              v-model.number="item.quantity"
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
      </div>
      <div>
        <h2 class="text-4xl">Order</h2>
        <hr />
        <h3 class="mt-4 text-2xl">
          Total Price
          <span class="text-lg">({{ totalItemsText }})</span>
        </h3>
        <p class="font-bold text-lg">{{ totalPrice }}</p>

        <button
          v-if="cart.length"
          @click="order"
          class="font-bold text-base focus:outline-none focus:shadow-outline rounded-lg mt-2 p-2"
        >Order</button>
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
    handleItemQuantity(item) {
      this.cart = this.cart.map(cItem => {
        if (cItem.id === item.id) {
          cItem.quantity = this.roundedQuantity(item.quantity);
        }

        return cItem;
      });
    },
    roundedQuantity(quantity) {
      return Math.round(quantity);
    },
    order() {
      console.log(this.cart);
    },
    async removeFromCart(cartItemId) {
      await httpService.delete(`cart/${cartItemId}`);
      this.cart = this.cart.filter(item => item.id !== cartItemId);
    }
  },
  computed: {
    totalOfCartItemQuantities() {
      return this.cart.reduce((prev, current) => {
        if (typeof current.quantity !== 'number') {
          return prev;
        }
        return (prev += this.roundedQuantity(current.quantity));
      }, 0);
    },
    totalItemsText() {
      const numberOfCartItems = this.cart.length;

      return `${this.totalOfCartItemQuantities} item${
        numberOfCartItems !== 1 ? 's' : ''
      }`;
    },
    totalPrice() {
      return this.cart
        .reduce((prev, current) => {
          return (prev +=
            current.unitPrice * this.roundedQuantity(current.quantity));
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