import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

export default (props) => {
  return (
    <Header>
      <Segment>
        <Header.Content>
          <h3>Welcome {props.username}</h3>
          <h4>You have {props.plans.length} plan(s)</h4>
        </Header.Content>
      </Segment>
    </Header>

  )
}
