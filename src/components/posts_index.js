import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { fetchPosts, ROOT_URL } from '../actions'
class PostsIndex extends Component {
  componentDidMount () {
    window.addEventListener('scroll', this.handleOnScroll)
  }

  renderPosts = () => {
    const { id } = this.props.match.params
    return _.map(this.props.posts, post => {
      if (!post.id) {
        return <div className="post-content" key={post.content}>로딩중...</div>
      }
      return (
        <ListItem
          button
          component={Link}
          to={`/boards/${id}/posts/${post.id}`}
          key={post.id}
        >
          <Avatar src={`${ROOT_URL}${post.badge}`}></Avatar>
          <ListItemText
            primary={post.title}
            secondary={`${post.writer} ${post.created} ${post.id}`}
          />
        </ ListItem>
      )
    })
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    var clientHeight = document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

    if (scrolledToBottom) {
    }
  }

  render () {
    return (
      <div className="posts">
        <List>
          {this.renderPosts()}
        </List>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts: _.orderBy(posts, post => parseInt(post.id, 10), ['desc']) }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex)