import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks.find(query).populate('creator', 'name picture')
    return tasks
  }

  async getOne(id, userId) {
    const task = await dbContext.Tasks.findById(id).populate('creator', 'name picture')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    if (task.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your task')
    }
    return task
  }

  async create(body) {
    const task = await dbContext.Tasks.create(body)
    return await this.getOne(task.id, body.creatorId)
  }

  async edit(id, body) {
    const task = await dbContext.Tasks.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async destroy(id) {
    const task = await dbContext.Tasks.findByIdAndDelete(id)
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }
}
export const tasksService = new TasksService()
