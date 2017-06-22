import React from 'react'
import Action from './Action'
import { Card, Progress, Icon, Header, Popup, Divider } from 'semantic-ui-react'

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
     <Card.Description>
       Congratulations, you're up to date with this goal! You're goal will resume on {new Date(currentGoal.start_date).toDateString()}
       <Divider/>
       Goal Progress: 100%
       <Progress indicating percent={100}/>
     </Card.Description>
  } else {
     cardContent =

       <Card.Content>
         <Card.Header as='h5'>
           Actions:
         </Card.Header>
         <Card.Description>
           <Action actions={currentGoal.actions} onCompleteAction={props.onCompleteAction}/>
           <Divider/>
           Goal Progress: {parseInt(completedActions/totalActions * 100, 10)}%
           <Progress indicating percent={completedActions/totalActions * 100} />
         </Card.Description>
       </Card.Content>

  }
  return(
    <Card.Content>
        {cardContent}
      <Card.Content extra>
        Expires on {new Date(currentGoal.expiration).toDateString()}
      <Header as='h5' floated='right'>
        <Popup trigger={<Icon name='edit' onClick={() => props.handleOpenEditForm(props.plan)}/>} content='edit this goal'/>
      </Header>
    </Card.Content>

  </Card.Content>
  )
}
