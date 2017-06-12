import React from 'react'

export default (props) => {
  const actionsInputs = props.actions.map((action) => {
    return(
      <div>
        <label>{`How will you make progress toward this goal:`}</label>
        <input type='text' value={props.state[action]} onChange={e => props.handleChange( action, e )}/>
      </div>
    )
  })
  return (
    <div>
      {actionsInputs}
    </div>
  )
}
