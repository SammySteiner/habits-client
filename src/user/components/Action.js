import React from 'react'
import { List, Icon } from 'semantic-ui-react'

  export default (props) => {
    function compare(a, b) {
      const idA = a.id
      const idB = b.id

      let comparison = 0;
      if (idA > idB) {
        comparison = 1
      } else if (idA < idB) {
        comparison = -1
      }
      return comparison
  }
  const actionsSort = props.actions.sort(compare)
  const actions = actionsSort.map((action, i) => {
    return (
      <List key={action.id} >
        <List.Item as='a' onClick={() => props.onCompleteAction(action)} >
            <Icon size='large' name={action.complete === true ? 'check circle' : 'circle thin'} color={action.complete === true ? 'green' : 'grey'} />
          <List.Content >
            <List.Header>{action.description}</List.Header>
          </List.Content>
        </List.Item>
      </List>
    )
  })
  return (
    <div>{actions}</div>
  )
}
