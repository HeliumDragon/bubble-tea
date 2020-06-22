<template>
  <section class="hero">
    <img
      class="brand-logo mb-32"
      src="@/assets/brand.svg"
      alt="buddha tea brand logo"
    />

    <button>Seek Tea Enlightenment</button>
  </section>
</template>

<script>
export default {
  name: 'Hero',
};
</script>

<style scoped>
.hero {
  display: flex;
  background: #eff8fe;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 95vh;
  padding: 1rem;
  text-align: center;
  overflow: hidden;
}

.brand-logo {
  max-width: 33%;
}

button {
  display: inline-block;
  background: #ffb6a1;
  border-radius: 25px;
  border: none;
  padding: 0.75rem 1.5rem;
  margin: 0;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background ease 0.25s;
  -webkit-appearance: none;
  -moz-appearance: none;
}
button:hover {
  background: #ff6bbc;
}
button:focus {
  outline: 1px solid #000;
  outline-offset: -1px;
}
</style>
