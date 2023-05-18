<template>
    <div ref="form_container" class="card position-relative mb-0" v-on:keyup.enter="save_model()">
        <spinner v-if="loading"/>
        <div class="row row-breadcrumb">
            <div class="col-md-6">
                <h4>Insertar Usuario</h4>
            </div>
        </div>
        <div class="card-body p-0">

            <tc-form
                    :feedbacks="mb.statics('Person').feedbacks"
                    :vobject="$v"
                    nested="person"
                    ref="form"
                    class="form-row row"
            >
                <div class="col-md-6">
                    <tc-form-item class="form-group mb-0 col-md-6 px-3">
                        <label>Nombre<span class='required_field'>*</span></label>
                        <tc-input placeholder='Ingrese el valor' name='first_name'
                                  v-model="person.first_name"></tc-input>
                    </tc-form-item>
                    <tc-form-item class="form-group mb-0 col-md-6 px-3">
                        <label>Apellido<span class='required_field'>*</span></label>
                        <tc-input placeholder='Ingrese el valor' name='last_name' v-model="person.last_name"></tc-input>
                    </tc-form-item>
                    <tc-form-item class="form-group mb-0 col-md-6 px-3">
                        <label>Correo<span class='required_field'>*</span></label>
                        <tc-input placeholder='Ingrese el valor' name='email' v-model="person.email"></tc-input>
                    </tc-form-item>
                </div>
                <div class="col-md-6">
                    <tc-form-item class="form-group mb-0 col-md-6 px-3">
                        <label>Edad<span class='required_field'>*</span></label>
                        <tc-input placeholder='Ingrese el valor' type_car='num' name='age'
                                  v-model="person.age"></tc-input>
                    </tc-form-item>
                    <tc-form-item class="form-group mb-0 col-md-6 px-3">
                        <label>Sexo<span class='required_field'>*</span></label>
                        <tc-autocomplete
                                placeholder="Seleccione el Sexo"
                                name="sex"
                                ref="select_sex"
                                :successFeed="false"
                                idKey="sex"
                                textKey="sex"
                                :defaultValue="person.sex"
                                v-model="person.sex"
                                :data-source="sex"
                        />
                         
                    </tc-form-item>
                </div>
            </tc-form>
        </div>
        <div class="card-footer p-0">
            <a-button-group style="margin-bottom: 10px;margin-top: 10px">
                <a-tooltip placement="topLeft"
                           :title="!person.get_id()  ? 'Añadir nuevo elemento':'Actualizar elemento'">
                    <a-button :disabled="loading" type="primary" @click="save_model()">{{button_text}}</a-button>
                </a-tooltip>
                <a-tooltip placement="topLeft" title="Cancelar acción">
                    <a-button :disabled="loading" type="danger" @click="cancel()">Cancel</a-button>
                </a-tooltip>
            </a-button-group>
        </div>
    </div>
</template>

<script>
    import * as utils from "@/helpers/helpers/utils";
    import * as mb from "@/helpers/loaders/model.load"

    export default {
        name: "person_form",
        inject: {
            close_modal: {
                default: () => {
                }
            },
            load_data: {
                default: () => {
                }
            },
            refresh: {
                default: () => {
                }
            }
        },
        props: {
            model: {
                type: Object,
                default: () => {
                }
            },
            modal: {
                type: Boolean,
                default: false
            },
            popoverPlacement: {
                type: String,
                default: "bottomLeft"
            }
        },
        validations: mb.statics('Person').validations,
        data() {
            return {
                loading: false,
                sex: [{sex: "Masculino"}, {sex: "Femenino"}],
                mb,      // This property is for load static or instance class
                person: mb.instance('Person'),
            };
        },
        computed: {
            personFeedbacks() {
                return mb.statics('Person').feedbacks;
            },
            button_text() {
                return this.person.get_id() ? "Actualizar" : "Añadir";
            },
        },

        mounted: function () {
            this.person = mb.instance('Person', this.model);
        },
        components: {},
        methods: {
            cancel() {
                if (!this.model) {
                    this.$emit('close_modal', false)
                } else {
                    this.modal ? this.close_modal(null, false) : this.$router.push({name: 'person_list'})
                }
            },
            save_model(and_new = false) {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    const accion = this.person.get_id() ? "actualizado" : "añadido";
                    this.person
                        .save()
                        .then((response) => {
                            utils.process_response(response, accion)
                            this.refresh()
                            this.$refs.form.vobject.$reset()
                            this.person = mb.instance('Person', {});
                            this.loading = false;
                        })
                        .catch((error) => {
                            this.loading = false;
                            utils.process_error(error);
                        });
                }
            }
        }
    };
</script>

<style scoped>
    @import "person_form.css";
</style>

