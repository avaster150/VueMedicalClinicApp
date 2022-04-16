export default [{
        path: '/users',
        name: 'users',
        component: () => import('@/pages/users/List.vue')
    },
    {
        path: '/users/appointments',
        name: 'appointments',
        component: () => import('@/pages/users/Appointments.vue')
    },
    {
        path: '/users/appointments/details/:id',
        name: 'appointments-details',
        props: true,
        component: () => import('@/pages/users/Details.vue')
    }
]