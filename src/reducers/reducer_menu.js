import { OPEN_MENU, CLOSE_MENU, SELECT_MENU, FETCH_MENU_ITEMS } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case OPEN_MENU:
      return { ...state, target: action.payload }
    case CLOSE_MENU:
      return { ...state, target: null }
    case SELECT_MENU:
      return { ...state, selected: action.payload }
    case FETCH_MENU_ITEMS:
      return { ...state, items: action.payload }
    default:
      return state
  }
}
