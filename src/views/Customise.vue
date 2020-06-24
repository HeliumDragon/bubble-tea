<template>
  <section class="customise flex flex-col p-4 h-screen">
    <Detail
      :name="tea.name"
      :description="tea.description"
      :price="tea.price"
    />
  </section>
</template>

<script>
import Detail from '../components/Detail';

export default {
  data() {
    return {
      tea: Object,
      default: {},
    };
  },
  components: {
    Detail,
  },
  props: {
    id: {
      type: String,
    },
  },
  created() {
    fetch(`http://localhost:5050/teas/${this.id}`)
      .then((response) => response.json())
      .then((data) => (this.tea = data));
  },
};
</script>

<style scoped></style>
