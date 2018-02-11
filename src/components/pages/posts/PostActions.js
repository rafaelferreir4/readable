/* Global DOM components */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from 'material-ui'
import { ThumbUp, ThumbDown } from 'material-ui-icons'

/* Redux */
import { connect } from 'react-redux'

/* Actions */
import { getAllPosts, upvotePost, downvotePost } from '../../../actions'

/* API */
import * as API from '../../../utils/API/API'

class PostActions extends Component {
  votePost = (postId, action) => {
    const { upvotePost, downvotePost } = this.props

    API.votePost(postId, action).then(data => {
      action === 'upVote' ? upvotePost(postId) : downvotePost(postId)
    })
  }

  render() {
    const { post } = this.props

    return (
      <div>
        <IconButton onClick={ () => this.votePost(post.id, 'upVote') }><ThumbUp /></IconButton>
        <span>{ post.voteScore }</span>
        <IconButton onClick={ () => this.votePost(post.id, 'downVote') }><ThumbDown /></IconButton>
        <Link to={ `posts/edit/${ post.id }` } >Edit</Link>
        <span> | </span>
        <Link to="#" onClick={ e => this.props.deletePost(e, post.id) }>Delete</Link>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  comments: state.comments,
})

const mapDispatchToProps = dispatch => ({
  getAllPosts: posts => dispatch(getAllPosts(posts)),
  upvotePost: postId => dispatch(upvotePost(postId)),
  downvotePost: postId => dispatch(downvotePost(postId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostActions)
