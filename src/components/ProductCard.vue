<script setup>
// imports
import { ref } from "vue";
import AppCountInput from "./AppCountInput.vue";
import { useProductsStore } from '@/stores/products'


const products = useProductsStore()

// props
const props = defineProps({
  product: Object,
});

// emits
defineEmits(["addToCart"])

// data
const count = ref(0);


function addProduct(){
  if(count.value<=0) return

  console.log(props.product,count.value)
  products.addProduct(props.product,count.value)

  count.value = 0
}

</script>
<template>
  <li class="card">
    <img :src="`/images/${product.image}`" class="mb-3" width="300" />
    <div>
      {{ product.name }} - <span class="text-green-500">${{product.price}}</span>
      <div class="text-center m-4">
        <AppCountInput v-model="count" />
      </div>
      <AppButton
        class="primary" @click="addProduct()">Add to Cart</AppButton>
    </div>
  </li>
</template>
