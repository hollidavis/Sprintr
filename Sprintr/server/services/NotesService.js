import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture')
    return notes
  }

  async getOne(id, userId) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your note')
    }
    return note
  }

  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await this.getOne(note.id, body.creatorId)
  }

  async edit(id, body) {
    const note = await dbContext.Notes.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async destroy(id) {
    const note = await dbContext.Notes.findByIdAndDelete(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }
}
export const notesService = new NotesService()
