import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isSolarModalOpen: false, // État pour le modal "solardach"
  }),
  actions: {
    openSolarModal() {
      this.isSolarModalOpen = true;
    },
    closeSolarModal() {
      this.isSolarModalOpen = false;
    },
  },
});