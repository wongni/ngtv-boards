import { OPEN_MENU, CLOSE_MENU } from '../actions'

export default function (state = null, action) {
  switch (action.type) {
    case OPEN_MENU:
      return action.payload
    case CLOSE_MENU:
      return null
    default:
      return state
  }
}
