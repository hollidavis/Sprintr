import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintsService {
  async getAll(query = {}) {
    const sprints = await dbContext.Sprints.find(query).populate('creator', 'name picture')
    return sprints
  }

  async getOne(id, userId) {
    const sprint = await dbContext.Sprints.findById(id).populate('creator', 'name picture')
    if (!sprint) {
      throw new BadRequest('Invalid Id')
    }
    if (sprint.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your sprint')
    }
    return sprint
  }

  async create(body) {
    const sprint = await dbContext.Sprints.create(body)
    return await this.getOne(sprint.id, body.creatorId)
  }

  async destroy(id) {
    const sprint = await dbContext.Sprints.findByIdAndDelete(id)
    if (!sprint) {
      throw new BadRequest('Invalid Id')
    }
    return sprint
  }
}
export const sprintsService = new SprintsService()
