import './CommentList.css'
import React, { use, useContext, useEffect, useState } from 'react'
import AppContext from '../../state/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from './Comment'
import Paginator from '../Paginator/Paginator'

const CommentList = () => {
  const globalState = useContext(AppContext)
  const [comments, setComments] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [filterField, setFilterField] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    globalState.comment.getAll(globalState, params.pid, params.tid, pageNumber, pageSize, filterField, filterValue, sortField, sortOrder)
    globalState.comment.emitter.addListener('GET_COMMENTS_SUCCESS', () => {
      setComments(globalState.comment.data)
    })
  }, [params.pid, params.tid, pageNumber, pageSize, filterField, filterValue, sortField, sortOrder])

  return (
    <div className='comment-list'>
      <h1>Comment list</h1>
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
            comments.map(comment => <Comment key={comment.id} comment={comment} />)
          }
        </tbody>
      </table>
      <Paginator
        onPageChange={(pageNumber) => setPageNumber(pageNumber)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        totalRecords={globalState.comment.count}
      />
      <div className='footer'>
        <button onClick={() => navigate(`/projects/${params.pid}/tasks/${params.tid}/comments/new`)}>
          Create Comment
        </button>
      </div>
    </div>
  )
}

export default CommentList
