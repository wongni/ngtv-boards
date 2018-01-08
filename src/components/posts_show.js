import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import List, { ListItem, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import { ROOT_URL, fetchPost } from '../actions'

class PostsShow extends Component {
  componentDidMount () {
    const { id, postId } = this.props.match.params
    this.props.fetchPost(id, postId)
  }

  renderComments = () => {
    return _.map(this.props.post.comments, comment => {
      const avatarUrl = comment.avatar.indexOf('http') === 0 ?
        comment.avatar : `${ROOT_URL}${comment.avatar}`
      return (
        <ListItem
          button
          key={comment.created}
        >
          <Avatar src={avatarUrl}></Avatar>
          <ListItemText
            primary={comment.content}
            secondary={`${comment.writer} ${comment.created}`}
          />
        </ ListItem>
      )
    })
  }

  render () {
    const { post } = this.props
    if (!post || !post.content) {
      return <div className="post-content">로딩중...</div>
    }
    const htmlContent = post.content.replace(new RegExp('img src="', 'g'), `img src="${ROOT_URL}`)
    return (
      <div className="post-content">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
        <List>
          {this.renderComments()}
        </List>
      </div>
    )
  }
}

function mapStatetoProps ({ boards }, ownProps) {
  const { id, postId } = ownProps.match.params
  if (!boards[id]) {
    return {
      post: null
    }
  }

  return {
    post: boards[id].posts[postId]
  }
}

export default connect(mapStatetoProps, { fetchPost })(PostsShow)