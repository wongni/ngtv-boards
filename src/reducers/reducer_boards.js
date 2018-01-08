import _ from 'lodash'
import { FETCH_BOARDS, FETCH_POSTS, FETCH_POST } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_BOARDS:
      const boards = _.mapKeys(action.payload, 'id')
      return {
        ...boards,
        ..._.map(state, board => {
          return { ...board, ...boards[board.id] }
        })
      }
    case FETCH_POSTS:
      _.each(state, board => {
        board.selected = false
      })
      let board = state[action.payload.id]
      if (!board) {
        board = { id: action.payload.id }
      }
      board.posts = { ...board.posts, ..._.mapKeys(action.payload.posts, 'id') }
      board.page = action.payload.page
      board.selected = true
      return { ...state, [action.payload.id]: board }
    case FETCH_POST:
      _.each(state, board => board.selected = false)
      board = state[action.payload.id]
      if (!board) {
        board = { id: action.payload.id, posts: {} }
      }
      let post = board.posts[action.payload.post.id]
      if (!post) {
        post = { id: action.payload.post.id }
      }
      post = { ...action.payload.post, ...post }
      board.posts = { ...board.posts, [action.payload.post.id]: post }
      board.selected = true
      return { ...state, [action.payload.id]: board }
    default:
      return state
  }
}