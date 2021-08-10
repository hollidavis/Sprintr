import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ProjectSchema } from '../models/Project'
import { BacklogSchema } from '../models/Backlog'
import { SprintSchema } from '../models/Sprint'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Backlogs = mongoose.model('Backlog', BacklogSchema);
  Sprints = mongoose.model('Sprint', SprintSchema);
}

export const dbContext = new DbContext()
