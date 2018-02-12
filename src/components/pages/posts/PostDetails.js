/* Global DOM components */
import React, { Component } from 'react'
import { Chip, IconButton } from 'material-ui'
import { Comment } from 'material-ui-icons'

/* Custom DOM components */
import Comments from './Comments'
import CommentsForm from './CommentsForm'
import PostActions from './PostActions'

/* Redux */
import { connect } from 'react-redux'

/* Actions */
import { getAllPosts } from '../../../actions'

/* API */
import * as API from '../../../utils/API/API'

class PostDetails extends Component {
  state = {
    postAuthor: '',
    postBody: '',
    postTitle: '',
    postCategory: '',
    post: null,
  }

  componentDidMount() {
    if (typeof this.props.match.params.postId !== 'undefined') {
      const postId = this.props.match.params.postId

      if (postId !== 'add') {
        API.getPost(postId).then(post => {
          if (typeof post.error !== 'undefined' || Object.keys(post).length === 0) {
            this.props.history.push({ pathname: '/404' })
          } else {
            this.setState({
              postAuthor: post.author,
              postBody: post.body,
              postCategory: post.category,
              postTitle: post.title,
              post
            })
            this.props.getAllPosts([post])
          }
        })
      }
    }
  }

  deletePost = (e, postId) => {
    API.deletePost(postId).then(data => {
      this.props.history.push({ pathname: '/' })
    })

    e.preventDefault()
  }

  render() {
    const { postTitle, postAuthor, postBody, postCategory } = this.state
    const postId = this.props.match.params.postId
    let post = this.state.post

    if (this.props.posts.length !== 0) {
      post = this.props.posts[0]
    }

    return (
      <div>
        { this.props.match.params.postId !== 'add' &&
          <div>
            <div className="post-details">
              <h2>{ postTitle }</h2>
              { postAuthor !== '' &&
                <small style={{ display: 'block', marginBottom: 20 }}>
                  Post by: { postAuthor }
                </small>
              }
              <p>{ postBody }</p>
              <Chip>{ postCategory }</Chip>
            </div>
            { post !== null &&
              <div>
                <PostActions post={ post } deletePost={ this.deletePost } />
                <IconButton><Comment /></IconButton>{ this.props.comments.length } Comment(s)
              </div>
            }
            <div className="post-comments">
              <CommentsForm postId={ postId } />
              <Comments postId={ postId } />
            </div>
          </div>
        }
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails)
