import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'

class App extends Component {
  render () {
    this.props.fetchPosts('freeboard')
    this.props.history.push('/boards/freeboard')
    return <div />
  }
}

export default connect(null, { fetchPosts })(App)