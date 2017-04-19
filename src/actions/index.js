import fetchJsonp from 'fetch-jsonp'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_BOOKMANIFEST = 'SELECT_BOOKMANIFEST'
export const INVALIDATE_BOOKMANIFEST = 'INVALIDATE_BOOKMANIFEST'

export const selectBookManifest = bookmanifest => ({
  type: SELECT_BOOKMANIFEST,
  bookmanifest
})

export const invalidateBookManifest = bookmanifest => ({
  type: INVALIDATE_BOOKMANIFEST,
  bookmanifest
})

export const requestPosts = bookmanifest => ({
  type: REQUEST_POSTS,
  bookmanifest
})

export const receivePosts = (bookmanifest, json) => ({
  type: RECEIVE_POSTS,
  bookmanifest,
  posts: json.results,
  receivedAt: Date.now()
})

const fetchPosts = bookmanifest => dispatch => {
  dispatch(requestPosts(bookmanifest))
  let settings = {
      mode: 'cors',
      dataType: 'jsonp',
    }
  return fetchJsonp(`https://itunes.apple.com/search?country=gb&term=${bookmanifest}&media=ebook&limit=10`, settings)
      
    .then(response => response.json())
    .then(json => dispatch(receivePosts(bookmanifest, json)))
}

const shouldFetchPosts = (state, bookmanifest) => {
  const posts = state.postsByBookManifest[bookmanifest]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = bookmanifest => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), bookmanifest)) {
    return dispatch(fetchPosts(bookmanifest))
  }
}
