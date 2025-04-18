export const useValidation = () => {
    const rules = {
      name: [v => !!v || 'Name ist erforderlich', v => v.length >= 2 || 'Mindestens 2 Zeichen'],
      email: [v => !!v || 'E-Mail ist erforderlich', v => /.+@.+\..+/.test(v) || 'Ungültige E-Mail'],
      phone: [v => !!v || 'Telefon ist erforderlich', v => /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{2,4}[-\s.]?[0-9]{2,4}$/.test(v) || 'Ungültige Telefonnummer'],
      address: [v => !!v || 'Adresse ist erforderlich', v => v.length >= 5 || 'Mindestens 5 Zeichen'],
      postalCode: [v => !!v || 'PLZ ist erforderlich', v => /^\d{4,5}$/.test(v) || 'Ungültige PLZ'],
      city: [v => !!v || 'Ort ist erforderlich', v => v.length >= 2 || 'Mindestens 2 Zeichen'],
      roofArea: [v => !!v || 'Dachfläche ist erforderlich', v => v > 0 || 'Muss größer als 0 sein', v => v <= 1000 || 'Maximal 1000 m²'],
      power: [v => !!v || 'Leistung ist erforderlich', v => v > 0 || 'Muss größer als 0 kW sein', v => v <= 100 || 'Maximal 100 kW']
    };
  
    const validateField = (field, value) => {
      return rules[field]?.every(rule => rule(value) === true) ?? true;
    };
  
    const validateStepRules = (step, data) => {
      const stepRules = {
        1: ['name', 'email', 'phone'],
        2: ['address', 'postalCode', 'city'],
        // ... autres règles par étape
      };
  
      return stepRules[step]?.every(field => validateField(field, data[field])) ?? true;
    };
  
    return { validateField, validateStepRules };
  };