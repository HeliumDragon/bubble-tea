<template>
  <section class="customise grid grid-cols-2 gap-4 h-screen w-full p-4">
    <div class="flex align-middle justify-center text-center">
      <BubbleTeaDisplay
        v-if="tea"
        class="w-1/3 -mt-64"
        :base1="getColor(tea, 'base1')"
        :base2="getColor(tea, 'base2')"
        :base3="getColor(tea, 'base3')"
        :base4="getColor(tea, 'base4')"
        :icing="customIcingColor"
        :boba1="customBoba1Color"
        :boba2="customBoba2Color"
        :showStraw="false"
        :showLid="false"
        :showIcing="!!this.selectedIcing"
        :showBoba="!!this.selectedBoba"
      ></BubbleTeaDisplay>
    </div>
    <div class="gr">
      <h2 class="text-4xl mb-4">Customise Your Tea!</h2>
      <CustomiseForm
        :icings="icings"
        :bobas="bobas"
        :selectedBoba="selectedBoba"
        :selectedIcing="selectedIcing"
        v-on:customisation="handleCustomise"
      />
    </div>
  </section>
</template>

<script>
import CustomiseForm from '../components/Customise-Form';
import httpService from '../services/http-service';
import BubbleTeaDisplay from '../components/bubble-tea-display';
import colorCodes from '../data/ingredient-colors';

export default {
  data() {
    return {
      tea: null,
      selectedSize: 'Regular',
      selectedIcing: null,
      selectedBoba: null,
      icings: [],
      bobas: []
    };
  },
  components: {
    CustomiseForm,
    BubbleTeaDisplay
  },
  props: {
    id: {
      type: String
    }
  },
  computed: {
    unitPrice() {
      const sizeExtra = this.selectedSize === 'Large' ? 0.3 : 0;
      const icingExtra = this.selectedIcing ? 0.3 : 0;
      const bobaExtra = this.selectedBoba ? 0.3 : 0;
      return +(this.tea.price + sizeExtra + icingExtra + bobaExtra).toFixed(2);
    },
    customBoba1Color() {
      if (!this.selectedBoba) return '#000';
      const [boba1] = this.selectedBoba.color;
      return colorCodes[boba1];
    },
    customBoba2Color() {
      if (!this.selectedBoba) return '#000';
      const [boba1, boba2] = this.selectedBoba.color;
      return colorCodes[boba2] ? colorCodes[boba2] : colorCodes[boba1];
    },
    customIcingColor() {
      if (!this.selectedIcing) return colorCodes[this.tea.ingredients.icing];
      return colorCodes[this.selectedIcing.name];
    }
  },
  methods: {
    getColor(drink, prop) {
      return colorCodes[drink.ingredients[prop]];
    },

    handleCustomise(event) {
      const [eventType, item] = event;

      switch (eventType) {
        case 'size':
          this.selectedSize = item;
          break;
        case 'selectBobas':
          this.selectedBoba = item;
          break;
        case 'selectIcing':
          this.selectedIcing = item;
          break;
        case 'reset-toppings':
          this.remove();
          break;
        case 'reset-original':
          this.reset();
          break;
        case 'confirm':
          this.confirm();
          break;
        default:
          return;
      }
    },
    async confirm() {
      const selectedTea = {
        base: this.tea,
        size: this.selectedSize,
        boba: this.selectedBoba,
        icing: this.selectedIcing,
        quantity: 1,
        unitPrice: this.unitPrice
      };

      await httpService.post('cart', selectedTea);

      localStorage.setItem('chosenTeas', JSON.stringify(selectedTea));

      this.$router.replace('/');
    },
    remove() {
      this.selectedIcing = null;
      this.selectedBoba = null;
    },
    reset() {
      this.selectedBoba = this.bobas.find(i => i.name === 'classic');
      this.selectedIcing = this.icings.find(
        i => i.name === this.tea.ingredients.icing
      );
    }
  },
  async created() {
    const tea = await httpService.get(`teas/${this.id}`);
    this.tea = tea;

    const extras = await httpService.get(`extras`);
    this.icings = extras.icings.filter(i => i.name !== tea.ingredients.base1);
    this.bobas = extras.bobas;
    this.reset();
  }
};
</script>

<style scoped></style>
