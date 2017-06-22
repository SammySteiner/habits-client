import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'

export default () => {
  return (
    <Container className={'foreground'}>
      <Segment padded>
        <Header as='h2'>Welcome to Habits</Header>
        <p>Habits is a tool to help create accountability through data for your journey to a better you. Use the form to create new goals, break them up into phases, and describe each action you will take to turn this idea into reality. Good luck. I believe in you!</p>
      </Segment>
    </Container>
  )
}
