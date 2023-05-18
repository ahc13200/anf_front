<template>
  <div class="w-100 position-relative row mx-0 rounded mt-2 border-dashed d-flex p-2 "
       :class="show_error?'dashed_error':''" id="div_direcciones">
    <span class="form-title">Direcciones</span>

    <tc-form-item class="flex-center mt-3 flex-column mb-0 col-md-4 px-3">
      <div class="form-group d-flex flex-column w-100">
        <label>Dirección CI</label>
        <a-popover
          :overlayClassName="person_address ?'':'d-none'"
          trigger="hover"
          title="Direccion CI"
        >
          <template slot="content">
            <p>{{ person_address }}</p>
          </template>
          <a-button
            type="dashed"
            :icon="person_address? 'edit':'plus'"
            class="dashed-primary"
            @click="showModalDirection(PERSON_ADDRESS)"
          >{{person_address ?'Guardar' ::'Agregar'}}
          </a-button>
        </a-popover>
        <a-checkbox
          class="mt-2 fw-400"
          @change="setAllDirection"
          v-model="everyEquals"
        >Todas iguales
        </a-checkbox>
      </div>
    </tc-form-item>

    <tc-form-item
      :class="{'opacity-4':everyEquals}"
      class="flex-center mt-3 flex-column mb-0 col-md-4 px-3"
    >
      <div class="d-flex flex-column w-100">
        <div class="form-group mb-0 d-flex flex-column" :class="{'opacity-4':residenceDisabled}">
          <label>Dirección Residencia</label>
          <a-popover
            :overlayClassName="person_address_residence?'':'d-none'"
            trigger="hover"
            title="Dirección Residencia"
          >
            <template slot="content">
              <p>{{ person_address_residence }}</p>
            </template>
            <a-button
              :disabled="residenceDisabled"
              :icon="person_address_residence? 'edit':'plus'"
              class="dashed-primary w-100"
              type="dashed"
              @click="showModalDirection(PERSON_ADDRESS_RESIDENCE)"
            >{{person_address_residence?'Guardar' ::'Agregar'}}
            </a-button>
          </a-popover>
        </div>
        <a-radio-group
          :disabled="everyEquals"
          class="d-flex flex-column mt-2"
          @change="changeResidenceRadio"

          v-model="recidenceEqualCI"
        >
          <a-radio :value="true">Igual a Dirección CI</a-radio>
          <a-radio :value="false">Otra dirección</a-radio>
        </a-radio-group>
      </div>
    </tc-form-item>

    <tc-form-item
      :class="{'opacity-4':everyEquals}"
      class="flex-center mt-3 flex-column mb-0 col-md-4 px-3"
    >
      <div class="d-flex flex-column w-100">
        <div class="form-group mb-0 d-flex flex-column" :class="{'opacity-4':procedenceDisabled}">
          <label>Dirección de Procedencia</label>
          <a-popover
            :overlayClassName="person_address_procedence?'':'d-none'"
            trigger="hover"
            title="Dirección de Procedencia"
          >
            <template slot="content">
              <p>{{ person_address_procedence }}</p>
            </template>
            <a-button
              :disabled="procedenceDisabled"
              type="dashed"
              :icon="person_address_procedence? 'edit':'plus'"
              class="dashed-primary w-100"
              @click="showModalDirection(PERSON_ADDRESS_PROCEDENCE)"
            >{{person_address_procedence?'Guardar' ::'Agregar'}}
            </a-button>
          </a-popover>
        </div>
        <a-radio-group
          @change="$emit('setProcedence',procedanceRadioValue)"
          :disabled="everyEquals"
          class="mt-2"
          v-model="procedanceRadioValue"
        >
          <a-radio :value="1">Igual a Dirección CI</a-radio>
          <a-radio :value="2">Igual a Dirección Recidencia</a-radio>
          <a-radio :value="3">Otra dirección</a-radio>
        </a-radio-group>
      </div>
    </tc-form-item>

    <ModalDireccion
      v-if="modalVisible"
      :parent="parent"
      :title="modalTitle()"
      :defaultTownId="defaultTownId()"
      :defaultDirection="parent.person[directionType]"
      :directionType="directionType"
      @cancel="modalVisible = false"
      @ok="setDirection"
    />
    <div class="row" v-if="show_error" style="text-align: center;margin-left:35%">
      <a-alert
        style="text-align: center"
        description="Debe insertar las direcciones de la persona"
        type="error"
      />
    </div>
  </div>

