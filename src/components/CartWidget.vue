<script setup>
// imports
import { ref } from "vue";
import CartItem from "./CartItem.vue";
import { useCartStore } from '@/stores/CartStore'


const products = useCartStore()

function clearCart(){
  products.clear()
}

// data
const active = ref(false);
</script>
<template>
  <div class="relative">
    <!-- Icon that always shows -->
    <span class="cursor-pointer" @click="active = true">
      <fa icon="shopping-cart" size="lg" class="text-gray-700" />
      <div class="cart-count absolute">{{ products.getLength }}</div>
    </span>
    <!-- Modal Overlay only shows when cart is clicked on -->
    <AppModalOverlay :active="active" @close="active = false">
      <p v-if="products.isEmpty">Your cart is empty. Try to add some products.</p>
      <div v-else>
        <ul  class="items-in-cart">

          <CartItem
            v-for="product in products.getProducts"
            :product="product"
            :count="product.count"
            @updateCount=""
            @clear=""
          />
        </ul>
        <div class="flex justify-end text-2xl mb-5">
          Total: <strong>${{products.getAllPrice}}</strong>
        </div>
        <div class="flex justify-end">
          <AppButton class="secondary mr-2" @click="clearCart">Clear Cart</AppButton>
          <AppButton class="primary">Checkout</AppButton>
        </div>
      </div>
      <!-- Uncomment and use condition to show when cart is empty -->
      <!-- <div><em>Cart is Empty</em></div> -->
    </AppModalOverlay>
  </div>
</template>
<style lang="pcss" scoped>
.items-in-cart{
  @apply mb-5;
}
.items-in-cart li{
  @apply flex justify-between p-2;
}
.items-in-cart li:nth-of-type(even){
  @apply bg-gray-300;
}
</style>
