import _ from 'lodash'
import { FETCH_POSTS, FETCH_POST } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload, 'id')
    case FETCH_POST:
      const post = state[action.payload.id]
      const newPost = { ...post, content: action.payload.content, comments: action.payload.comments }
      return { ...state, [action.payload.id]: newPost }
    default:
      return state
  }
}