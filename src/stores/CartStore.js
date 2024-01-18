
import { useAuthUserStore } from '@/stores/AuthUserStore'
import {useLocalStorage} from "@vueuse/core"
import { defineStore, acceptHMRUpdate} from "pinia";

export const useCartStore = defineStore("CartStore", {
  historyEnabled:true,
  state: () => ({
    // products: {},
    products:useLocalStorage("CartStore:items",{})
  }),
  actions: {
    addProduct(p, count) {
      if (this.products[p.id]) {
        this.products[p.id].count += count;
      } else {
        this.products[p.id] = { ...p, count };
      }
    },
    updateCount(id, count) {
      if(count<=0){
        delete this.products[id]
        return
      }
      this.products[id].count = count;
    },
    updateAdd(id, count=1) {
      if(this.products[id].count+count <=0){
        delete this.products[id]
        return
      }
      this.products[id].count+=count;
    },
    delete(id) {
      delete this.products[id];
    },
    clear(){
      this.products={}
    },
    checkout(){
      const authUserStore = useAuthUserStore()
      alert(`${authUserStore.username} just bought ${this.getLength} at a total of $${this.getAllPrice}`)
    }
  },
  getters: {
    getProducts() {
      return this.products;
    },
    getLength() {
      return Object.values(this.products).reduce((acc, v) => acc + v.count, 0);
    },
    isEmpty(){
      return Object.values(this.products).length === 0
    },
    getAllPrice() {
      return Object.values(this.products).reduce(
        (acc, v) => acc + v.count * v.price,
        0
      );
    },
  },
});










if(import.meta.hot){
  import.meta.hot.accept(acceptHMRUpdate(useCartStore,import.meta.hot));
}
