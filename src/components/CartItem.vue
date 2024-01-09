<script setup>

import { useCartStore } from '@/stores/CartStore'

const products = useCartStore()


const props = defineProps({
  product: { type: Object, required: true },
  count: { type: Number, required: true },
});

defineEmits(["updateCount", "clear"]);

function updateCount(amount){
  console.log(amount) 
  products.updateCount(props.product.id,amount)
  // for(let i=0;i<amount;i++){
  //   products.$patch(state=>{
  //     state.updateAmont(props.product.id,1)
  //   })
  // }
}

function deleteProd(){
  console.log(products)
  products.delete(props.product.id)
}

</script>
<template>
  <li>
    <span>{{ product.name }}</span>
    <span class="whitespace-nowrap">
      <AppCountInput
        :model-value="count"
        @update:modelValue="updateCount($event)"
      />
      <span class="inline-block w-12 text-right"
        >${{ count * product.price }}</span
      >
      <span class="ml-4" @click="deleteProd">
        <fa icon="trash-alt" />
      </span>
    </span>
  </li>
</template>
