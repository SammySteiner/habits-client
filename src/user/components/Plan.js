import React from 'react'
import Goal from './Goal'

export default (props) => {
  console.log(props.user)
  const plans = props.user.plans.map((plan, index) => {
    if (plan.goals.length > 0){
      return (
        <div key={plan.id}>
          <h5>Plan {index + 1}: {plan.title}</h5>
          <h5>Description: {plan.description}</h5>
          <Goal goals={plan.goals} />
        </div>
      )
    } else {
      return null
    }
  })
  return (
    <div>
      {plans}
    </div>
  )
}
