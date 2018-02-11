/* Global DOM components */
import React, { Component } from 'react'
import { Chip } from 'material-ui'

/* Custom DOM components */
import Comments from './Comments'
import CommentsForm from './CommentsForm'

/* API */
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
    const postId = this.props.match.params.postId

    return (
      <div>
        <div className="post-details">
          { this.props.match.params.postId !== 'add' &&
            <h2>{ postTitle }</h2>
          }
          { (this.props.match.params.postId !== 'add' && postAuthor !== '') &&
            <small style={{ display: 'block', marginBottom: 20 }}>
              Post by: { postAuthor }
            </small>
          }
          <p>{ postBody }</p>
          <Chip>{ postCategory }</Chip>
        </div>
        { this.props.match.params.postId !== 'add' &&
          <div className="post-comments">
            <CommentsForm postId={ postId } />
            <Comments postId={ postId } />
          </div>
        }
      </div>
    )
  }
}

export default PostDetails
