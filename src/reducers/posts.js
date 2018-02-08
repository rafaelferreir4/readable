import { GET_ALL_POSTS, CREATE_POST, UPVOTE_POST, DOWNVOTE_POST } from '../actions'

const posts = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.posts
    case CREATE_POST:
      return [...state, action.post]
    case UPVOTE_POST:
      return state.map((post, index) => {
        if (post.id !== action.postId) {
          return state[index]
        } else {
          return {
            ...state[index],
            voteScore: state[index].voteScore + 1
          }
        }
      })
    case DOWNVOTE_POST:
      return state.map((post, index) => {
        if (post.id !== action.postId) {
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

export default posts
