import React from 'react'
import ActionInput from './ActionInput'
import { Button, Form } from 'semantic-ui-react'

export default (props) => {
  const goalsInputs = props.goals.map( (goalObj, i) => {
    return (
      <Form.Field key={i}>
        <label>{`How many days do you have to accomplish goal ${i + 1}:`}</label>
        <input type='number' value={props.goals[i]['interval']} onChange={e => props.handleChange( ['goalInt', i], e )}/>
        <Button type='button' onClick={(e) => props.handleAddAction(e, i)}>Add a new Action</Button>
        <ActionInput
          goals={props.state.goals}
          actions={goalObj.actions}
          goalIndex={i}
          handleChange={props.handleChange}/>
      </Form.Field>
    )
  })
  return(
    <div>
      {goalsInputs}
    </div>
  )
}
