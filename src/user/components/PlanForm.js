import React, { Component } from 'react'
import GoalInput from './GoalInput'

import { createPlan } from '../../api'

export default class PlanForm extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      description: '',
      repeat: false,
      goal: 0,
      goals: [],
      action: 0
    }
  }

  handleChange( prop, event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [prop]: value
    });
  }

  handleAddGoal(e){
    let goalNumber = this.state.goal + 1
    let goalValue = "goal" + goalNumber
    let actions = 'actions' + goalNumber
    this.setState((prevState) => Object.assign({}, prevState, prevState.goal = goalNumber, prevState[goalValue] = '', prevState.goals.push(goalNumber), prevState[actions] = []))
  }

  handleAddAction(e){
    let actionNumber = this.state.action + 1
    let actionValue = "action" + actionNumber
    let goalNumber = this.state.goal
    let actionsNumber = 'actions' + goalNumber
    this.setState((prevState) => Object.assign({}, prevState, prevState.action = actionNumber, prevState[actionValue] = '', prevState[actionsNumber].push(actionValue)))
  }

  handleSubmit(e){
    e.preventDefault()
    let goals = this.state.goals.map( goal => {
      return (
        { expiration: this.state['goal' + goal],
          actions: this.state[ 'actions' + goal ].map( act => this.state[act] )
        }
      )
    })
    createPlan(this.state.title, this.state.description, this.state.repeat, goals)
  }

  render(){
    console.log(this.state)
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Plan Title:</label>
        <input type='text' value={this.state.title} onChange={e => this.handleChange( 'title', e )}/>
        <label>Plan Description:</label>
        <input type='textarea' value={this.state.description} onChange={e => this.handleChange( 'description', e )}/>
        <label>Auto Repeat:</label>
        <input name='repeat' type='checkbox' checked={this.state.repeat} onChange={e => this.handleChange( 'repeat', e )}/>
        <button type='button' onClick={this.handleAddGoal.bind(this)}>Add a new Goal</button>
        <GoalInput state={this.state} goals={this.state.goals} handleChange={this.handleChange.bind(this)} handleAddAction={this.handleAddAction.bind(this)}/>
        {/* goal form that shows: */}
          {/* expiration in days */}
          {/* add multiple actions. Perhaps a button that adds a label and input to the form dynamically */}
        {/* button to dynamically add another goal form */}

        <input type='submit' value='Create Plan' />
      </form>
    )
  }
}
