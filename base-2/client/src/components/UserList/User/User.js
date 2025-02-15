import React, { useState, useContext } from 'react'
import AppContext from '../../../state/AppContext'
import { useParams, useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [type, setType] = useState(user.type)
  const globalState = useContext(AppContext)
  const params = useParams()
  const navigate = useNavigate()

  return (
    <tr>
      {
        isEditing
          ? (
            <>
              <td>
                <input
                  type='text'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </td>
              <td>
              	{user.enabled ? 'Active' : 'Removed'}
              </td>
              <td>
	            	<input
	                type='password'
	                value={password}
	                onChange={e => setPassword(e.target.value)}
	              />
              </td>
              <td>
	            	<input
	                type='text'
	                value={type}
	                onChange={e => setType(e.target.value)}
	              />
              </td>
              <td>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
                <button onClick={() => {
                  globalState.userAdmin.updateOne(globalState, user.id, {
                    email,
                    password,
                    type
                  })
                  setIsEditing(false)
                }}>
                Save
                </button>
              </td>
            </>
            )
          : (
            <>
              <td>{user.email}</td>
              <td>
              	{user.enabled ? 'Active' : 'Removed'}
              </td>
              <td>
              	Secret
              </td>
              <td>
              	{user.type}
              </td>
              <td>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={() => {
                  globalState.userAdmin.deleteOne(globalState, user.id)
                }}>
                	Delete
                </button>
              </td>
            </>
          )
      }

    </tr>
  )
}

export default User
