import React from 'react'
import { Drawer, MenuItem } from 'material-ui'
import { Link } from 'react-router-dom'

function LeftMenu(props) {
  const { onRequestChange, showMenu } = props

  return (
    <div className="Left-menu">
      <Drawer
        open={ showMenu }
        docked={ false }
        containerClassName="Left-menu__wrapper"
        onRequestChange={ onRequestChange }
      >
        <h4 style={{ paddingLeft: 15 }}>READABLE</h4>
        <MenuItem>
          <Link
            to="/"
            onClick={ onRequestChange }
          >
            Home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="/post/add"
            onClick={ onRequestChange }
          >
            New Post
          </Link>
        </MenuItem>
      </Drawer>
    </div>
  )
}

export default LeftMenu
