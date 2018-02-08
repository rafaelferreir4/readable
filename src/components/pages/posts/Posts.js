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
    this.getAllPosts()
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

  render() {
    const { posts } = this.props
    const style = {
      margin: '20px 0',
      padding: '20px 40px',
      display: 'block',
    }

    return (
      <div>
        <h2>Posts</h2>
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
                <Link to={ `posts/edit/${ post.id }` } >Edit</Link>-
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
})

const mapDispatchToProps = dispatch => ({
  getAllPosts: posts => dispatch(getAllPosts(posts)),
  upvotePost: postId => dispatch(upvotePost(postId)),
  downvotePost: postId => dispatch(downvotePost(postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
