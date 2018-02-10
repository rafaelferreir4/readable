import { GET_COMMENTS_BY_POST } from '../actions'

const comments = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST:
      return action.comments
    default:
      return state
  }
}

export default comments
