import { api } from './AxiosService'
import { tasksService } from './TasksService'

class NotesService {
  async createNote(newNote) {
    const res = await api.post('api/notes', newNote)
    tasksService.getNotesByTaskId(res.data.taskId)
  }

  async deleteNote(noteId, taskId) {
    await api.delete('api/notes/' + noteId)
    tasksService.getNotesByTaskId(taskId)
  }
}

export const notesService = new NotesService()
