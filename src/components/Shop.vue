<template>
  <section class="shop flex flex-col p-4 h-full">
    <h1 class="text-5xl mb-8">Bubble Tea Menu</h1>

    <div v-if="teas" class="grid grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        v-for="tea in teas"
        v-bind:key="tea.id"
        class="mb-4 p-4 shadow-lg hover:shadow-md transition-shadow duration-500 ease-out cursor-pointer"
      >
        <router-link :to="{ name: 'Customise', params: { id: tea.id } }">
          <div class="flex flex-col items-center">
            <div class="w-1/3">
              <!-- using v-bind here spreads out the properties of an object-->
              <BubbleTeaDisplay v-bind="tea.ingredients"></BubbleTeaDisplay>
            </div>
            <div class="w-full p-4">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-2xl">{{ tea.name }}</h2>
                <span class="price text-base p-2 rounded-full">
                  £ {{
                  tea.price
                  }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import BubbleTeaDisplay from '../components/BubbleTeaDisplay';

export default {
  name: 'Shop',
  components: {
    BubbleTeaDisplay
  },
  props: {
    teas: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.price {
  background-color: #02bfff;
  color: #fff;
}
</style>
