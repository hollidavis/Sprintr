import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class BacklogsService {
  async getAll(userId) {
    const backlogs = await dbContext.Backlogs.find({ creatorId: userId }).populate('creator', 'name picture')
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
    return await this.getOne(backlog._id, body.creatorId)
  }

  async destroy(body) {
    return await dbContext.Backlogs.findByIdAndDelete({ id: body.id, creatorId: body.creatorId })
  }
}
export const backlogsService = new BacklogsService()