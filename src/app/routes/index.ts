import express from 'express'

const router = express.Router()

const routes = [
  {
    path: 'path here',
    route: 'route here', // Import route here
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
