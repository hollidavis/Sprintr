import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
export const TaskSchema = new Schema(
  {
    status: { type: String, enum: ['pending', 'in-progress', 'review', 'done'] },
    weight: { type: Number, required: true },
    body: { type: String, require: true },
    sprintId: { type: ObjectId, ref: 'Sprint' },
    backlogId: { type: ObjectId, ref: 'Backlog', required: true },
    projectId: { type: ObjectId, ref: 'Project', required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

TaskSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})

TaskSchema.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: '_id',
  justOne: true
})

TaskSchema.virtual('backlog', {
  localField: 'backlogId',
  ref: 'Backlog',
  foreignField: '_id',
  justOne: true
})
