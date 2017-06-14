import React from 'react'
import { List, Icon } from 'semantic-ui-react'

export default (props) => {
  const actions = props.actions.map((action, i) => {
    return (
      <List key={action.id} >
        <List.Item as='a' onClick={() => props.onCompleteAction(action)} >
            <Icon name={action.complete === true ? 'remove circle outline' : 'check circle outline'} />
          <List.Content >
            <List.Header>Action {i + 1}</List.Header>
            <List.Description >
              {action.description}
            </List.Description>
          </List.Content>
        </List.Item>
      </List>
    )
  })
  return (
    <div>{actions}</div>
  )
}
