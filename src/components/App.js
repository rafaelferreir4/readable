/* Global DOM Components */
import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui'

/* Custom DOM Components */
import LeftMenu from './global/drawer/LeftMenu'
import HeaderBar from './global/header/HeaderBar'
import Posts from './pages/posts/Posts'
import PostsAdd from './pages/posts/PostsAdd'
import PostDetails from './pages/posts/PostDetails'

/* Redux */
import { connect } from 'react-redux'
import { getAllCategories, toggleLeftMenu } from '../actions'

/* API */
import * as API from '../utils/API/API'

class App extends Component {
  componentDidMount() {
    const { getAllCategories } = this.props

    // Getting all the categories.
    API.getAllCategories().then(categories => {
      // Update the REDUX store with the API values.
      getAllCategories(categories)
    })
  }

  render() {
    const { leftMenu, toggleLeftMenu, posts } = this.props

    return (
      <MuiThemeProvider>
        <div className="App">
          {/* Left Drawer Menu */}
          <LeftMenu
            showMenu={ leftMenu.opened }
            onRequestChange={ toggleLeftMenu }
          />
          {/* ENDOF: Left Drawer Menu */}
          {/* Header Components */}
          <header className="App-header">
            <HeaderBar
              toggleLeftMenu={ toggleLeftMenu }
            />
          </header>
          <div className="App-content">
            <Route exact path='/' render={ () => (<Posts posts={ posts } />) } />
            <Route exact path='/posts/add' component={ PostsAdd } />
            <Route exact path='/posts/edit/:postId' component={ PostsAdd } />
            <Route exact path='/posts/:postId' component={ PostDetails } />
          </div>
        {/* ENDOF: Header Components */}
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  leftMenu: state.leftMenu,
})

const mapDispatchToProps = dispatch => ({
  getAllCategories: categories => dispatch(getAllCategories(categories)),
  toggleLeftMenu: () => dispatch(toggleLeftMenu()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
