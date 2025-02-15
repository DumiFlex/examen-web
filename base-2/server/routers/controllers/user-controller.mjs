import { Op } from 'sequelize'
import models from '../../models/index.mjs'
import bcrypt from 'bcrypt'

const getUserProfile = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.params.uid, { where: { enabled: true }})
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    next(err)
  }
}

const suggestUser = async (req, res, next) => {
  try {
    const users = await models.User.findAll({
      where: {
        email: {
          [Op.like]: `%${req.query.partial}%`
        }
      },
      attributes: ['id', 'email'],
      limit: 5
    })
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

const getUsers = async (req, res, next) => {
	try {
    const query = {}
    const filterQuery = {}
    const count = await models.User.count({
      ...filterQuery
    })
    const data = await models.User.findAll({
      ...query
    })
    res.status(200).json({ data, count })
  } catch (err) {
    next(err)
  }
}

const createUser = async (req, res, next) => {
  try {
  	const candidate = { ...req.body, passwordHash: await bcrypt.hash(req.body.password, 10) }
    const user = await models.User.create(candidate)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.params.uid)
    if (user) {
    	const candidate = req.body
     // keep old password if needed
    	candidate.passwordHash = bcrypt.hash(candidate.password) || user.passwordHash
      await user.update(req.body)
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const user = await models.User.findByPk(req.params.uid)
    if (user) {
      await user.update({ enabled: false })
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (err) {
    next(err)
  }
}

export default {
  getUserProfile,
  suggestUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}
