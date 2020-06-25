<template>
  <section class="customise grid grid-cols-2 gap-4 h-screen w-full">
    <Detail
      :name="tea.name"
      :description="tea.description"
      :price="tea.price"
      :img="tea.productImageFile"
    />

    <div>
      <h2 class="text-4xl mb-4">Customise Your Tea!</h2>

      <CustomiseForm />
    </div>
  </section>
</template>

<script>
import CustomiseForm from '../components/Customise-Form';
import Detail from '../components/Detail';

export default {
  data() {
    return {
      tea: Object,
      default: {}
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
  created() {
    fetch(`http://localhost:5050/teas/${this.id}`)
      .then(response => response.json())
      .then(data => (this.tea = data));
  }
};
</script>

<style scoped></style>
