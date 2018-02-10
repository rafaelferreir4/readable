import { combineReducers } from 'redux'
import leftMenu from './leftMenu'
import categories from './categories'
import posts from './posts'
import comments from './comments'

export default combineReducers({ leftMenu, categories, comments, posts })
