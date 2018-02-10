/* Global DOM components */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Chip, IconButton, Paper } from 'material-ui'
import { Comment, ThumbUp, ThumbDown } from 'material-ui-icons'
import moment from 'moment'

/* Actions */
import { getAllPosts, upvotePost, downvotePost } from '../../../actions'

/* API */
import * as API from '../../../utils/API/API'

class Posts extends Component {
  state = {
    postComments: {}
  }

  componentDidMount() {
    const queryString = require('query-string')
    const queryStringParsed = queryString.parse(window.location.search)

    if (typeof queryStringParsed.category !== 'undefined') {
      this.getPostByCategory(queryStringParsed.category)
    } else {
      this.getAllPosts()
    }
  }

  getAllPosts() {
    const { getAllPosts } = this.props

    // Getting all the posts.
    API.getAllPosts().then(posts => {
      // Update the REDUX store with the API values.
      getAllPosts(posts)

      for (const post in posts) {
        API.getCommentPerPost(posts[post].id).then(comment => {
          this.setState({
            postComments: {
              ...this.state.postComments,
              [posts[post].id]: comment.length
            }
          })
        })
      }
    })
  }

  getPostByCategory = category => {
    const { getAllPosts } = this.props

    // Getting all the posts.
    API.getPostByCategory(category).then(posts => {
      // Update the REDUX store with the API values.
      getAllPosts(posts)

      for (const post in posts) {
        API.getCommentPerPost(posts[post].id).then(comment => {
          this.setState({
            postComments: {
              ...this.state.postComments,
              [posts[post].id]: comment.length
            }
          })
        })
      }
    })
  }

  votePost = (postId, action) => {
    const { upvotePost, downvotePost } = this.props

    API.votePost(postId, action).then(data => {
      action === 'upVote' ? upvotePost(postId) : downvotePost(postId)
    })
  }

  deletePost = (e, postId) => {
    API.deletePost(postId).then(data => this.getAllPosts())

    e.preventDefault()
  }

  filterPostByCategory = category => {
    this.props.history.push({
      pathname: '/',
      search: `category=${ category }`
    })
  }

  render() {
    const { categories, posts } = this.props
    const style = {
      margin: '20px 0',
      padding: '20px 40px',
      display: 'block',
    }

    return (
      <div>
        <h2>Posts</h2>
        <small>FILTER BY CATEGORY</small>
        { categories.map(category => {
          return (
            <Chip
              key={ category.name }
              style={{ display: 'inline-block', marginLeft: 15 }}
              onClick={ () => this.filterPostByCategory(category.name) }
            >
              { category.name }
            </Chip>
          )
        })}
        { posts.map(post => {
          return (
            <Paper key={ post.id } style={ style } zDepth={ 0 }>
              <Link to={`posts/${post.id}`}><h3 style={{ fontWeight: 500 }}>{ post.title }</h3></Link>
              <small>Post by: { post.author }</small>
              <p>{ post.body }</p>
              <Chip>{ post.category }</Chip>
              <small style={{ display: 'block', marginTop: 15 }}>{ moment(post.timestamp).format('LLLL') }</small>
              <div>
                <IconButton onClick={ () => this.votePost(post.id, 'upVote') }><ThumbUp /></IconButton>
                <span>{ post.voteScore }</span>
                <IconButton onClick={ () => this.votePost(post.id, 'downVote') }><ThumbDown /></IconButton>
                <Link to={ `posts/edit/${ post.id }` } >Edit</Link>
                <span> | </span>
                <Link to="#" onClick={ e => this.deletePost(e, post.id) }>Delete</Link>
                <br />
                <div>
                  <IconButton><Comment /></IconButton>{ this.state.postComments[post.id] } Comment(s)
                </div>
              </div>
            </Paper>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  getAllPosts: posts => dispatch(getAllPosts(posts)),
  upvotePost: postId => dispatch(upvotePost(postId)),
  downvotePost: postId => dispatch(downvotePost(postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
