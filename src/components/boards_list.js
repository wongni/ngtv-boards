import _ from 'lodash'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Menu, { MenuItem } from 'material-ui/Menu'
import { withStyles } from 'material-ui/styles'
import { FiberNew } from 'material-ui-icons'

import { closeMenu } from '../actions'

const styles = {
  icon: {
    marginLeft: '5px'
  }
}

class BoardList extends Component {
  handleClick = (boardId) => {
    this.props.closeMenu()
  }

  handleClose = () => {
    this.props.closeMenu()
  }

  renderMenuItems = () => {
    const { classes, boards } = this.props
    // Sort items to make items with hasNew === true first
    const sortedBoards = _.sortBy(boards, board => -(board.hasNew))

    return _.map(sortedBoards, board => {
      return (
        <MenuItem
          onClick={() => this.handleClick(board.id)}
          key={board.id}
          component={Link}
          to={`/boards/${board.id}`}
        >
          {board.name}
          {board.hasNew ? <FiberNew color="accent" className={classes.icon} /> : null}
        </MenuItem>
      )
    })
  }

  render () {
    const { menuTarget } = this.props
    return (
      <div>
        <Menu id="simple-menu" anchorEl={menuTarget} open={Boolean(menuTarget)} onClose={this.handleClose}>
          {this.renderMenuItems()}
        </Menu>
      </div>
    )
  }
}

function mapStateToProps ({ menuTarget, boards }) {
  return { menuTarget, boards }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    closeMenu
  }, dispatch);
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(BoardList)
)