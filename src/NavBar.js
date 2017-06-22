import React from 'react'
import { Menu } from 'semantic-ui-react'

export default ( props ) => {
  return (
    <Menu>
      <Menu.Item>
        Habits
      </Menu.Item>
      <Menu.Item onClick={props.handleOpenPlanForm}>
        Create Goal
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item onClick={props.handleLogout}>
          Log Out
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
