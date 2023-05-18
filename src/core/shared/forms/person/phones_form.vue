<template>
  <div class="w-100 position-relative rounded d-flex flex-column mt-2 border-dashed d-flex p-4">
    <span class="form-title">Teléfonos</span>
    <div v-for="(k, i) in count" :key="i" class="d-flex mt-2 flex-row">
      <div class="w-100 d-flex flex-column">
        <a-input
          @blur="blur[i]=true"
          @keypress="validateNumber"
          v-model="phones[i]"
          placeholder="Ingrese un teléfono"
        />
        <span
          class="text-danger"
          v-if="!phones[i]&& blur[i]"
        >Ingrese un teléfono o elimine este campo</span>
        <span class="mt-3 mb-1" v-else></span>
      </div>
      <a-icon
        v-if="count >0"
        class="dynamic-delete-button p-1 text-black-50 fa-2x"
        type="minus-circle-o"
        @click="removePhone(i)"
      />
    </div>

    <a-button
      type="dashed"
      icon="plus"
      :class="{'mt-3':count>0}"
      class="dashed-primary"
      @click="count++"
    >Agregar teléfono</a-button>
  </div>
</template>

<script>
import { validateNumber } from '../../../../entities/utils/utils'
export default {
  props: {},
  computed: {
    validPhones () {
      return !this.phones.includes('')
    }
  },
  methods: {
    validateNumber (e) {
      validateNumber(e)
    },
    removePhone (i) {
      this.count--
      this.phones.splice(i, 1)
    }
  },
  watch: {},
  components: {},
  data: () => ({
    count: 0,
    phones: [],
    blur: []
  })
}
</script>
