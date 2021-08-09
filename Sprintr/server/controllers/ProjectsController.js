import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import { backlogsService } from '../services/BacklogsService'
// import { sprintsService } from '../services/SprintsService'
import BaseController from '../utils/BaseController'

export class ProjectsController extends BaseController {
  constructor() {
    super('api/projects')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/backlogs', this.getBacklogByProjectId)
      // .get('/:id/sprints', this.getSprintsByProjectId)
      .post('', this.create)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectsService.getAll(req.userInfo.id)
      res.send(projects)
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const project = await projectsService.getOne(req.params.id, req.userInfo.id)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async getBacklogByProjectId(req, res, next) {
    try {
      const backlog = await backlogsService.getAll({ projectId: req.params.id })
      res.send(backlog)
    } catch (error) {
      next(error)
    }
  }

  // async getSprintsByProjectId(req, res, next) {
  //   try {
  //     const sprints = await sprintsService.getAll({ projectId: req.params.id })
  //     res.send(sprints)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const project = await projectsService.create(req.body)
      res.send(project)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      await projectsService.destroy(req.body)
      res.send({ message: 'Successfully Deleted' })
    } catch (error) {
      next(error)
    }
  }
}
