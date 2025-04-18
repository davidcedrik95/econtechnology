// src/stores/modalStore.js
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isSolarModalOpen: false
  }),
  actions: {
    openSolarModal() {
      this.isSolarModalOpen = true
    },
    closeSolarModal() {
      this.isSolarModalOpen = false
    }
  }
})