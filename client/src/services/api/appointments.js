import http from '@/services/http'

export default {
    makeAppointment(payload) {
        return http.post('/appointments/request', payload)
    },
    loadAppointments(payload) {
        return http.post('/appointments/list', {
            id: payload
        })
    },
    loadAppointmentDetails(payload) {
        return http.post('/appointments/details', payload)
    },
    loadDoctorAppointments(payload) {
        return http.post('/appointments/doctor/list', {
            id: payload
        })
    },
    updateAppointment(payload) {
        return http.post('/appointments/update', payload)
    },
}