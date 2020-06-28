<template>
  <section class="shop flex flex-col p-4 h-full">
    <h1 class="text-5xl mb-8">Bubble Tea Menu</h1>

    <div class="grid grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="tea in teas"
        v-bind:key="tea.id"
        class="mb-4 p-4 shadow-lg hover:shadow-md transition-shadow duration-500 ease-out cursor-pointer"
      >
        <router-link :to="{ name: 'Customise', params: { id: tea.id } }">
          <div class="flex flex-col items-center">
            <div class="w-1/3">
              <BubbleTeaDisplay
                :base1="getColor(tea, 'base1')"
                :base2="getColor(tea, 'base2')"
                :base3="getColor(tea, 'base3')"
                :base4="getColor(tea, 'base4')"
                :icing="getColor(tea, 'icing')"
                boba1="#000"
                boba2="#000"
              ></BubbleTeaDisplay>
            </div>
            <div class="w-full p-4">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl">{{ tea.name }}</h2>
                <span class="price text-base p-2 rounded-full">
                  £ {{
                  tea.price
                  }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import BubbleTeaDisplay from '../components/BubbleTeaDisplay';
import { colorCodes } from '../data/ingredient-colors';

export default {
  name: 'Shop',
  components: {
    BubbleTeaDisplay
  },
  props: {
    teas: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getColor(drink, prop) {
      return colorCodes[drink.ingredients[prop]];
    }
  }
};
</script>

<style scoped>
.price {
  background-color: #02bfff;
  color: #fff;
}
</style>
