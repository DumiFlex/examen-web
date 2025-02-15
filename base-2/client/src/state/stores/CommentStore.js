import EventEmitter from '../../utils/EventEmitter'
import { SERVER } from '../../config/global'

class CommentStore {
  constructor () {
    this.data = []
    this.count = 0
    this.selectedComment = null
    this.emitter = new EventEmitter()
  }

  async getAll (state, projectId, taskId, pageNumber, pageSize, filterField, filterValue, sortField, sortOrder) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${projectId}/tasks/${taskId}/comments?pageSize=${pageSize || ''}&pageNumber=${pageNumber === '' ? 0 : pageNumber}&filterField=${filterField || ''}&filterValue=${filterValue || ''}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}`, {
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
      this.emitter.emit('GET_COMMENTS_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_COMMENTS_ERROR')
    }
  }

  async getOne (state, projectId, taskId, commentId) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, {
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      const content = await response.json()
      this.selectedComment = content
      this.emitter.emit('GET_COMMENT_SUCCESS')
    } catch (err) {
      console.warn(err)
      this.emitter.emit('GET_COMMENT_ERROR')
    }
  }

  async createOne (state, projectId, taskId, comment) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${projectId}/tasks/${taskId}/comments`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          authorization: state.user.data.token
        },
        body: JSON.stringify(comment)
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state, projectId, taskId)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('ADD_TASK_ERROR')
    }
  }

  async updateOne (state, projectId, taskId, id, comment) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${projectId}/tasks/${taskId}/comments/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          authorization: state.user.data.token
        },
        body: JSON.stringify(comment)
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state, projectId, taskId)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('SAVE_TASK_ERROR')
    }
  }

  async deleteOne (state, projectId, taskId, id) {
    try {
      const response = await fetch(`${SERVER}/api/users/${state.user.data.id}/projects/${projectId}/tasks/${taskId}/comments/${id}`, {
        method: 'delete',
        headers: {
          authorization: state.user.data.token
        }
      })
      if (!response.ok) {
        throw response
      }
      this.getAll(state, projectId, taskId)
    } catch (err) {
      console.warn(err)
      this.emitter.emit('DELETE_TASK_ERROR')
    }
  }
}

export default CommentStore
