import { api } from './AxiosService'
import { backlogsService } from './BacklogsService'

class TasksService {
  async createTask(newTask) {
    const res = await api.post('api/tasks', newTask)
    backlogsService.getTasksByBacklogId(res.data.backlogId)
  }

  async deleteTask(taskId, backlogId) {
    await api.delete('api/tasks/' + taskId)
    backlogsService.getTasksByBacklogId(backlogId)
  }

  countWeight(tasks) {
    let weight = 0
    tasks.forEach(t => {
      weight += t.weight
    })
    return weight
  }

  countCompleted(tasks) {

  }
}

export const tasksService = new TasksService()
