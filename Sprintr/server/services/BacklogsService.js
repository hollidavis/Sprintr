import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BacklogsService {
  async getAll(query = {}) {
    const backlogs = await dbContext.Backlogs.find(query).populate('creator', 'name picture')
    return backlogs
  }

  async getOne(id, userId) {
    const backlog = await dbContext.Backlogs.findById(id).populate('creator', 'name picture')
    if (!backlog) {
      throw new BadRequest('Invalid Id')
    }
    if (backlog.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your backlog')
    }
    return backlog
  }

  async create(body) {
    const backlog = await dbContext.Backlogs.create(body)
    return await this.getOne(backlog.id, body.creatorId)
  }

  async destroy(id) {
    const backlog = await dbContext.Backlogs.findByIdAndDelete(id)
    await dbContext.Tasks.deleteMany({ backlogId: id })
    await dbContext.Notes.deleteMany({ backlogId: id })
    if (!backlog) {
      throw new BadRequest('Invalid Id')
    }
    return backlog
  }
}
export const backlogsService = new BacklogsService()
