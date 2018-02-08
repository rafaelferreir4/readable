import { combineReducers } from 'redux'
import leftMenu from './leftMenu'
import categories from './categories'
import posts from './posts'

export default combineReducers({ leftMenu, categories, posts })
