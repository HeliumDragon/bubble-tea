<template>
  <div class="grid grid-cols-2 gap-4 w-full">
    <form class="form w-full bg-white p-4" @submit="submitForm">
      <div class="grid grid-cols-2 grid-rows-2 gap-4 w-full">
        <div class="form-control text-left p-4 w-full">
          <h2 class="font-bold">Size</h2>

          <div class="flex flex-col justify-end py-4">
            <div class="flex justify-between items-baseline px-1">
              <label for="regular">Regular</label>
              <input type="radio" id="regular" value="Regular" v-model="size" />
            </div>

            <div class="flex justify-between items-baseline px-1">
              <label for="large" class="mb-2">Large</label>
              <input type="radio" id="large" value="Large" v-model="size" />
            </div>
          </div>
        </div>

        <div class="form-control text-left p-4 w-full">
          <label for="temperature" class="block font-bold mb-2">Temperature</label>
          <select id="temperature" name="temperature" class="py-2" v-model="temperature">
            <option>Hot</option>
            <option>NoIce</option>
            <option>30PercentIce</option>
            <option>50PercentIce</option>
            <option>100PercentIce</option>
            <option>120PercentIce</option>
          </select>
        </div>

        <div class="form-control text-left p-4 w-full">
          <label for="sugar" class="block font-bold mb-2">Amount of Sugar</label>
          <select id="sugar" name="sugar" class="py-2" v-model="sugarLevel">
            <option>NoSugar</option>
            <option>LittleSugar</option>
            <option>RegularSugar</option>
            <option>MoreSugar</option>
          </select>
        </div>

        <div class="form-control text-left p-4 w-full">
          <label for="toppingList" class="block font-bold mb-2">Toppings</label>
          <select
            id="toppingList"
            name="toppingList"
            class="border p-2"
            v-model="selectedToppings"
            multiple
          >
            <option :key="topping" v-for="topping in toppings" v-bind:value="topping">{{ topping }}</option>
          </select>
        </div>
      </div>

      <hr class="my-4" />

      <div class="flex justify-end">
        <button class="confirm-options-btn font-bold border rounded-lg p-4">Confirm</button>
      </div>
    </form>

    <div class="w-full bg-white p-4">
      <h1 class="text-xl font-bold tracking-wide">Your Customised Tea</h1>

      <hr class="my-4" />

      <h2 class="text-l font-bold">Size</h2>
      <p>{{size}}</p>

      <hr class="my-4" />

      <h2 class="text-l font-bold">Temperature</h2>
      <p>{{temperature}}</p>

      <hr class="my-4" />

      <h2 class="text-l font-bold">Sugar</h2>
      <p>{{sugarLevel}}</p>

      <hr class="my-4" />

      <h2 class="text-l font-bold">Toppings</h2>
      <p>{{selectedToppings}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: "Regular",
      temperature: "50PercentIce",
      sugarLevel: "RegularSugar",
      selectedToppings: [],
      toppings: [
        "Pearl",
        "Aloe",
        "CoconutJelly",
        "GrassJelly",
        "Oat",
        "CoffeeJelly",
        "Pudding",
        "RedBean",
        "WhitePearl"
      ]
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
    }
  }
};
</script>

<style scoped>
.confirm-options-btn {
  background-color: #02bfff;
  color: white;
}
</style>