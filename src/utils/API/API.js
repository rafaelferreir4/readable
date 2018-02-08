const api = 'http://localhost:3001'
const headers = {
  'Authorization': 'some-auth-token',
  'Content-Type': 'application/json'
}

/* Getting all the categories */
export const getAllCategories = () => {
  return fetch(`${api}/categories`, { headers: headers })
    .then(res => res.json())
    .then(data => data.categories)
}

/* Posts */
export const votePost = (postId, action) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option: action })
  })
  .then(res => res.json())
}

export const createPost = postData => {
  const uuid = require('uuid/v1')

  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      ...postData,
      id: uuid(),
      timestamp: Date.now()
    })
  }).then(res => res.json())
}

export const editPost = (postId, postData) => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      ...postData
    })
  })
  .then(res => res.json())
}

export const deletePost = postId => {
  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers,
  })
}

export const getCommentPerPost = postId => {
    return fetch(`${api}/posts/${postId}/comments`, { headers: headers }).then(res => res.json())
}

export const getPost = postId => {
  return fetch(`${api}/posts/${postId}`, { headers: headers }).then(res => res.json())
}

export const getAllPosts = () => {
  return fetch(`${api}/posts`, { headers: headers }).then(res => res.json())
}

