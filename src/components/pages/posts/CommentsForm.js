/* Global DOM components */
import React, { Component } from 'react'
import { FlatButton, TextField } from 'material-ui'

/* Redux */
import { connect } from 'react-redux'

/* Actions */
import { getCommentsByPost } from '../../../actions'

/* API */
import * as API from '../../../utils/API/API'

class CommentsForm extends Component {
  state = {
    commentAuthor: '',
    commentBody: '',
    showMessage: false
  }

  handleCommentAuthorChange = e => {
    this.setState({
      commentAuthor: e.target.value,
      showMessage: false,
    })
  }

  handleCommentBodyChange = e => {
    this.setState({
      commentBody: e.target.value,
      showMessage: false,
    })
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
    const { commentAuthor, commentBody, showMessage } = this.state

    return (
      <div>
        <h4>LEAVE A COMMENT</h4>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm)
