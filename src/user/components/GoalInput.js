import React from 'react'
import ActionInput from './ActionInput'

export default (props) => {
  const goalsInputs = props.goals.map((goal) => {
    return(
      <div>
        <label>{`How many days do you have to accomplish ${goal}:`}</label>
        <input type='number' value={props.state['goal' + goal]} onChange={e => props.handleChange( 'goal' + goal, e )}/>
        <button type='button' onClick={props.handleAddAction}>Add a new Action</button>
        <ActionInput
          state={props.state}
          actions={props.state['actions' + goal]}
          handleChange={props.handleChange}/>
      </div>
    )
  })
  return(
    <div>
      {goalsInputs}
    </div>
  )
}
