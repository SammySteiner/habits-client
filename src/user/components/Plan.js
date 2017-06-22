import React from 'react'
import Goal from './Goal'
import { Card } from 'semantic-ui-react'

export default (props) => {
  const plans = props.user.plans.map((plan, index) => {
    if ( plan.goals.length > 0 && plan.complete !== true ){
      return (
        <Card raised key={plan.id}>
          <Card.Content>
            <Card.Header>{plan.title}</Card.Header>
            <Card.Meta>{plan.description}</Card.Meta>
          </Card.Content>
            <Goal plan={plan} goals={plan.goals} onCompleteAction={props.onCompleteAction} handleOpenEditForm={props.handleOpenEditForm}/>
        </Card>
      )
    } else {
      return null
    }
  })
  return (
    <Card.Group itemsPerRow={3}>
      {plans}
    </Card.Group>
  )
}
