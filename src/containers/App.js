import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectBookManifest, fetchPostsIfNeeded, invalidateBookManifest } from '../actions'
import Picker from '../components/Picker'
import Posts from '../components/Posts'

import Paper from 'material-ui/Paper';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import RaisedButton from 'material-ui/RaisedButton';

import FontIcon from 'material-ui/FontIcon';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const cachedIcon = <FontIcon className="material-icons">cached</FontIcon>;

class App extends Component {
  static propTypes = {
    selectedBookManifest: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
  super(props);
  this.state = {
    isDrawerOpen: true
  };
}

  componentDidMount() {
    const { dispatch, selectedBookManifest } = this.props
    dispatch(fetchPostsIfNeeded(selectedBookManifest))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBookManifest !== this.props.selectedBookManifest) {
      const { dispatch, selectedBookManifest } = nextProps
      dispatch(fetchPostsIfNeeded(selectedBookManifest))
    }
  }

  handleChange = nextBookManifest => {
    this.props.dispatch(selectBookManifest(nextBookManifest))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedBookManifest } = this.props
    dispatch(invalidateBookManifest(selectedBookManifest))
    dispatch(fetchPostsIfNeeded(selectedBookManifest))
  }

  handleDrawerToggle = () => {
   this.setState({isDrawerOpen: !this.state.isDrawerOpen}); 
  }

  render() {
    const { selectedBookManifest, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
    <div>
      <Paper>
        <Picker value={selectedBookManifest}
                onClick={this.handleChange}
                options={[ 'shakespeare', 'dickens', 'hemingway' ]}
                />

        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }

        <BottomNavigation>
         
            <BottomNavigationItem
            label="Refresh"
            icon={cachedIcon}
            onTouchTap={this.handleRefreshClick}
            disabled={isFetching}
          />
        
        </BottomNavigation>
        <div style={{'text-align': 'center'}}><p>
                  Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                  {' '}</p>
                </div>
      </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedBookManifest, postsByBookManifest } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByBookManifest[selectedBookManifest] || {
    isFetching: true,
    isDrawerOpen: true,
    items: []
  }

  return {
    selectedBookManifest,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
