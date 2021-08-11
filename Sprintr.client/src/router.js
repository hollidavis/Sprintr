import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/project/:projectId',
    name: 'ProjectPage',
    component: loadPage('ProjectPage'),
    beforeEnter: authGuard,
    children: [
      {
        path: 'backlog',
        name: 'BacklogPage',
        component: loadPage('BacklogPage'),
        beforeEnter: authGuard
      },
      {
        path: 'sprint/:sprintId',
        name: 'SprintPage',
        component: loadPage('SprintPage'),
        beforeEnter: authGuard
      }
    ]
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
