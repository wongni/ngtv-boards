import { combineReducers } from 'redux'
import MenuReducer from './reducer_menu'
import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
  menu: MenuReducer,
  posts: PostsReducer
})

export default rootReducer