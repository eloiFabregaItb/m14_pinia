<script setup>
// imports
import { ref } from "vue";
import AppCountInput from "./AppCountInput.vue";
import { useCartStore } from '@/stores/CartStore'


const products = useCartStore()

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

  products.addProduct(props.product,count.value)
  // products.$patch(state=>{
  //   for(let i=0; i<count.value; i++){
  //     state.addProduct(props.product,1)
  //   }
  // })

  // console.log(products.products)
  // console.log(products.getLength)
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
