import { AppState } from '../AppState'
import { api } from './AxiosService'
import { projectsService } from './ProjectsService'

class SprintsService {
  async setActiveSprint(id) {
    const res = await api.get('api/sprints/' + id)
    AppState.activeSprint = res.data
  }

  async createSprint(newSprint) {
    const res = await api.post('api/sprints', newSprint)
    projectsService.getSprintsByProjectId(res.data.projectId)
    return res.data.id
  }

  async deleteSprint(sprintId, projectId) {
    await api.delete('api/sprints/' + sprintId)
    projectsService.getSprintsByProjectId(projectId)
  }

  async getTasksBySprintId(id) {
    const res = await api.get('api/sprints/' + id + '/tasks')
    AppState.tasks[id] = res.data
  }
}

export const sprintsService = new SprintsService()
