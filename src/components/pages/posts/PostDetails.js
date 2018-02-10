/* Global DOM components */
import React, { Component } from 'react'
import { Chip } from 'material-ui'

// Redux.
import { connect } from 'react-redux'

// API.
import * as API from '../../../utils/API/API'

class PostDetails extends Component {
  state = {
    postAuthor: '',
    postBody: '',
    postTitle: '',
    postCategory: '',
  }

  componentDidMount() {
    if (typeof this.props.match.params.postId !== 'undefined') {
      const postId = this.props.match.params.postId

      API.getPost(postId).then(post => {
        this.setState({
          postAuthor: post.author,
          postBody: post.body,
          postCategory: post.category,
          postTitle: post.title,
        })
      })
    }
  }

  render() {
    const { postTitle, postAuthor, postBody, postCategory } = this.state

    return (
      <div>
        <h2>{ postTitle }</h2>
        { postAuthor !== '' &&
          <small style={{ display: 'block', marginBottom: 20 }}>Post by: { postAuthor }</small>
        }
        <p>{ postBody }</p>
        <Chip>{ postCategory }</Chip>
      </div>
    )
  }
}

export default PostDetails
