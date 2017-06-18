import React from 'react'
import Action from './Action'
import { Card, Progress, Icon, Header, Popup } from 'semantic-ui-react'

export default (props) => {
  let completed = 0
  let currentGoal = null
  props.goals.forEach(goal => {
    if (currentGoal === null && goal.complete === false) {
      currentGoal = goal
    }
    if (goal.complete === true) {
      completed += 1
    }
  })
  
  let cardContent
  let today = new Date()
  let start = new Date(currentGoal.start_date)
  if ( start > today ) {
     cardContent =
     <Card.Content>
       Congratulations, you're up to date with this goal! You're goal will resume on {currentGoal.start_date}
       <Progress percent={100}/>
     </Card.Content>
  } else {
     cardContent =
     <Card.Content>
       Tasks:
       <Action actions={currentGoal.actions} onCompleteAction={props.onCompleteAction}/>
       Goal Progress: {parseInt(completed/props.goals.length * 100, 10)}%
       <Progress percent={completed/props.goals.length * 100} />
     </Card.Content>
  }
  return(
    <div>
        {cardContent}
      <Card.Content extra>
        Expires at {currentGoal.expiration}
      <Header as='h5' floated='right'>
        <Popup trigger={<Icon name='edit' onClick={() => props.handleOpenEditForm(props.plan)}/>} content='edit this goal'/>
      </Header>
    </Card.Content>

    </div>
  )
}
