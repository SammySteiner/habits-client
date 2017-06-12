import React from 'react'
import Action from './Action'

export default (props) => {
  let completed = 0
  let currentGoal = null
  props.goals.forEach(goal => {
    if (currentGoal === null && goal.complete === false) {
      currentGoal = goal
    }
    if (goal.completed === true) {
      completed += 1
    }
  })
  return(
    <div>
      <h5>You have completed {completed/100}% of this plan</h5>
      <h5>Your current Goal expires at {currentGoal.expiration}</h5>
      <h5>To complete your goal, you must: </h5>
      <Action actions={currentGoal.actions} />
    </div>
  )
}
