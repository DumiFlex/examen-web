import './TaskList.css'
import React, { use, useContext, useEffect, useState } from 'react'
import AppContext from '../../state/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import Task from './Task'
import Paginator from '../Paginator/Paginator'

const TaskList = () => {
  const globalState = useContext(AppContext)
  const [tasks, setTasks] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [filterField, setFilterField] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    globalState.task.getAll(globalState, params.pid, pageNumber, pageSize, filterField, filterValue, sortField, sortOrder)
    globalState.task.emitter.addListener('GET_TASKS_SUCCESS', () => {
      setTasks(globalState.task.data)
    })
  }, [params.pid, pageNumber, pageSize, filterField, filterValue, sortField, sortOrder])

  return (
    <div className='task-list'>
      <h1>Task list</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
              <input
                type='text' onChange={e => {
                  setFilterValue(e.target.value)
                  setFilterField('title')
                }} placeholder='name filter'
              />
              <button onClick={() => {
                setSortField('title')
                setSortOrder('asc')
              }}
              >⌃
              </button>
              <button onClick={() => {
                setSortField('title')
                setSortOrder('desc')
              }}
              >⌄
              </button>
            </th>
            <th>
              Description
              <input
                type='text' onChange={e => {
                  setFilterValue(e.target.value)
                  setFilterField('description')
                }} placeholder='description filter'
              />
              <button onClick={() => {
                setSortField('description')
                setSortOrder('asc')
              }}
              >⌃
              </button>
              <button onClick={() => {
                setSortField('description')
                setSortOrder('desc')
              }}
              >⌄
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map(task => <Task key={task.id} task={task} />)
          }
        </tbody>
      </table>
      <Paginator
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        totalRecords={globalState.task.count}
      />
      <div className='footer'>
        <button onClick={() => navigate(`/projects/${params.pid}/tasks/new`)}>
          Create Task
        </button>
      </div>
    </div>
  )
}

export default TaskList
