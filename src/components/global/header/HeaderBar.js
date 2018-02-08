import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, IconButton } from 'material-ui'
import { Menu } from 'material-ui-icons'

function HeaderBar(props) {
  const { toggleLeftMenu } = props

  return (
    <AppBar
      className="Header-wrapper"
      iconElementLeft={
        <IconButton>
          <Menu className="Header-icon" />
        </IconButton>
      }
      onLeftIconButtonClick={ toggleLeftMenu }
      title={ <Link style={{ color: '#fff' }} to="/">Readable</Link> }
    />
  )
}

export default HeaderBar
