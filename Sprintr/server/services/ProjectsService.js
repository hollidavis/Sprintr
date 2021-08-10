import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectsService {
  async getAll(userId) {
    const projects = await dbContext.Projects.find({ creatorId: userId }).populate('creator', 'name picture')
    return projects
  }

  async getOne(id, userId) {
    const project = await dbContext.Projects.findById(id).populate('creator', 'name picture')
    if (!project) {
      throw new BadRequest('Invalid Id')
    }
    if (project.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your project')
    }
    return project
  }

  async create(body) {
    const project = await dbContext.Projects.create(body)
    return await this.getOne(project._id, body.creatorId)
  }

  async destroy(id, userId) {
    return await dbContext.Projects.findOneAndDelete({ id: id, creatorId: userId })
  }
}
export const projectsService = new ProjectsService()
