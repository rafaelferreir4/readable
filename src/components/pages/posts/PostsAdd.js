/* Global DOM components */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Chip, Divider, FlatButton, MenuItem, SelectField, TextField } from 'material-ui'

/* API */
import * as API from '../../../utils/API/API'

/* Helpers */
import { formatString } from '../../../utils/helpers'

class PostsAdd extends Component {
  state = {
    editingPost: false,
    errorMessage: false,
    postAuthor: '',
    postBody: '',
    postCategory: '',
    postTitle: '',
    showMessage: false,
  }

  componentDidMount() {
    if (typeof this.props.match.params.postId !== 'undefined') {
      const postId = this.props.match.params.postId

      API.getPost(postId).then(post => {
        this.setState({
          editingPost: true,
          postAuthor: post.author,
          postBody: post.body,
          postCategory: post.category,
          postTitle: post.title,
        })
      })
    }
  }

  handlePostAuthorChange = e => {
    this.setState({ postAuthor: e.target.value, showMessage: false, })
  }

  handlePostBodyChange = e => {
    this.setState({ postBody: e.target.value, showMessage: false, })
  }

  handleCategoryChange = (event, index, value) => {
    this.setState({ postCategory: value, showMessage: false, })
  }

  handlePostTitleChange = e => {
    this.setState({ postTitle: e.target.value, showMessage: false, })
  }

  savePost = () => {
    const { editingPost } = this.state
    const formValidated
      = this.state.postAuthor !== ''
      && this.state.postBody !== ''
      && this.state.postCategory !== ''
      && this.state.postTitle !== ''

    if (!formValidated) {
      this.setState({ errorMessage: true })

      return false
    } else {
      this.setState({ errorMessage: false })
    }

    if (!editingPost) {
      API.createPost({
        author: this.state.postAuthor,
        body: this.state.postBody,
        category: this.state.postCategory,
        title: this.state.postTitle,
      }).then(data => {
        this.setState({
          postAuthor: '',
          postBody: '',
          postCategory: '',
          postTitle: '',
          showMessage: true,
        })
      })
    } else {
      const postId = this.props.match.params.postId

      API.editPost(
        postId, { body: this.state.postBody, title: this.state.postTitle }
      ).then(data => this.setState({ showMessage: true }))
    }
  }

  render() {
    const { editingPost, postAuthor, postBody, postCategory, postTitle } = this.state
    const { categories } = this.props

    return (
      <div>
        { this.state.errorMessage !== false &&
          <div className='error'>All fields are required</div>
        }
        <h2>{ !editingPost ? 'Add a new post' : 'Edit Post'}</h2>
        <TextField
          floatingLabelText="Post Title"
          fullWidth={ true }
          value={ postTitle }
          onChange={ this.handlePostTitleChange }
        />
        <TextField
          floatingLabelText="Author"
          fullWidth={ true }
          value={ postAuthor }
          onChange={ this.handlePostAuthorChange }
        />
        <SelectField
          floatingLabelText="Category"
          fullWidth={ true }
          value={ postCategory }
          onChange={ this.handleCategoryChange }
        >
          { categories.map(category => {
            return (
              <MenuItem
                key={ category.name }
                value={ category.name }
                primaryText={ formatString(category.name) }
              />
            )
          })}
        </SelectField>
        <TextField
          floatingLabelText="Post ( Plain Text )"
          fullWidth={ true }
          multiLine={ true }
          rows={ 4 }
          rowsMax={ 6 }
          value={ postBody }
          onChange={ this.handlePostBodyChange }
        />
        <FlatButton onClick={ this.savePost } label="Save" primary={ true } />
        <FlatButton label="Cancel" />
        <h2 style={{ marginTop: 40, fontWeight: 300, color: '#e4e4e4' }}># Preview</h2>
        <Divider style={{ marginTop: 40, marginBottom: 60 }} />
        { this.state.showMessage &&
          <h2>Your post was saved successfuly</h2>
        }
        <h2>{ postTitle }</h2>
        { (postAuthor !== '' && !this.state.showMessage) &&
          <small style={{ display: 'block', marginBottom: 20 }}>Post by: { postAuthor }</small>
        }
        <p>{ postBody }</p>
        <Chip>{ postCategory }</Chip>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories,
})

export default connect(mapStateToProps)(PostsAdd)
