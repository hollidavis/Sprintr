import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ProjectSchema } from '../models/Project'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  Projects = mongoose.model('Project', ProjectSchema);
}

export const dbContext = new DbContext()
