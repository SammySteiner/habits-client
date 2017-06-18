import React from 'react'
import { Header, Segment, Grid, Progress } from 'semantic-ui-react'
import { completedPlans, completedActiveGoals, completedActiveActions, chartData } from './successCalc'
import Chart from "react-chartjs-2"


export default (props) => {

  return (
    <Header>
      <Segment>
        <Header.Content>
          <h3>Welcome {props.user.username}</h3>
          <h4>You have {props.plans.length} plan(s)</h4>
        </Header.Content>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Chart height={200} type ='polarArea' data={chartData(props.user)} redraw />
            </Grid.Column>
            <Grid.Column>
              <Progress indicating percent={completedPlans(props.user)}>Number of Plans you've Achieved</Progress>
              <Progress indicating percent={completedActiveGoals(props.user)}>Number of Goals you've completed</Progress>
              <Progress indicating percent={completedActiveActions(props.user)}>Number of Actions you've taken toward your goals. Keep it up!</Progress>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Header>
  )
}
