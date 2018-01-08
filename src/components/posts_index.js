import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { fetchPosts, ROOT_URL } from '../actions'

class PostsIndex extends Component {
  componentWillReceiveProps (props) {
    const boardId = props.match.params.id
    if (boardId !== this.props.match.params.id) {
      this.props.fetchPosts(boardId, 1)
    }
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleOnScroll)
    this.props.fetchPosts(this.props.match.params.id, 1)
  }

  renderPosts = () => {
    const { id } = this.props.match.params
    return _.map(this.props.posts, post => {
      if (!post.id || !post.title) {
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
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
    const clientHeight = document.documentElement.clientHeight || window.innerHeight
    const scrolledToBottom = scrollTop + clientHeight + 100 >= scrollHeight

    if (scrolledToBottom && this.props.page) {
      const { id } = this.props.match.params
      this.props.fetchPosts(id, this.props.page + 1)
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

function mapStateToProps ({ boards }, ownProps) {
  const { id } = ownProps.match.params
  if (!boards[id]) {
    return {
      posts: null
    }
  }
  return {
    posts: _.orderBy(boards[id].posts, post => parseInt(post.id, 10), ['desc']),
    page: boards[id].page
  }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex)