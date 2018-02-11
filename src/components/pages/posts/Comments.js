/* Global DOM components */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dialog, Divider, FlatButton, IconButton } from 'material-ui'
import { ThumbDown, ThumbUp } from 'material-ui-icons'

/* Custom DOM components */
import CommentsForm from './CommentsForm'

/* Redux */
import { connect } from 'react-redux'

/* API */
import * as API from '../../../utils/API/API'

/* Actions */
import { getCommentsByPost, upvoteComment, downvoteComment } from '../../../actions'

class Comments extends Component {
  state = {
    modalOpened: false,
    commentId: null
  }

  componentDidMount() {
    const { getCommentsByPost, postId } = this.props

    API.getCommentsByPost(postId).then(comments => {
      getCommentsByPost(comments)
    })
  }

  voteComment = (commentId, action) => {
    const { upvoteComment, downvoteComment } = this.props

    API.voteComment(commentId, action).then(data => {
      action === 'upVote' ? upvoteComment(commentId) : downvoteComment(commentId)
    })
  }

  deleteComment = (e, commentId) => {
    const { getCommentsByPost, postId } = this.props

    API.deleteComment(commentId).then(
      API.getCommentsByPost(postId).then(comments => {
        getCommentsByPost(comments)
      })
    )

    e.preventDefault()
  }

  editComment = (e, commentId) => {
    this.setState({
      modalOpened: true,
      commentId
    })

    e.preventDefault()
  }

  closeModal = () => {
    this.setState({ modalOpened: false })
  }

  saveComment = () => {
    const { commentId } = this.state
    const { commentBody, getCommentsByPost, postId } = this.props

    API.editComment(commentId, { body: commentBody }).then(data => {
      API.getCommentsByPost(postId).then(comments => {
        getCommentsByPost(comments)
      })
    })

    this.setState({ modalOpened: false })
  }

  render() {
    const { commentId } = this.state
    const { comments, postId } = this.props
    const actions = [
      <FlatButton label="Cancel" onClick={ this.closeModal } />,
      <FlatButton label="Save" primary={ true } onClick={ this.saveComment } />,
    ]

    return (
      <div>
        <Divider style={{ marginTop: 40, marginBottom: 40 }} />
        <h2 style={{ marginTop: 40, fontWeight: 300, color: '#e4e4e4' }}># Comments</h2>
        <Divider style={{ marginTop: 40, marginBottom: 60 }} />
        { comments.length === 0 &&
          <p style={{ marginBottom: 60 }}>No comments yet. Be the first to comment!</p>
        }
        { comments.map(comment => {
          return (
            <div key={ comment.id } className="comments-comment">
              <h5>{ `Comment by ${ comment.author }` }</h5>
              <p>{ comment.body }</p>
              <div>
                <IconButton
                  onClick={ () => this.voteComment(comment.id, 'upVote') }
                >
                  <ThumbUp />
                </IconButton>
                <span>{ comment.voteScore }</span>
                <IconButton
                  onClick={ () => this.voteComment(comment.id, 'downVote') }>
                  <ThumbDown />
                </IconButton>
                <Link
                  to="#"
                  onClick={ e => this.editComment(e, comment.id) }
                >
                  Edit
                </Link>
                <span> | </span>
                <Link
                  to="#"
                  onClick={ e => this.deleteComment(e, comment.id) }
                >
                  Delete
                </Link>
              </div>
              <Divider style={{ marginTop: 30, marginBottom: 60 }} />
            </div>
          )
        })}
        <Dialog
          title="Edit Comment"
          actions={ actions }
          modal={ false }
          open={ this.state.modalOpened }
          onRequestClose={ this.closeModal }
        >
          <CommentsForm postId={ postId } commentId={ commentId } />
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: state.comments,
  commentBody: state.commentBody
})

const mapDispatchToProps = dispatch => ({
  getCommentsByPost: comments => dispatch(getCommentsByPost(comments)),
  upvoteComment: commentId => dispatch(upvoteComment(commentId)),
  downvoteComment: commentId => dispatch(downvoteComment(commentId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
