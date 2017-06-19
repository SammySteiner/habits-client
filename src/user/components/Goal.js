import React from 'react'
import Action from './Action'
import { Card, Progress, Icon, Header, Popup } from 'semantic-ui-react'

export default (props) => {
  let completedActions = 0
  let currentGoal = null
  let totalActions = 0
  props.goals.forEach(goal => {
    if (currentGoal === null && goal.complete === false) {
      currentGoal = goal
    }
    goal.actions.forEach(action => {
      totalActions += 1
      if (action.complete) {
        completedActions += 1
      }
    })
  })

  let cardContent
  let today = new Date()
  let start = new Date(currentGoal.start_date)
  if ( start > today ) {
     cardContent =
     <Card.Content>
       Congratulations, you're up to date with this goal! You're goal will resume on {new Date(currentGoal.start_date).toDateString()}
       <Progress indicating percent={100}/>
     </Card.Content>
  } else {
     cardContent =
     <Card.Content>
       Tasks:
       <Action actions={currentGoal.actions} onCompleteAction={props.onCompleteAction}/>
       Goal Progress: {parseInt(completedActions/totalActions * 100, 10)}%
       <Progress indicating percent={completedActions/totalActions * 100} />
     </Card.Content>
  }
  return(
    <div>
        {cardContent}
      <Card.Content extra>
        Expires on {new Date(currentGoal.expiration).toDateString()}
      <Header as='h5' floated='right'>
        <Popup trigger={<Icon name='edit' onClick={() => props.handleOpenEditForm(props.plan)}/>} content='edit this goal'/>
      </Header>
    </Card.Content>

    </div>
  )
}
