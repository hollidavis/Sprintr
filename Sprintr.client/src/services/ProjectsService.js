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
}

export const projectsService = new ProjectsService()
