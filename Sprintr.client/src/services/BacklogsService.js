import { api } from './AxiosService'
import { projectsService } from './ProjectsService'

class BacklogsService {
  async createBacklog(newBacklog) {
    const res = await api.post('api/backlogs', newBacklog)
    projectsService.getBacklogsByProjectId(res.data.projectId)
  }
}

export const backlogsService = new BacklogsService()
