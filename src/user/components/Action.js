import React from 'react'

export default (props) => {
  const actions = props.actions.map(action => {
    return (
      <ul key={action.id}>
        {action.complete !== true ? <li>{action.description}</li> : ''}
      </ul>
    )
  })
  return (
    <div>{actions}</div>
  )
}
