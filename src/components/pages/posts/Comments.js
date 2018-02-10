/* Global DOM components */
import React, { Component } from 'react'
import { Divider } from 'material-ui'

/* Redux */
import { connect } from 'react-redux'

/* API */
import * as API from '../../../utils/API/API'

/* Actions */
import { getCommentsByPost } from '../../../actions'

class Comments extends Component {
  componentDidMount() {
    const { getCommentsByPost, postId } = this.props

    API.getCommentsByPost(postId).then(comments => {
      getCommentsByPost(comments)
    })
  }

  render() {
    const { comments } = this.props

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
              <Divider style={{ marginBottom: 60 }} />
            </div>
          )
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
