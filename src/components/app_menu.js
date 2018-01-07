import _ from 'lodash'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Menu, { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import { FiberNew } from 'material-ui-icons'

import { closeMenu, selectMenu, fetchMenuItems, fetchPosts } from '../actions'

const styles = {
  icon: {
    marginLeft: '5px'
  }
}

class AppMenu extends Component {
  componentDidMount () {
    this.props.fetchMenuItems()
  }

  handleClick = (boardId) => {
    this.props.selectMenu(boardId)
    this.props.fetchPosts(boardId)
    this.props.closeMenu()
  }

  handleClose = () => {
    this.props.closeMenu()
  }

  renderMenuItems = () => {
    const { classes } = this.props
    const { items } = this.props.menu
    // Sort items to make items with hasNew === true first
    const sortedItems = _.sortBy(items, item => -(item.hasNew))

    return _.map(sortedItems, item => {
      return (
        <MenuItem
          onClick={() => this.handleClick(item.id)}
          key={item.id}
          component={Link}
          to={`/boards/${item.id}`}
        >
          {item.name}
          {item.hasNew ? <FiberNew color="accent" className={classes.icon} /> : null}
        </MenuItem>
      )
    })
  }

  render () {
    const { target } = this.props.menu
    return (
      <div>
        <Menu id="simple-menu" anchorEl={target} open={Boolean(target)} onClose={this.handleClose}>
          {this.renderMenuItems()}
        </Menu>
      </div>
    )
  }
}

function mapStateToProps ({ menu }) {
  return { menu }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    closeMenu,
    selectMenu,
    fetchMenuItems,
    fetchPosts
  }, dispatch);
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(AppMenu)
)