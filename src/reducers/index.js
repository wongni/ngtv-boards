import { combineReducers } from 'redux'
import MenuReducer from './reducer_menu'
import BoardsReducer from './reducer_boards'

const rootReducer = combineReducers({
  menuTarget: MenuReducer,
  boards: BoardsReducer
})

export default rootReducer