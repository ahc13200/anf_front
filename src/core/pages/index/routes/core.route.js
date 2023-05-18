export default [
    {
            path: '*',
            redirect: '/'
    },    {
        path: '/',
        name: 'index',
        component:()=> import('@/core/pages/index/index.vue'),
    },
]
