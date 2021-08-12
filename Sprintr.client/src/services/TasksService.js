import { api } from './AxiosService'
import { backlogsService } from './BacklogsService'

class TasksService {
  async createTask(newTask) {
    const res = await api.post('api/tasks', newTask)
    backlogsService.getTasksByBacklogId(res.data.backlogId)
  }
}

export const tasksService = new TasksService()
