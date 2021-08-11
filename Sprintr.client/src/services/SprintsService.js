import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class SprintsService {
  async setActiveSprint(id) {
    const res = await api.get('api/sprints/' + id)
    AppState.activeSprint = res.data
    console.log(AppState.activeSprint)
  }
}

export const sprintsService = new SprintsService()
