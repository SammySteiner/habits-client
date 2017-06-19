import React from 'react'
import { Form, Container } from 'semantic-ui-react'

export default (props) => {
  const actionsInputs = props.actions.map( (action, i) => {
    return (
      <Container text>
        <Form.Field key={i}>
          <Form.TextArea label={`Action ${i + 1}:`} placeholder={`What specifically will you do to complete action ${i + 1}?`} value={props.goals[props.goalIndex].actions[i].description} onChange={e => props.handleChange( ['actDesc', props.goalIndex, i], e )}/>
          {/* <label>Action {i + 1}:</label>
          <input placeholder={`What specifically will you do to complete action ${i + 1}?`} type='textarea' value={props.goals[props.goalIndex].actions[i].description} onChange={e => props.handleChange( ['actDesc', props.goalIndex, i], e )}/> */}
          {/* if the action is in the db and it has an id, use the db handledelete, otherwise, create a new function to just remove it from the planForm state */}
          {/* {action.id ? <Icon name='remove' onClick={() => props.handleDelete('actions', action.id)}/> : ''} */}

        </Form.Field>
      </Container>

    )
  })
  return (
    <div>
      {actionsInputs}
    </div>
  )
}
