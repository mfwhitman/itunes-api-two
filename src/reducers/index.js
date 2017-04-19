import { combineReducers } from 'redux'
import {
  SELECT_BOOKMANIFEST, INVALIDATE_BOOKMANIFEST,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions'

const selectedBookManifest = (state = 'shakespeare', action) => {
  switch (action.type) {
    case SELECT_BOOKMANIFEST:
      return action.bookmanifest
    default:
      return state
  }
}

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_BOOKMANIFEST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByBookManifest = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_BOOKMANIFEST:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.bookmanifest]: posts(state[action.bookmanifest], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByBookManifest,
  selectedBookManifest
})

export default rootReducer
