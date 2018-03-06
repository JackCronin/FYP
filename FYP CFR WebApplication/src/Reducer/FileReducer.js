import { GET_FILES } from '../Actions/FileActions'

export default function (state = {}, action) {
  switch (action.type) {
    case GET_FILES:
      return action.payload
    default:
      return state
  }
}
