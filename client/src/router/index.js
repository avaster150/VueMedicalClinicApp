import Vue from 'vue'
import VueRouter from 'vue-router'
import about from './routes/about'
import contact from './routes/contact'
import doctors from './routes/doctors'
import faq from './routes/faq'
import users from './routes/users'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
      path: '',
      name: 'start',
      component: () => import('@/pages/Start.vue')
    },
    ...about,
    ...contact,
    ...doctors,
    ...faq,
    ...users,
    {
      path: '*',
      component: () => import('@/pages/errors/Error404.vue')
    },
  ],
  mode: 'history'
});

export default router