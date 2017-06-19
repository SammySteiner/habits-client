import React from 'react'
import ActionInput from './ActionInput'
import { Button, Form, Icon, Divider, Segment } from 'semantic-ui-react'

export default (props) => {
  const goalsInputs = props.goals.map( (goalObj, i) => {
    return (
      <Form.Field key={i}>
        <Divider></Divider>
        <Segment>
        <label>{`How many days do you have to accomplish goal ${i + 1}:`}</label>
        <input type='number' value={props.goals[i]['interval']} onChange={e => props.handleChange( ['goalInt', i], e )}/>
        <Button type='button' onClick={(e) => props.handleAddAction(e, i)}>Add a new Action</Button>
        {/* if the goal is in the db and it has an id, use the db handledelete, otherwise, create a new function to just remove it from the planForm state */}

        <Icon name='remove' onClick={() => props.handleDelete('goals', i)}/>
        <ActionInput
          goals={props.state.goals}
          actions={goalObj.actions}
          goalIndex={i}
          handleChange={props.handleChange}
          handleDelete={props.handleDelete}/>
          </Segment>
      </Form.Field>
    )
  })
  return(
    <div>
      {goalsInputs}
    </div>
  )
}
