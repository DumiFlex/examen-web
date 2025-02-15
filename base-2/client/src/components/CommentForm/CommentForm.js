import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../state/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const CommentForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const globalState = useContext(AppContext)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    globalState.comment.emitter.removeAllListeners('GET_COMMENTS_SUCCESS')
    globalState.comment.emitter.addListener('GET_COMMENTS_SUCCESS', () => {
      navigate(`/projects/${params.pid}/tasks/${params.tid}/comments`)
    })
  }, [])

  return (
    <div>
      <h1>Comment Form</h1>
      <input
        type='text'
        placeholder='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type='text'
        placeholder='description'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={() => {
        globalState.comment.createOne(globalState, params.pid, params.tid, { title, description })
      }}
      >
        Create
      </button>
    </div>
  )
}

export default CommentForm
