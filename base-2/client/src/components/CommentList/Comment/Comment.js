import React, { useState, useContext } from 'react'
import AppContext from '../../../state/AppContext'
import { useParams, useNavigate } from 'react-router-dom'

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(comment.title)
  const [description, setDescription] = useState(comment.description)
  const globalState = useContext(AppContext)
  const params = useParams()
  const navigate = useNavigate()

  return (
    <tr>
      {
        globalState.user.data.id === comment.permission?.forUser
          ? (
              isEditing
                ? (
                  <>
                    <td>
                      <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                      <button onClick={() => setIsEditing(false)}>Cancel</button>
                      <button onClick={() => {
                        globalState.comment.updateOne(globalState, params.pid, params.tid, comment.id, {
                          comment, description
                        })
                        setIsEditing(false)
                      }}
                      >Save
                      </button>
                    </td>
                  </>
                  )
                : (
                  <>
                    <td>{comment.title}</td>
                    <td>{comment.description}</td>
                    <td>
                      <button onClick={() => setIsEditing(true)}>Edit</button>
                      <button onClick={() => {
                        globalState.comment.deleteOne(globalState, params.pid, params.tid, comment.id)
                      }}
                      >Delete
                      </button>
                    </td>
                  </>
                  )
            )
          : (
            <>
              <td>{comment.title}</td>
              <td>{comment.description}</td>
              <td>{comment.status}</td>
            </>
            )
      }

    </tr>
  )
}

export default Comment
