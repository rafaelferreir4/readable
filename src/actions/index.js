export const TOGGLE_LEFT_MENU = 'TOGGLE_LEFT_MENU'
export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const CHANGE_COMMENT_BODY = 'CHANGE_COMMENT_BODY'

/* Left Menu */
export const toggleLeftMenu = () => {
  return {
    type: TOGGLE_LEFT_MENU,
  }
}
/* ENDOF: Left Menu */

/* Categories */
export const getAllCategories = categories => {
  return {
    type: GET_ALL_CATEGORIES,
    categories,
  }
}
/* ENDOF: Categories */

/* Posts */
export const getAllPosts = posts => {
  return {
    type: GET_ALL_POSTS,
    posts,
  }
}

export const createPost = post => {
  return {
    type: CREATE_POST,
    post
  }
}

export const upvotePost = postId => {
  return {
    type: UPVOTE_POST,
    postId,
  }
}

export const downvotePost = postId => {
  return {
    type: DOWNVOTE_POST,
    postId,
  }
}

export const getCommentsByPost = comments => {
  return {
    type: GET_COMMENTS_BY_POST,
    comments
  }
}

export const upvoteComment = commentId => {
  return {
    type: UPVOTE_COMMENT,
    commentId,
  }
}

export const downvoteComment = commentId => {
  return {
    type: DOWNVOTE_COMMENT,
    commentId,
  }
}

export const changeCommentBody = commentBody => {
  return {
    type: CHANGE_COMMENT_BODY,
    commentBody,
  }
}
/* ENDOF: Posts */
