import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ProjectSchema } from '../models/Project'
import { BacklogSchema } from '../models/Backlog'
import { SprintSchema } from '../models/Sprint'
import { TaskSchema } from '../models/Task'
import { NoteSchema } from '../models/Note'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Backlogs = mongoose.model('Backlog', BacklogSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Notes = mongoose.model('Note', NoteSchema);
}

export const dbContext = new DbContext()
