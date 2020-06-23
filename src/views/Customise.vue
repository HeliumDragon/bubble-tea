<template>
  <section class="flex flex-col p-4 h-full">
    <h1>Tea id: {{id}}</h1>
    <Detail v-bind:name="'Test tea'" v-bind:description="'Testing flavour'" v-bind:price="1.99" />
  </section>
</template>

<script>
import Detail from "../components/Detail";

export default {
  components: {
    Detail
  },
  props: {
    id: {
      type: String
    }
  }
};
</script>
