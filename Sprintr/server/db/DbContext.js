import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ProjectSchema } from '../models/Project'
import { BacklogSchema } from '../models/Backlog'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Projects = mongoose.model('Project', ProjectSchema);
  Backlogs = mongoose.model('Backlog', BacklogSchema);
}

export const dbContext = new DbContext()
