<template>
  <div class="flex flex-col">
    <h2 class="text-4xl">{{ name }}</h2>
    <p>{{ description }}</p>
    <hr class="my-4" />
    <p>{{ price }}</p>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    name: String,
    description: String,
    price: Number,
  },
};
</script>

<style scoped></style>
