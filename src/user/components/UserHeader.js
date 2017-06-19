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
        </Header.Content>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Chart height={200} type ='polarArea' data={chartData(props.user)} options={{legend: {position: 'bottom'}}}/>
            </Grid.Column>
            <Grid.Column>
              <h3>You've completed {completedPlans(props.user)} out of {props.plans.length} Plans</h3>
              <Progress progress indicating percent={completedActiveGoals(props.user)}>Percent of active Goals you've completed</Progress>
              <Progress progress indicating percent={completedActiveActions(props.user)}>Percent of active Actions you've taken toward your goals. Keep it up!</Progress>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Header>
  )
}
