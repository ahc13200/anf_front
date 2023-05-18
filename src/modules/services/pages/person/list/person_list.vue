<template>
    <div>
        <div class="row row-breadcrumb">
            <div class="col-md-6">
                <h4>Listado de Usuarios</h4>
            </div>
        </div>
        <div>
            <a-modal
                    @cancel="onCloseModal"
                    :title="selected_person.get_id()?'Actualizar person':'Añadir person'"
                    class="modal-form"
                    width="55rem"
                    :visible="show_modal_form"
                    :destroyOnClose="true"
                    on-ok="handleOk"
                    :header="null"
                    :footer="null"
                    :maskClosable="false"
            >
                <person_form :modal=true :model="selected_person"/>
            </a-modal>
            <div class="row">
                <div class="col-md-8">
                    <person_table
                            :columns="columns"
                            table_name="Person"
                            id_table="id"
                            ref="person_table"
                            :params_search="params_search"
                            :paginate="paginate"
                    />
                </div>
                <div class="col-md-2">
                    <div class="card">
                        <div class="card-header">
                            <h4>Cálculos</h4>
                        </div>
                        <div class="card-body">
                            <p>Promedio:{{ calcular.prom }}</p>
                            <p>Cantidad de personas por sexo</p>
                            <p>Masculino: {{ calcular.cantMasc }}</p>
                            <p>Femenino: {{ calcular.cantFem }}</p>
                            <p>Mayor Edad:{{ calcular.nameMay }}</p>
                            <p>Menor Edad:{{ calcular.nameMen }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import * as utils from "@/helpers/helpers/utils";
    import * as mb from "@/helpers/loaders/model.load";
    import person_form from "../form/person_form";
    import person_table from "./person.table";

    export default {
        name: "person_list",
        provide: function () {
            return {
                close_modal: this.onCloseModal,
                show_form: this.show_form,
                load_data: () => {
                    this.$refs.person_table.load_data()
                },
                setSelectedPerson: this.setSelectedPerson
            }
        },
        data() {
            return {
                data: [],
                self: null,
                calcular:{},
                width: document.documentElement.clientWidth,
                selected_person: mb.instance('Person'),
                show_modal_form: false,
                paginate: false,
                params_search: {relations: []},
                mb
            };
        },
        components: {
            person_form,
            person_table
        },
        computed: {
            columns() {
                return this.width > 600 ? mb.statics("Person").show_columns([], false) : mb.statics("Person").show_columns(["last_name", "age"], false)
            },
        },
        mounted() {
            console.log("Holaaa" + this.width)
            this.calculos()
            window.addEventListener('resize', this.getDimensions);
        },
        unmounted() {
            window.removeEventListener('resize', this.getDimensions);
        },
        methods: {
            async calculos(){
                this.calcular=await mb.statics("Person").custom('get', "calculos")
                this.calcular=this.calcular.data
                console.log('Fs',this.calcular)
            },
            getDimensions() {
                console.log(this.width)
                this.width = document.documentElement.clientWidth;
                this.height = document.documentElement.clientHeight;
            },
            setSelectedPerson(model) {
                this.selected_person = model
            },
            onCloseModal(e, reload_data = false) {
                this.selected_person = mb.instance('Person');
                this.show_modal_form = false;
                reload_data ? this.$refs.person_table.load_data() : ''
            },
            show_form() {
                this.show_modal_form = !this.show_modal_form;
            },
            showDeleteConfirm() {
                if (this.$refs.person_table.selectedRowKeys.length === 0) {
                    utils.openNotificationWithIcon(
                        "error",
                        "Eliminar elementos seleccionados",
                        "Debe seleccionar al menos un elemento"
                    );
                    return;
                }
                let _this = this;
                this.$confirm({
                    title: "Eliminar elementos seleccionados?",
                    icon: "delete",
                    // icon:()=>{return ( <a-icon type="delete" style="color:red"/> )},
                    okText: "Si",
                    okType: "danger",
                    class: "delete_confirm",
                    cancelText: "No",
                    async onOk() {
                        try {
                            const response = await mb.statics('Person').delete_by_ids(
                                _this.$refs.person_table.selectedRowKeys
                            );
                            utils.process_response(response, "deleted");
                            _this.$refs.person_table.selectedRowKeys = [];
                            _this.$refs.person_table.load_data();
                        } catch (error) {
                            utils.process_error(error);
                            _this.$refs.person_table.selectedRowKeys = [];
                        }
                    },
                    onCancel() {
                    }
                });
            },
        },
    };
</script>

<style>
    @import "person_list.css";
</style>

