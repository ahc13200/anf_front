<template>
    <div>
        <person_form/>
        <person_list ref="person_list"/>
    </div>
</template>

<script>
    import Person_form from "../../../modules/services/pages/person/form/person_form";
    import Person_list from "../../../modules/services/pages/person/list/person_list";
    export default {
        name: "index",
        components: {Person_list, Person_form},
        methods:{
            refresh(){
                this.$refs.person_list.$refs.person_table.load_data()
                this.$refs.person_list.calculos()
            }
        },
        provide: function () {
            return {
                refresh: this.refresh,
            }
        },
    }
</script>

<style scoped>

</style>

