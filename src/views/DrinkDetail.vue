<template>
  <div class="grid grid-cols-5 gap-6">
    <div class="drink-card" v-for="item in drinks" :key="item.id">
      <BubbleTeaDisplay
        :base2="getColor(item)"
        :base3="getColor(item)"
        base1="#eee"
        base4="#cae"
        :icing="colorCodes.watermelonDeep"
        :showStraw="false"
      >
      </BubbleTeaDisplay>
      <img :src="getImagePath(item.productImageFile)" :alt="img" />
      <div class="text-sm font-mono font-semibold">{{ item.name }}</div>
      <div class="text-sm font-mono font-semibold">{{ item.color }}</div>
    </div>
  </div>
</template>

<script>
import BubbleTeaDisplay from '../components/bubble-tea-display';
import httpService from '../services/http-service';
import colorCodes from './dict';
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
    getImagePath: function(fileName) {
      if (!fileName) {
        return;
      }
      return require.context('@/assets/full', false, /\.svg$/)(`./${fileName}`);
    },
    getColor(drink) {
      return colorCodes[drink.color[0]];
    }
  }
};
</script>

<style lang="scss" scoped></style>
