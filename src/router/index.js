import { createRouter, createWebHistory } from 'vue-router'
import MessagePage from "../pages/MessagePage"
import MessageHistory from "../pages/MessageHistory"

const routes = [
  {
    path: '/',
    name: 'message-page',
    component: MessagePage
  },
  {
    path: '/history',
    name: 'message-history',
    component: MessageHistory
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
