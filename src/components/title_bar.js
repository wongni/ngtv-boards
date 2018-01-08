import _ from 'lodash'

// React related imports
import React from 'react'
import { connect } from 'react-redux'

// material-ui components
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import MenuIcon from 'material-ui-icons/Menu'

import { openMenu, closeMenu, fetchBoards } from '../actions'
import BoardList from './boards_list'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

class TitleBar extends React.Component {
  componentDidMount () {
    this.props.fetchBoards()
  }

  handleClick = event => {
    this.props.openMenu(event.currentTarget)
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="contrast"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <BoardList />
            <Typography type="title" color="inherit" className={classes.flex}>
              NGTV - {this.props.selectedBoard ? this.props.selectedBoard.name : '로딩중...'}
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

function mapStateToProps ({ boards }) {
  return {
    selectedBoard: _.find(boards, board => board.selected)
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, { openMenu, closeMenu, fetchBoards }
  )(TitleBar))