<template>
  <div class="flex flex-col">
    {{ name }}
    {{ description }}
    {{ price }}
  </div>
</template>

<script>
export default {
  name: "Detail",
  props: {
    name: String,
    description: String,
    price: Number
  }
};
</script>

<style scoped></style>
