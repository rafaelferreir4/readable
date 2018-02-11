/* Global DOM components */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IconButton, Chip, Paper, SelectField, MenuItem } from 'material-ui'
import { Comment } from 'material-ui-icons'
import moment from 'moment'

/* Custom DOM components */
import PostActions from './PostActions'

/* Redux */
import { connect } from 'react-redux'

/* Actions */
import { getAllPosts } from '../../../actions'

/* API */
import * as API from '../../../utils/API/API'

class Posts extends Component {
  state = {
    postComments: {},
    sortingMethod: 'timestamp',
  }

  componentDidMount() {
    const queryString = require('query-string')
    const queryStringParsed = queryString.parse(window.location.search)

    if (typeof queryStringParsed.category !== 'undefined') {
      this.getPostByCategory(queryStringParsed.category)
    } else {
      this.getAllPosts()
    }
  }

  getAllPosts() {
    const { getAllPosts } = this.props

    this.props.history.push({ pathname: '/' })

    // Getting all the posts.
    API.getAllPosts().then(posts => {
      posts.sort(this.sortPosts)
      // Update the REDUX store with the API values.
      getAllPosts(posts)
      this.getCommentsPerPost(posts)
    })
  }

  sortPosts = (a, b) => {
    const { sortingMethod } = this.state

    if (a[sortingMethod] > b[sortingMethod]) { return -1 }
    if (a[sortingMethod] < b[sortingMethod]) { return 1 }

    return 0;
}

  getPostByCategory = category => {
    const { getAllPosts } = this.props

    // Getting all the posts.
    API.getPostByCategory(category).then(posts => {
      posts.sort(this.sortPosts)
      // Update the REDUX store with the API values.
      getAllPosts(posts)
      this.getCommentsPerPost(posts)
    })
  }

  getCommentsPerPost = posts => {
    for (const post in posts) {
      API.getCommentPerPost(posts[post].id).then(comment => {
        this.setState({
          postComments: {
            ...this.state.postComments,
            [posts[post].id]: comment.length
          }
        })
      })
    }
  }

  deletePost = (e, postId) => {
    API.deletePost(postId).then(data => this.getAllPosts())

    e.preventDefault()
  }

  filterPostByCategory = category => {
    this.getPostByCategory(category)

    this.props.history.push({
      search: `category=${ category }`
    })
  }

  handleSortingMethods = (event, index, value) => {
    const queryString = require('query-string')
    const queryStringParsed = queryString.parse(window.location.search)

    if (typeof queryStringParsed.category !== 'undefined') {
      this.getPostByCategory(queryStringParsed.category)
    } else {
      this.getAllPosts()
    }

    this.setState({ sortingMethod: value })
  }

  render() {
    const { categories, posts } = this.props
    const style = {
      margin: '20px 0',
      padding: '20px 40px',
      display: 'block',
    }

    return (
      <div>
        <h2>Posts</h2>
        <small>FILTER BY CATEGORY</small>
        <div style={{ marginTop: 15, display: 'flex', flexWrap: 'wrap' }}>
          { categories.map(category => {
            return (
              <Chip
                key={ category.name }
                style={{ marginRight: 15 }}
                onClick={ () => this.filterPostByCategory(category.name) }
              >
                { category.name }
              </Chip>
            )
          })}
          <Chip
            onClick={ () => this.getAllPosts() }
            onRequestDelete={ () => this.getAllPosts() }
          >
            reset
          </Chip>
        </div>
        <div style={{ marginTop: 30 }}>
        <small style={{ display: 'block' }}>SORT BY</small>
        <SelectField
          floatingLabelText="Sort by"
          value={ this.state.sortingMethod }
          onChange={ this.handleSortingMethods }
        >
          <MenuItem value="timestamp" primaryText="Date" />
          <MenuItem value="voteScore" primaryText="Votes" />
          <MenuItem value="commentCount" primaryText="Number of Comments" />
        </SelectField>
        </div>
        { posts.map(post => {
          return (
            <Paper key={ post.id } style={ style } zDepth={ 0 }>
              <Link to={`posts/${post.id}`}><h3 style={{ fontWeight: 500 }}>{ post.title }</h3></Link>
              <small>Post by: { post.author }</small>
              <p>{ post.body }</p>
              <Chip
                onClick={ () => this.filterPostByCategory(post.category) }
              >
                { post.category }
              </Chip>
              <small style={{ display: 'block', marginTop: 15 }}>{ moment(post.timestamp).format('LLLL') }</small>
              <PostActions deletePost={ this.deletePost } post={ post } />
              <div>
                <IconButton><Comment /></IconButton>{ this.state.postComments[post.id] } Comment(s)
              </div>
            </Paper>
          )
        })}
        { posts.length === 0 &&
          <p>No posts matching your search</p>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  posts: state.posts,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  getAllPosts: posts => dispatch(getAllPosts(posts)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
