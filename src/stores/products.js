import { defineStore } from "pinia";

export const useProductsStore = defineStore("ProductStores", {
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
    },
  },
  getters: {
    getProducts() {
      return this.products;
    },
    getLength() {
      return Object.values(this.products).reduce((acc, v) => acc + v.count, 0);
    },
  },
});
