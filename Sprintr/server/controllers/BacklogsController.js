import { Auth0Provider } from '@bcwdev/auth0provider'
import { backlogsService } from '../services/BacklogsService'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class BacklogsController extends BaseController {
  constructor() {
    super('api/backlogs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/tasks', this.getTasksByBacklogId)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const backlogs = await backlogsService.getAll({ creatorId: req.userInfo.id })
      res.send(backlogs)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const backlog = await backlogsService.getOne(req.params.id, req.userInfo.id)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async getTasksByBacklogId(req, res, next) {
    try {
      const backlog = await tasksService.getAll({ backlogId: req.params.id })
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const backlog = await backlogsService.create(req.body)
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await backlogsService.destroy(req.params.id)
      res.send({ message: 'Successfully Deleted' })
    } catch (error) {
      next(error)
    }
  }
}
