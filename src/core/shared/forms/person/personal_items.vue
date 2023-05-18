<template>
  <div class="row w-100 position-relative rounded mt-2 border-dashed d-flex p-4">
    <span class="form-title">Objectos personales</span>

    <tc-form :vobject="$v" nested="personal_items" ref="form" class="col-6">
      <tc-form-item class="form-group mb-0">
        <label>Código PI</label>
        <tc-input
          class="w-100"
          name="pi_code"
          placeholder="Ingrese el Código PI"
          v-model="personal_items.pi_code"
        />
      </tc-form-item>

      <div class="form-group mb-2">
        <label>Description</label>
        <a-textarea v-model="personal_items.description" placeholder="Agrgue una descripción" />
      </div>
    </tc-form>

    <div class="col-6 d-flex h-100 p-0">
      <a-divider type="vertical" class="h-100 mx-5" />

      <div class="w-100 position-relative" :class="{'flex-column':objects_count>0}">
        <div v-if="objects_count>0" class="d-flex mr-5">
          <div class="w-75 d-flex flex-column">
            <span>Objecto</span>
          </div>
          <div class="d-flex pl-2 flex-column">
            <span>Cantidad</span>
          </div>
        </div>
        <div v-for="(k, i) in objects_count" :key="i" class="d-flex mt-2 flex-row">
          <div class="w-75 d-flex flex-column">
            <a-input @blur="setInputBlur(i)" v-model="objects[i]" placeholder="Ingrese un objecto" />
            <div class="d-flex flex-column">
              <span
                class="text-danger"
                v-if="!objects[i]&& blur[i]"
              >Ingrese un objecto o elimine este campo</span>
              <span class="mt-3 mb-1" v-else></span>
            </div>
          </div>

          <div class="d-flex flex-column">
            <a-input-number :defaultValue="1" class="ml-2" :min="1" :max="100" v-model="counts[i]" />
          </div>

          <a-icon
            v-if="objects_count >0"
            style="margin-top:2px"
            class="dynamic-delete-button ml-2 text-black-50 fa-2x h-fit-content"
            type="minus-circle-o"
            @click="removeObject(i)"
          />
        </div>

        <div>
          <div
            class="h-100"
            :class="{'u-absCenter d-flex justify-center flex-column':objects_count==0}"
          >
            <a-icon
              v-if="objects_count==0"
              class="mb-4 text-black-50"
              style="font-size:50px"
              type="shopping"
            />
            <a-button
              type="dashed"
              icon="plus"
              class="dashed-primary pl-3"
              @click="objects_count++"
            >Agregar Objeto</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateNumber } from '../../../../entities/utils/utils'
import { required } from 'vuelidate/lib/validators'
export default {
  props: {},
  validations: {
    personal_items: {
      pi_code: {
        required
      }
    }
  },
  data: () => ({
    personal_items: {
      pi_code: '',
      description: ''
    },
    counts: [],
    objects_count: 0,
    objects: [],
    blur: []
  }),
  computed: {
    validObjects () {
      return !this.objects.includes('')
    }
  },
  methods: {
    setInputBlur (i) {
      this.$set(blur, i, true)
    },
    validate () {
      return this.$refs.form.validate()
    },
    getData () {
      const { counts, objects, personal_items } = this
      return {
        counts,
        objects,
        personal_items
      }
    },
    validateNumber (e) {
      validateNumber(e)
    },
    removeObject (i) {
      this.objects_count--
      this.objects.splice(i, 1)
    }
  },
  watch: {},
  components: {}
}
</script>
