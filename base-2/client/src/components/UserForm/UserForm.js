import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../../state/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const UserForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [type, setType] = useState('regular')
  const globalState = useContext(AppContext)
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    globalState.userAdmin.emitter.removeAllListeners('GET_USERS_SUCCESS')
    globalState.userAdmin.emitter.addListener('GET_USERS_SUCCESS', () => {
      navigate(`/users`)
    })
  }, [])

  return (
    <div>
      <h1>User Form</h1>
      <input
        type='text'
        placeholder='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type='text'
        placeholder='type'
        value={type}
        onChange={e => setType(e.target.value)}
      />
      <button onClick={() => {
        globalState.userAdmin.createOne(globalState, { email, password, type })
      }}
      >
        Create
      </button>
    </div>
  )
}

export default UserForm
