import { combineReducers } from 'redux'
import leftMenu from './leftMenu'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import commentBody from './commentBody'

export default combineReducers({ leftMenu, categories, comments, commentBody, posts })