</template>

<script>
import ModalDireccion from '../../modals/modal_direccion/modal_direccion.vue'

export const PERSON_ADDRESS = 'person_address'
export const PERSON_ADDRESS_RESIDENCE = 'person_address_residence'
export const PERSON_ADDRESS_PROCEDENCE = 'person_address_procedence'
export const PERSON_ADDRESS_ALL = 'person_address_all'

export default {
  props: {
    parent: Object
  },
  computed: {
    address_validate () {
      this.show_error = !(this.parent.person != undefined && this.parent.person.person_address != undefined && this.parent.person.person_address_residence != undefined && this.parent.person.person_address_procedence != undefined)
      return !this.show_error
    },
    person () {
      this.parent.person
    },
    person_address () {
      return this.parent.person.person_address
    },
    person_address_residence () {
      return this.parent.person.person_address_residence
    },
    person_address_procedence () {
      return this.parent.person.person_address_procedence
    },
    residenceDisabled () {
      return this.everyEquals || this.recidenceEqualCI
    },
    procedenceDisabled () {
      return (
        this.everyEquals ||
          this.procedanceRadioValue === 1 ||
          this.procedanceRadioValue === 2
      )
    }
  },
  methods: {
    changeResidenceRadio () {
      if (this.recidenceEqualCI) {
        this.$emit('setProcedence', 1)
      }
      this.$emit('setResidenceEqualCI', this.recidenceEqualCI)
    },
    updateDirections (direction) {
      //  Si residencia igual CI y cambia CI
      if (this.recidenceEqualCI && this.directionType == PERSON_ADDRESS) {
        this.$emit('setDirection', {
          direction,
          directionType: PERSON_ADDRESS_RESIDENCE
        })
      }

      // Si procendencia igual a CI y cambia CI
      if (this.procedanceRadioValue == 1 && this.directionType == PERSON_ADDRESS) {
        this.$emit('setDirection', {
          direction,
          directionType: PERSON_ADDRESS_PROCEDENCE
        })
      }
      // Si procendencia igual a residencia y cambia recidencia
      if (this.procedanceRadioValue == 2 && this.directionType == PERSON_ADDRESS_RESIDENCE) {
        this.$emit('setDirection', {
          direction,
          directionType: PERSON_ADDRESS_PROCEDENCE
        })
      }
    },
    setDirection (direction) {
      this.modalVisible = false

      this.updateDirections(direction)

      this.directionType = this.everyEquals
        ? (this.directionType = PERSON_ADDRESS_ALL)
        : this.directionType

      this.$emit('setDirection', {
        direction,
        directionType: this.directionType
      })
    },
    setAllDirection () {
      if (this.everyEquals) {
        this.$emit('setAllDirection', true)
      }
    },
    defaultTownId () {
      switch (this.directionType) {
        case PERSON_ADDRESS:
          return this.parent.person.id_town
        case PERSON_ADDRESS_RESIDENCE:
          return this.parent.person.id_residence_town
        case PERSON_ADDRESS_PROCEDENCE:
          return this.parent.person.id_procedence_town
      }
    },
    showModalDirection (directionType) {
      this.directionType = directionType
      this.modalVisible = true
    },
    modalTitle () {
      const {directionsTexts, directionType} = this
      const type = this.parent.person[directionType]

      const direction = directionsTexts[directionType]
      return type ? `Editar ${direction}` : `Agregar ${direction}`
    }
  },
  watch: {},
  components: {
    ModalDireccion
  },
  data: () => ({
    procedanceRadioValue: 3,

    modalVisible: false,
    everyEquals: false,
    recidenceEqualCI: false,
    directionsTexts: {
      person_address: 'Dirección de CI',
      person_address_residence: 'Dirección de Residencia',
      person_address_procedence: 'Dirección de Procedencia'
    },
    missing_address: null,
    directionType: '',
    PERSON_ADDRESS,
    PERSON_ADDRESS_RESIDENCE,
    PERSON_ADDRESS_PROCEDENCE,
    show_error: false
  })
}
</script>
<style scoped>
  .dashed_error {
    border: 1px dashed #F44336 !important;
  }
</style>
