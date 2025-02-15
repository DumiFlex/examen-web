import EventEmitter from '../../utils/EventEmitter'
import { SERVER } from '../../config/global'

class UserAdminStore {
  constructor () {
    this.data = []
    this.count = 0
    this.emitter = new EventEmitter()
  }

  async getAll (state) {
    try {
      const response = await fetch(`${SERVER}/admin/users`, {
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      const content = await response.json()
      this.data = content.data
      this.count = content.count
      this.emitter.emit('GET_USERS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_USERS_ERROR')
    }
  }

  async createOne (state, user) {
    try {
      const response = await fetch(`${SERVER}/admin/users`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: state.user.data.token
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_USER_ERROR')
    }
  }

  async updateOne (state, id, user) {
    try {
      const response = await fetch(`${SERVER}/admin/users/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          authorization: state.user.data.token
        },
        body: JSON.stringify(user)
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_USER_ERROR')
    }
  }

  async deleteOne (state, id) {
    try {
      const response = await fetch(`${SERVER}/admin/users/${id}`, {
        method: 'delete',
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_USER_ERROR')
    }
  }
}

export default UserAdminStore
