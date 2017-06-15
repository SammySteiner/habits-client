import React, { Component } from 'react'
import GoalInput from './GoalInput'
import { Form, Button, Modal } from 'semantic-ui-react'

export default class PlanForm extends Component {
  constructor(){
    super()
    this.state = {
      title: '',
      description: '',
      repeat: false,
      goals: [],
      modalOpen: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange( prop, event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (prop === 'title' || prop === 'description' || prop === 'repeat') {
      this.setState({ [prop]: value })
    } else if (prop[0] === 'goalInt') {
      var newState = Object.assign({}, this.state)
      newState.goals[prop[1]].interval = value
      this.setState(newState)
    } else if (prop[0] === 'actDesc') {
        newState = Object.assign({}, this.state)
        newState.goals[prop[1]].actions[prop[2]].description = value
        this.setState(newState)
    }
  }

  handleAddGoal(e){
    var newState = Object.assign({}, this.state)
    newState.goals.push({interval: '', actions: []})
    this.setState(newState)
  }

  handleAddAction(e, i){
    var newState = Object.assign({}, this.state)
    newState.goals[i].actions.push({description: ''})
    this.setState(newState)
  }

  handleSubmit(){
    this.props.createUserPlan(this.state.title, this.state.description, this.state.repeat, this.state.goals)
    this.setState({
      title: '',
      description: '',
      repeat: false,
      goals: [],
      modalOpen: false
    })
  }

  render(){
    return(
      <Modal trigger={<Button onClick={() => this.setState({modalOpen: true})}>Show Modal</Button>} open={this.state.modalOpen}>
      <Modal.Header>Create a Plan</Modal.Header>
      <Modal.Content>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Field>
            <label>Plan Title:</label>
            <input type='text' value={this.state.title} onChange={e => this.handleChange( 'title', e )}/>
          </Form.Field>
          <Form.Field>
            <label>Plan Description:</label>
            <input type='textarea' value={this.state.description} onChange={e => this.handleChange( 'description', e )}/>
          </Form.Field>
          <Form.Field>
            <label>Auto Repeat:</label>
            <input name='repeat' type='checkbox' checked={this.state.repeat} onChange={e => this.handleChange( 'repeat', e )}/>
          </Form.Field>
          <Button type='button' onClick={this.handleAddGoal.bind(this)}>Add a new Goal</Button>
          <GoalInput state={this.state} goals={this.state.goals} handleChange={this.handleChange.bind(this)} handleAddAction={this.handleAddAction.bind(this)}/>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={this.handleSubmit} color='blue' type='submit'>Create Plan</Button>
      </Modal.Actions>
      </Modal>
    )
  }
}
