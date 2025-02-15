import Sequelize from 'sequelize'
import createCommentEntity from './comment.mjs'
import createProjectEntity from './project.mjs'
import createTaskEntity from './task.mjs'
import createUserEntity from './user.mjs'
import createPermissionEntity from './permission.mjs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logQueryParameters: true
})

const Project = createProjectEntity(sequelize, Sequelize)
const Task = createTaskEntity(sequelize, Sequelize)
const User = createUserEntity(sequelize, Sequelize)
const Permission = createPermissionEntity(sequelize, Sequelize)
const Comment = createCommentEntity(sequelize, Sequelize)

User.hasMany(Project)
Project.belongsTo(User)

Project.hasMany(Task)
Task.belongsTo(Project)

Task.hasMany(Comment)
Comment.belongsTo(Task)

Project.hasOne(Permission, {
  foreignKey: 'forResource',
  constraints: false
})
Task.hasOne(Permission, {
  foreignKey: 'forResource',
  constraints: false
})
Comment.hasOne(Permission, {
  foreignKey: 'forResource',
  constraints: false
})

Task.belongsTo(User, { as: 'assignedTo' })
User.hasOne(Task)

Comment.belongsTo(User)
User.hasMany(Comment)

try {
  await sequelize.sync({
    alter: true
  })
} catch (err) {
  console.warn(err)
}

export default {
  sequelize,
  Comment,
  Permission,
  Project,
  Task,
  User
}
