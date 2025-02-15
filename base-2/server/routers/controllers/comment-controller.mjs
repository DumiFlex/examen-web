import models from '../../models/index.mjs'
import { Op } from 'sequelize'

const getAllCommentsForTask = async (req, res, next) => {
  try {
    const query = {
    	where: {
      	taskId: req.params.tid
      }
    }
    const filterQuery = {
    	where: {
     		taskId: req.params.tid
      }
    }

    if (req.query.filterField && req.query.filterValue) {
      query.where = {
        [req.query.filterField]: {
          [Op.like]: `%${req.query.filterValue}%`
        }
      }
      filterQuery.where = {
        [req.query.filterField]: {
          [Op.like]: `%${req.query.filterValue}%`
        }
      }
    }

    if (req.query.pageSize && req.query.pageNumber) {
      query.limit = req.query.pageSize
      query.offset = parseInt(req.query.pageSize) * parseInt(req.query.pageNumber)
    }

    if (req.query.sortField && req.query.sortOrder) {
      query.order = [[req.query.sortField, req.query.sortOrder]]
    }

    const count = await models.Comment.count({
      ...filterQuery
    })
    const data = await models.Comment.findAll({
      ...query,
      include: [{
        model: models.Permission,
        where: {
          forUser: req.params.uid,
          type: 'comment'
        },
        required: false
      }]
    })
    res.status(200).json({ data, count })
  } catch (err) {
    next(err)
  }
}

const getOneCommentForTask = async (req, res, next) => {
  try {
    const comment = await models.Comment.findOne({
      where: {
        id: req.params.cid,
        taskId: req.params.tid
      },
      include: [{
        model: models.Permission,
        where: {
          forUser: req.params.uid,
          type: 'comment'
        },
        required: false
      }]
    })
    if (comment) {
      res.status(200).json(comment)
    } else {
      res.status(404).json({ message: 'Comment not found' })
    }
  } catch (err) {
    next(err)
  }
}

const createOwnedCommentForTask = async (req, res, next) => {
  try {
    const comment = await models.Comment.create({
      ...req.body,
      taskId: req.params.tid
    })
    await models.Permission.create({
      forResource: comment.id,
      forUser: req.params.uid,
      type: 'comment',
      rights: ['read', 'write']
    })
    res.status(201).json(comment)
  } catch (err) {
    next(err)
  }
}

const updateOwnedCommentForTask = async (req, res, next) => {
  try {
    const comment = await models.Comment.findOne({
      where: {
        id: req.params.cid,
        taskId: req.params.tid
      }
    })
    if (comment) {
      await comment.update(req.body)
      res.status(200).json(comment)
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  } catch (err) {
    next(err)
  }
}

const deleteOwnedCommentForTask = async (req, res, next) => {
  try {
    const comment = await models.Comment.findOne({
      where: {
        id: req.params.cid,
        taskId: req.params.tid
      }
    })
    const permission = await models.Permission.findOne({
			where: {
				forResource: req.params.cid,
				forUser: req.params.uid,
				type: 'comment'
			}
		})

    if (comment && permission) {
    	await permission.destroy()
      await comment.destroy()
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  } catch (err) {
    next(err)
  }
}

export default {
  getAllCommentsForTask,
  getOneCommentForTask,
  createOwnedCommentForTask,
  updateOwnedCommentForTask,
  deleteOwnedCommentForTask
}
