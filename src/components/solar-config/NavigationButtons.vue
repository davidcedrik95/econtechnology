<template>
  <v-row class="mt-4" justify="space-between">
    <v-col cols="auto">
      <v-btn
        v-if="step > 1"
        color="primary"
        variant="text"
        @click="$emit('prev')"
        :disabled="loading"
      >
        <v-icon left>mdi-arrow-left</v-icon>
        {{ $t('buttons.back') }}
      </v-btn>
      <v-btn
        v-else
        color="grey"
        variant="text"
        @click="$emit('close')"
        :disabled="loading"
      >
        <v-icon left>mdi-close</v-icon>
        {{ $t('buttons.cancel') }}
      </v-btn>
    </v-col>
    
    <v-col cols="auto">
      <v-btn
        v-if="step < maxStep"
        color="primary"
        @click="$emit('next')"
        :disabled="!isValid || loading"
        :loading="loading"
      >
        {{ $t('buttons.next') }}
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
      
      <v-btn
        v-else
        color="success"
        @click="$emit('submit')"
        :disabled="!isValid || loading"
        :loading="loading"
      >
        {{ $t('buttons.submit') }}
        <v-icon right>mdi-check</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

defineProps({
  step: { type: Number, required: true },
  maxStep: { type: Number, required: true },
  isValid: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
});

defineEmits(['prev', 'next', 'submit', 'close']);
</script>