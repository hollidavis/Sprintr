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
    children: [
      {
        path: 'backlog/:backlogId',
        name: 'BacklogPage',
        component: loadPage('BacklogPage')
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
