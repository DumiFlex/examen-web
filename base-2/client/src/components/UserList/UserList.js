import './UserList.css'
import React, { use, useContext, useEffect, useState } from 'react'
import AppContext from '../../state/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import User from './User'
import Paginator from '../Paginator/Paginator'

const UserList = () => {
  const globalState = useContext(AppContext)
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    globalState.userAdmin.getAll(globalState, params.pid)
    globalState.userAdmin.emitter.addListener('GET_USERS_SUCCESS', () => {
      setUsers(globalState.userAdmin.data)
    })
  }, [])

  return (
    <div className='user-list'>
      <h1>User list</h1>
      <table>
        <thead>
          <tr>
            <th>
            	Email
            </th>
            <th>
            	Enabled
            </th>
            <th>
            	Password
						</th>
						<th>
							Type
						</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => <User key={user.id} user={user} />)
          }
        </tbody>
      </table>
      <div className='footer'>
        <button onClick={() => navigate(`/users/new`)}>
          Create User
        </button>
      </div>
    </div>
  )
}

export default UserList
