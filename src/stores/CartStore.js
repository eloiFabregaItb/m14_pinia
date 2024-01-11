import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    products: {},
  }),
  actions: {
    addProduct(p, count) {
      if (this.products[p.id]) {
        this.products[p.id].count += count;
      } else {
        this.products[p.id] = { ...p, count };
      }

      console.log(this.products);
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
