/* Global DOM components */
import React, { Component } from 'react'
import { Chip } from 'material-ui'

class PostDetails extends Component {
  state = {
    postTitle: '',
    postAuthor: '',
    postBody: '',
    postCategory: '',
  }

  componentDidMount() {

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
