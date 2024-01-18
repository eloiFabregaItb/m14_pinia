<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import AppButton from "@/components/AppButton.vue"
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";

const cartStore = useCartStore()
const productStore = useProductStore()
productStore.fill()

cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  if (name === 'addProduct') {
    after(() => {
      console.log("Productes afegits", args[0].name, "x", args[1])
    })
    onError((error) => {
      console.log("Hello error:", error.message);
    });

  }
})





</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton @click="cartStore.redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product" />
    </ul>
  </div>
</template>
