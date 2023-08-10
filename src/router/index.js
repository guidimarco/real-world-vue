import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import EventLayout from '@/views/event/EventLayout.vue'
import EventDetails from '@/views/event/EventDetails.vue'
import EventRegister from '@/views/event/EventRegister.vue'
import EventEdit from '@/views/event/EventEdit.vue'
import AboutView from '@/views/AboutView.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

import EventService from '@/services/EventService.js'
import GStore from '@/stores'

import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    // if (savedPosition)
    //   return savedPosition
    // else
    //   return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'event-list',
      props: route => ({ page: parseInt(route.query.page) || 1 }),
      component: EventListView
    },
    {
      path: '/events/:id',
      name: 'event-layout',
      props: true,
      component: EventLayout,
      beforeEnter: to => {
        return EventService.getEvent(to.params.id).then((response) => {
          GStore.event = response.data
        }).catch((error) => {
          if (error.response && error.response.status == 404) {
            return {
              name: 'not-found-resource',
              params: { resource: 'event' }
            }
          }
          return {
            name: 'network-error'
          }
        })
      },
      children: [
        {
          path: '',
          name: 'event-details',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEdit,
          meta: { requireAuth: true }
        }
      ]
    },
    { // Dopo aver rinominato le rotte ( da event > events ) si fa il redirect delle vecchie
      path: '/event/:afterEvent(.*)',
      redirect: to => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound
    },
    {
      path: '/404/:resource',
      name: 'not-found-resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkError
    }
  ]
})

router.beforeEach((to, from) => {
  nProgress.start()

  const notAutorized = true
  if (to.meta.requireAuth && notAutorized) {
    GStore.flashMessage = ' Sorry, you are not authorized ...'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)
    if (from.href)
      return false
    else
      return { path: '/' }
  }
})

router.afterEach(() => {
  nProgress.done()
})

export default router
