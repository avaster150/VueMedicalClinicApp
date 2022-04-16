export default [{
        path: '/doctors',
        name: 'doctors',
        component: () => import('@/pages/doctors/Doctors.vue')
    },
    {
        path: '/doctors/details/:id',
        name: 'doctors-details',
        props: true,
        component: () => import('@/pages/doctors/Details.vue')
    },
    {
        path: '/doctors/appointments/list',
        name: 'appointments-list',
        props: true,
        component: () => import('@/pages/doctors/Appointments.vue')
    },
    {
        path: '/doctors/appointments/details/:id',
        name: 'doctors-appointments-details',
        props: true,
        component: () => import('@/pages/doctors/Appointment.vue')
    }
]