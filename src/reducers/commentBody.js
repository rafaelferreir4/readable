import {
  CHANGE_COMMENT_BODY,
} from '../actions'

const commentBody = (state = '', action) => {
  switch (action.type) {
    case CHANGE_COMMENT_BODY:
      return action.commentBody
    default:
      return state
  }
}

export default commentBody
