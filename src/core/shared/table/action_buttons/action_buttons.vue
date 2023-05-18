<template>
  <div class="icons-list">
    <a-tooltip placement="top" v-if="visible_edit" title="Modificar Elemento">
      <a-icon type="edit" style="padding-right: 10px" @click="v_instance.onEditing(object)" theme="twoTone"/>
    </a-tooltip>
    <a-tooltip placement="top" v-if="false" title="Mostrar Elemento">
      <a-icon type="eye" style="padding-right: 10px" theme="twoTone" twoToneColor="green"/>
    </a-tooltip>
    <a-tooltip placement="top" v-if="visible_delete" title="Borrar Elemento">
      <a-icon type="delete" style="padding-right: 10px" @click="showDeleteConfirm" theme="twoTone"
              twoToneColor="red"/>
    </a-tooltip>
  </div>
</template>
<script>
import * as utils from '@/helpers/helpers/utils/'
import * as model_factory from '@/helpers/loaders/model.load'

export default {
  name: 'action_buttons',
  props: {
    object: Object,
    v_instance: Object,
    class_name: {
      type: String,
      default: 'BaseModel'
    },
    visible_edit: {
      type: Boolean,
      default: true
    },
    visible_delete: {
      type: Boolean,
      default: true
    },
    visible_view: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      model: {}
    }
  },
  methods: {
    showDeleteConfirm() {
      let _this = this
      this.$confirm({
        title: 'Desea eliminar este elemento?',
        icon: 'delete',
        // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
        okText: 'Yes',
        okType: 'danger',
        class: 'delete_confirm',
        cancelText: 'No',
        async onOk() {
          try {
            const response = await _this.model.delete()
            utils.process_response(response, 'delete')
            _this.v_instance.load_data()
          } catch (error) {
            utils.process_error(error)
          }
        },
        onCancel() {

        },
      })
    },
  },
  mounted() {
    this.model = model_factory.instance(this.class_name, this.object)
  }
}
</script>

<style scoped>
/*.delete_confirm*/

</style>


