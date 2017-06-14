import React from 'react'
import { Form } from 'semantic-ui-react'

export default (props) => {
  const actionsInputs = props.actions.map( (action, i) => {
    return (
      <Form.Field key={i}>
        <label>How will action {i + 1} contribute to this goal:</label>
        <input type='text' value={props.goals[props.goalIndex].actions[i].description} onChange={e => props.handleChange( ['actDesc', props.goalIndex, i], e )}/>
      </Form.Field>
    )
  })
  return (
    <div>
      {actionsInputs}
    </div>
  )
}
