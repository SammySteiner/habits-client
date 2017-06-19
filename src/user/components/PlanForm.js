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
      formValid: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (this.state.title !== nextProps.formState.title) {
      this.setState({
        title: nextProps.formState.title,
        description: nextProps.formState.description,
        repeat: nextProps.formState.repeat,
        goals: nextProps.formState.goals,
        id: nextProps.formState.id,
        complete: nextProps.formState.complete,
        completed_at: nextProps.formState.completed_at
      })
      this.props.handleOpenPlanForm()
    }
  }

  handleChange( prop, event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (prop === 'title' || prop === 'description' || prop === 'repeat') {
      this.setState({ [prop]: value }, () => this.checkFormValid() )
    } else if (prop[0] === 'goalInt') {
      var newState = Object.assign({}, this.state)
      newState.goals[prop[1]].interval = value
      this.setState(newState)
      this.checkFormValid()
    } else if (prop[0] === 'actDesc') {
        newState = Object.assign({}, this.state)
        newState.goals[prop[1]].actions[prop[2]].description = value
        this.setState(newState)
        this.checkFormValid()
    }
  }

  checkFormValid(){
    if (this.state.title.length > 0) {
      if (this.state.description.length > 0) {
        let allGoals = this.state.goals.length
        let allActions = 0
        let validGoals = 0
        let validActions = 0
        this.state.goals.forEach( goal => {
          if (goal.actions.length === 0) {
            allActions += 1
          } else {
            allActions += goal.actions.length
          }
          if (goal.interval.length > 0 && typeof(parseInt(goal.interval, 10)) === 'number' && goal.interval > 0) {
            validGoals += 1
            goal.actions.forEach( action => {
              if (action.description.length > 0) {
                validActions += 1
              }
            })
          }
        })
        if (validGoals > 0 && validActions > 0 && allGoals === validGoals && validActions === allActions){
          return this.setState({ formValid: true })
        } else {
          return this.setState({ formValid: false })
        }
      } else {
        this.setState({ formValid: false })
      }
    } else {
      this.setState({ formValid: false })
    }
  }

  handleDeleteGoal(type, id) {
    let newGoals = this.state.goals
    newGoals.splice(id, 1)
    this.setState({goals: newGoals}, () => this.checkFormValid() )
  }

  handleAddGoal(e){
    var newState = Object.assign({}, this.state)
    newState.goals.push({interval: '', actions: []})
    this.setState(newState)
    this.checkFormValid()
  }

  handleAddAction(e, i){
    var newState = Object.assign({}, this.state)
    newState.goals[i].actions.push({description: ''})
    this.setState(newState)
    this.checkFormValid()
  }

  handleEdit(){
    this.props.editUserPlan(this.state)
    this.props.resetFormState()
  }

  handleSubmit(){
    this.props.createUserPlan(this.state.title, this.state.description, this.state.repeat, this.state.goals)
    this.setState({
      title: '',
      description: '',
      repeat: false,
      goals: [],
      formValid: false
    }, this.props.closeModal )
  }

  render(){
    return(
      <Modal open={this.props.modalOpen} onClose={this.props.resetFormState}>
      <Modal.Header>{ this.state.id !== undefined ? 'Edit Your Plan' : 'Create a Plan' }</Modal.Header>
      <Modal.Content>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <Form.Field>
            <label>Plan Title:</label>
            <input placeholder='An easy to remember name for this goal' type='text' value={this.state.title} onChange={e => this.handleChange( 'title', e )}/>
          </Form.Field>
          <Form.Field>
            <Form.TextArea label='Goal:' placeholder="Describe the long term accomplishments you'd like to create for yourself" value={this.state.description} onChange={e => this.handleChange( 'description', e )} />
            {/* <label>Goal:</label>
            <input placeholder="Describe the long term accomplishments you'd like to create for yourself" type='textarea' value={this.state.description} onChange={e => this.handleChange( 'description', e )}/> */}
          </Form.Field>
          <Form.Field>
            <label>Auto Repeat:</label>
            <input name='repeat' type='checkbox' checked={this.state.repeat} onChange={e => this.handleChange( 'repeat', e )}/>
          </Form.Field>
          <Button type='button' onClick={this.handleAddGoal.bind(this)}>Add a new Goal</Button>
          <GoalInput state={this.state} goals={this.state.goals} handleDelete={this.handleDeleteGoal.bind(this)} handleChange={this.handleChange.bind(this)} handleAddAction={this.handleAddAction.bind(this)}/>
        </Form>
      </Modal.Content>

        {this.state.id !== undefined ?
          <Modal.Actions>
          <Button onClick={this.handleEdit} color='blue' type='button'>Edit Plan</Button>
          <Button onClick={() => this.props.handleDelete('plans', this.state.id)} color='red' type='button'>Delete Plan</Button>
          </Modal.Actions>
          :
          <Modal.Actions>
            <Button onClick={this.handleSubmit} disabled={!this.state.formValid} color='blue' type='button'>Create Plan</Button>
          </Modal.Actions>
        }
      </Modal>
    )
  }
}
