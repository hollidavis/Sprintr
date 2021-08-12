import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
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
}

export const sprintsService = new SprintsService()
