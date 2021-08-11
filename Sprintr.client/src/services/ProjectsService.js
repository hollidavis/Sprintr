import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class ProjectsService {
  async getAllProjects(query = {}) {
    const res = await api.get('api/projects' + convertToQuery(query))
    logger.log(res.data)
    AppState.projects = res.data
  }

  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    logger.log(res.data)
    this.getAllProjects()
    return res.data.id
  }

  async deleteProject(id) {
    await api.delete('api/projects/' + id)
    this.getAllProjects()
  }
}

export const projectsService = new ProjectsService()
