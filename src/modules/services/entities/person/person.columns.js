export const columns = [
    {
        title: 'Nombre',
        dataIndex: 'first_name',
        align: 'center',
        key: 'first_name',

        sorter: (a, b) => (a.first_name > b.first_name) - (a.first_name < b.first_name)
    },
    {
        title: 'Apellido',
        dataIndex: 'last_name',
        align: 'center',
        key: 'last_name',

        sorter: (a, b) => (a.last_name > b.last_name) - (a.last_name < b.last_name)
    },
    {
        title: 'Sexo',
        dataIndex: 'sex',
        align: 'center',
        key: 'sex',

        sorter: (a, b) => (a.sex > b.sex) - (a.sex < b.sex)
    },
    {
        title: 'Nacionalidad',
        dataIndex: 'country',
        align: 'center',
        key: 'country',

        sorter: (a, b) => (a.country > b.country) - (a.country < b.country)
    },
    {
        title: 'Edad',
        dataIndex: 'age',
        align: 'center',
        key: 'age',

        sorter: (a, b) => a.age - b.age
    },
    {
        title: 'Correo',
        dataIndex: 'email',
        align: 'center',
        key: 'email',

        sorter: (a, b) => (a.email > b.email) - (a.email < b.email)
    },
    {
        title: 'Acciones',
        key: 'action_elements',
        fixed: 'right',
        scopedSlots: {
            customRender: 'action'
        }
    }
];
