import api from '@/services/api'

export const ApiPlugin = {
    install(Vue) {
        Vue.prototype.$api = api
    }
}