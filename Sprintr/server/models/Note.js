import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
export const NoteSchema = new Schema(
  {
    body: { type: String, required: true },
    taskId: { type: ObjectId, ref: 'Task', required: true },
    backlogId: { type: ObjectId, ref: 'Backlog', required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

NoteSchema.virtual('task', {
  localField: 'taskId',
  ref: 'Task',
  foreignField: '_id',
  justOne: true
})

NoteSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})

NoteSchema.virtual('backlog', {
  localField: 'backlogId',
  ref: 'Backlog',
  foreignField: '_id',
  justOne: true
})
