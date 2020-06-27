<template>
  <section v-if="tea" class="customise grid grid-cols-2 gap-4 h-screen w-full p-4">
    <div class="flex flex-col text-center">
      <p class="mt-2 font-semibold text-2xl">{{tea.name}}</p>
      <p class="mt-1 font-semibold">£{{unitPrice}}</p>
      <p class="mt-1 text-gray-700">{{tea.description}}</p>

      <div
        id="ingredients"
        class="mt-6"
        :class="{ '-mb-6':  selectedSize !== 'Regular', '-mb-10': selectedSize === 'Regular'}"
      >
        <span
          v-for="val in  Array.from(new Set(Object.values(ingredients))).filter(a => !!a && a !== 'black')"
          class="px-2 py-1 text-sm font-semibold tracking-tight text-white mr-2 rounded shadow-md"
          :style="{'background':colorCodes[val], 'color': colorTextCodes[val]}"
          :key="val"
        >{{ val }}</span>
      </div>
      <BubbleTeaDisplay
        class="w-1/3 -mt-48 m-auto mb-0"
        :class="{'w-2/5':  selectedSize !== 'Regular', '-mt-64':  selectedSize !== 'Regular'}"
        :base1="getColor('base1')"
        :base2="getColor('base2')"
        :base3="getColor('base3')"
        :base4="getColor('base4')"
        :icing="getColor('icing')"
        :boba1="getColor('boba1')"
        :boba2="getColor('boba2')"
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
import { colorCodes, colorTextCodes } from '../data/ingredient-colors';

export default {
  data() {
    return {
      tea: null,
      selectedSize: 'Regular',
      selectedIcing: null,
      selectedBoba: null,
      icings: [],
      bobas: [],
      colorCodes,
      colorTextCodes
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
      return +(this.tea.price + sizeExtra).toFixed(2);
    },
    ingredients() {
      const ingredients = this.tea.ingredients;
      const icing = this.selectedIcing ? this.selectedIcing.name : null;
      let boba1 = null,
        boba2 = null;
      if (this.selectedBoba) {
        boba1 = this.selectedBoba.color[0];
        boba2 = this.selectedBoba.color[1] || boba1;
      }
      return {
        ...ingredients,
        boba1,
        boba2,
        icing
      };
    }
  },
  methods: {
    getColor(prop) {
      return colorCodes[this.ingredients[prop]];
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
        ingredients: this.ingredients,
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
