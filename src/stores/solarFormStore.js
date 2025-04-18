import { defineStore } from 'pinia';

export const useFormStore = defineStore('solarForm', {
  state: () => ({
    formData: {
      // Step 1
      name: '',
      email: '',
      phone: '',
      
      // Step 2
      address: '',
      postalCode: '',
      city: '',
      
      // Step 3
      buildingType: '',
      
      // Step 4
      roofArea: '',
      roofShape: '',
      
      // Step 5
      householdSize: '',
      
      // Step 6
      electricityUsageTime: '',
      currentConsumption: '',
      
      // Step 7
      isOwner: null,
      ownerName: '',
      ownerContact: '',
      
      // Step 8
      solarPanelType: '',
      power: '',
      inverterType: '',
      hasBattery: false,
      batteryCapacity: '',
      
      // Step 9
      termsAccepted: false
    }
  }),
  actions: {
    updateFormData(data) {
      this.formData = { ...this.formData, ...data };
    },
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        buildingType: '',
        roofArea: '',
        roofShape: '',
        householdSize: '',
        electricityUsageTime: '',
        currentConsumption: '',
        isOwner: null,
        ownerName: '',
        ownerContact: '',
        solarPanelType: '',
        power: '',
        inverterType: '',
        hasBattery: false,
        batteryCapacity: '',
        termsAccepted: false
      };
    }
  }
});