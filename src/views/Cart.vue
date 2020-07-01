<template>
  <section class="flex flex-col items-center h-screen w-full p-4">
    <h1 class="text-5xl">Your Cart</h1>

    <div class="mt-2 grid md:grid-cols-3 gap-4 w-full lg:w-5/6 xl:w-3/4">
      <div class="mt-8 p-2 md:col-span-2">
        <CartItem
          v-for="item in cart"
          :key="item.id"
          :item="item"
          @input="handleItemQuantity(item)"
          v-on:remove-item="removeFromCart(item.id)"
        >
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
        </CartItem>
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
import CartItem from '../components/CartItem';
import httpService from '../services/http-service';
import { colorCodes } from '../data/ingredient-colors';

export default {
  data() {
    return {
      cart: []
    };
  },
  components: {
    BubbleTeaDisplay,
    CartItem
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