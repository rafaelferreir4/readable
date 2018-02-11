/* Global DOM components */
import React, { Component } from 'react'
import { FlatButton, TextField } from 'material-ui'

/* Redux */
import { connect } from 'react-redux'

/* Actions */
import { changeCommentBody, getCommentsByPost } from '../../../actions'

/* API */
import * as API from '../../../utils/API/API'

class CommentsForm extends Component {
  state = {
    commentAuthor: '',
    commentBody: '',
    showMessage: false,
    isEditing: typeof this.props.commentId !== 'undefined' ? true : false,
  }

  componentDidMount() {
    const { isEditing } = this.state

    if (isEditing) {
      const { commentId } = this.props

      API.getComment(commentId).then(comment => {
        this.setState({
          commentAuthor: comment.author,
          commentBody: comment.body
        })
      })
    }
  }

  handleCommentAuthorChange = e => {
    this.setState({
      commentAuthor: e.target.value,
      showMessage: false,
    })
  }

  handleCommentBodyChange = e => {
    const { changeCommentBody } = this.props

    this.setState({
      commentBody: e.target.value,
      showMessage: false,
    })

    changeCommentBody(e.target.value)
  }

  saveComment = () => {
    const { getCommentsByPost, postId } = this.props

    API.createComment({
      author: this.state.commentAuthor,
      body: this.state.commentBody,
      parentId: postId,
    }).then(data => {
      API.getCommentsByPost(postId).then(comments => {
        getCommentsByPost(comments)
      })

      this.setState({ showMessage: true })
      this.resetForm()
    })
  }

  resetForm = () => {
    this.setState({
      commentAuthor: '',
      commentBody: '',
    })
  }

  render() {
    const { commentAuthor, commentBody, isEditing, showMessage } = this.state
    let commentHeader = 'LEAVE A COMMENT'

    if (isEditing) {
      commentHeader = 'EDIT YOUR COMMENT'
    }

    return (
      <div>
        <h4>{ commentHeader }</h4>
        <TextField
          floatingLabelText="Author"
          fullWidth={ true }
          value={ commentAuthor }
          onChange={ this.handleCommentAuthorChange }
        />
        <TextField
          floatingLabelText="Comment (Plain Text)"
          fullWidth={ true }
          multiLine={ true }
          rows={ 4 }
          rowsMax={ 6 }
          value={ commentBody }
          onChange={ this.handleCommentBodyChange }
        />
        <FlatButton onClick={ this.saveComment } label="Save" primary={ true } />
        <FlatButton onClick={ this.resetForm } label="Reset" />
        { showMessage &&
          <h3>Comment added successfully</h3>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  comments: state.comments,
})

const mapDispatchToProps = dispatch => ({
  getCommentsByPost: comments => dispatch(getCommentsByPost(comments)),
  changeCommentBody: commentBody => dispatch(changeCommentBody(commentBody)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm)
