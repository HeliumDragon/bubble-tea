<template>
  <div class="grid grid-cols-5 gap-6">
    <div class="drink-card" v-for="item in drinks" :key="item.id">
      <BubbleTeaDisplay
        :base1="getColor(item, 'base1')"
        :base2="getColor(item, 'base2')"
        :base3="getColor(item, 'base3')"
        :base4="getColor(item, 'base4')"
        :icing="getColor(item, 'icing')"
        boba1="#000"
        boba2="#000"
        :showStraw="false"
      ></BubbleTeaDisplay>
      <div class="text-sm font-mono font-semibold">{{ item.name }}</div>
      <div class="text-sm font-mono font-semibold">{{ item.color }}</div>
    </div>
  </div>
</template>

<script>
import BubbleTeaDisplay from '../components/BubbleTeaDisplay';
import httpService from '../services/http-service';
import { colorCodes } from '../data/ingredient-colors';
export default {
  components: {
    BubbleTeaDisplay
  },
  data() {
    return {
      drinks: [],
      colorCodes
    };
  },
  async created() {
    const data = await httpService.get('teas/');
    this.drinks = data;
  },
  methods: {
    getColor(drink, prop) {
      return colorCodes[drink.ingredients[prop]];
    }
  }
};
</script>

