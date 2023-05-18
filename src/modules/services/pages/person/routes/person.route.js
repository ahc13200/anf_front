export default [
    {
        path: '/services/person_list',
        name: 'person_list',
        component:()=> import('@/modules/services/pages/person/list/person_list.vue'),
    },
    {
        path: '/services/person_form',
        name: 'person_form',
        component:()=> import('@/modules/services/pages/person/form/person_form.vue'),
    },
]
