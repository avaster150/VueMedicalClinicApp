import http from '@/services/http'

export default {
    loadDoctors() {
        return http.get('/doctors/list')
    },
    loadDoctorDetails(id) {
        return http.get(`/doctors/details/${id}`)
    }
}