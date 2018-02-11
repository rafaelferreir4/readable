import {
  GET_COMMENTS_BY_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
} from '../actions'

const comments = (state = [], action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST:
      return action.comments
    case UPVOTE_COMMENT:
      return state.map((comment, index) => {
        if (comment.id !== action.commentId) {
          return state[index]
        } else {
          return {
            ...state[index],
            voteScore: state[index].voteScore + 1
          }
        }
      })
    case DOWNVOTE_COMMENT:
      return state.map((comment, index) => {
        if (comment.id !== action.commentId) {
          return state[index]
        } else {
          return {
            ...state[index],
            voteScore: state[index].voteScore - 1
          }
        }
      })
    default:
      return state
  }
}

export default comments
