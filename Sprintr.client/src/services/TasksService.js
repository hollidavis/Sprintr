import { AppState } from '../AppState'
import { api } from './AxiosService'
import { backlogsService } from './BacklogsService'

class TasksService {
  async getNotesByTaskId(id) {
    const res = await api.get('api/tasks/' + id + '/notes')
    AppState.notes[id] = res.data
  }

  async createTask(newTask) {
    const res = await api.post('api/tasks', newTask)
    backlogsService.getTasksByBacklogId(res.data.backlogId)
  }

  async deleteTask(taskId, backlogId) {
    await api.delete('api/tasks/' + taskId)
    backlogsService.getTasksByBacklogId(backlogId)
  }

  async editTask(newTask, taskId) {
    const res = await api.put('api/tasks/' + taskId, newTask)
    return res.data.sprintId
  }

  countWeight(tasks) {
    let weight = 0
    tasks.forEach(t => {
      weight += t.weight
    })
    return weight
  }
}

export const tasksService = new TasksService()
