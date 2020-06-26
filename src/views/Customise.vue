<template>
  <section class="customise grid grid-cols-2 gap-4 h-screen w-full">
    <Detail
      :name="tea.name"
      :description="tea.description"
      :price="unitPrice"
      :img="tea.productImageFile"
      :boba="selectedBoba"
      :icing="selectedIcing"
    />

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
import Detail from '../components/Detail';

export default {
  data() {
    return {
      tea: {
        type: Object,
        default: {}
      },
      selectedSize: 'Regular',
      selectedIcing: null,
      selectedBoba: null,
      icings: [],
      bobas: []
    };
  },
  components: {
    CustomiseForm,
    Detail
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
    }
  },
  methods: {
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
          this.reset();
          break;
        case 'confirm':
          this.confirm();
          break;
        default:
          return;
      }
    },
    confirm() {
      const selectedTea = {
        base: this.tea,
        size: this.selectedSize,
        boba: this.selectedBoba,
        icing: this.selectedIcing,
        quantity: 1,
        unitPrice: this.unitPrice
      };

      fetch('http://localhost:5050/cart', {
        method: 'POST',
        body: JSON.stringify(selectedTea),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      localStorage.setItem('chosenTeas', JSON.stringify(selectedTea));

      this.$router.replace('/');
    },
    reset() {
      this.selectedBoba = null;
      this.selectedIcing = null;
    }
  },
  created() {
    fetch(`http://localhost:5050/teas/${this.id}`)
      .then(response => response.json())
      .then(data => (this.tea = data));

    fetch(`http://localhost:5050/extras`)
      .then(response => response.json())
      .then(data => {
        this.icings = data.icings;
        this.bobas = data.bobas;
      });
  }
};
</script>

<style scoped></style>
