import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'

class ProjectsService {
  async getAllProjects(query = {}) {
    const res = await api.get('api/projects' + convertToQuery(query))
    AppState.projects = res.data
  }

  async getSprintsByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/sprints')
    AppState.sprints = res.data
    logger.log(res.data)
  }

  async getBacklogsByProjectId(id) {
    const res = await api.get('api/projects/' + id + '/backlogs')
    AppState.backlogs = res.data
    logger.log(res.data)
  }

  async createProject(newProject) {
    const res = await api.post('api/projects', newProject)
    AppState.activeProject = res.data
    this.getAllProjects()
    return res.data.id
  }

  async deleteProject(id) {
    await api.delete('api/projects/' + id)
    this.getAllProjects()
  }

  async setActiveProject(id) {
    const res = await api.get('api/projects/' + id)
    AppState.activeProject = res.data
    logger.log(res.data)
  }
}

export const projectsService = new ProjectsService()
