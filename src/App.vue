<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./stores/ProductStore";
const store = useProductStore()
store.fill()
</script>

<template>
  <div class="container">
    <TheHeader />
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in store.products"
        :key="product.name"
        :product="product"
      />
    </ul>
  </div>
</template>
