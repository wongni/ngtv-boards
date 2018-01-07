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

import { openMenu, closeMenu } from '../actions'
import AppMenu from './app_menu'

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
            <AppMenu />
            <Typography type="title" color="inherit" className={classes.flex}>
              NGTV - {this.props.selectedBoard}
            </Typography>
            <Button color="contrast">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

function mapStateToProps ({ menu: { items, selected } }) {
  return {
    selectedBoard: items && selected ? items[selected].name : '게시판을 선택하세요'
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, { openMenu, closeMenu }
  )(TitleBar))