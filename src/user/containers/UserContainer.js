import React, { Component } from 'react'
import { fetchUser, completeAction, deleteItem, createPlan, editPlan } from '../../api'
import { Icon } from 'semantic-ui-react'

import Plan from '../components/Plan'
import PlanForm from '../components/PlanForm'
import UserHeader from '../components/UserHeader'

export default class UserContainer extends Component{
  constructor(){
    super()
    this.state = {
      user: null,
      formState: {
        title: '',
        description: '',
        repeat: false,
        goals: []
      }
    }
  }

  createUserPlan(title, description, repeat, goals){
    createPlan(title, description, repeat, goals)
      .then( data => this.setState({ user: data }))


  }

  editUserPlan(plan){
    editPlan(plan)
    .then( data => this.setState({ user: data }))
  }

  componentDidMount(){
    fetchUser()
    .then( data => this.setState({ user: data })
  )}

  handleCompleteAction(action){
    completeAction(action.id)
    .then( data => this.setState({ user: data }))
  }

  handleDelete( type, id ){
    if (type === 'actions') {
      deleteItem(type, id)
      .then(console.log)
        // .then( data => this.setState({formState: data.plan, user: data}))
    } else {
      deleteItem(type, id)
      .then( data => this.setState({ user: data },
      this.resetFormState) )

    }
  }

  handleOpenEditForm( plan ){
    this.setState({formState: plan})
  }

  resetFormState(){
    this.setState({formState: {
      title: '',
      description: '',
      repeat: false,
      goals: []
    }}, () => this.props.closeModal() )
  }

  render(){
    if (this.state.user === null) {
      return <div><Icon loading name='spinner' size='massive'/></div>
    } else {
      return (
        <div>
          <UserHeader user={this.state.user} plans={this.state.user.plans.filter(plan => plan.goals.length > 0)}/>
          <Plan user={this.state.user}
            onCompleteAction={this.handleCompleteAction.bind(this)}
            handleDelete={this.handleDelete.bind(this)}
            handleOpenEditForm={this.handleOpenEditForm.bind(this)}/>
          <PlanForm
            resetFormState={this.resetFormState.bind(this)}
            formState={this.state.formState}
            createUserPlan={this.createUserPlan.bind(this)}
            modalOpen={this.props.modalOpen}
            closeModal={this.props.closeModal}
            handleOpenPlanForm={this.props.handleOpenPlanForm}
            editUserPlan={this.editUserPlan.bind(this)}
            handleDelete={this.handleDelete.bind(this)}/>
        </div>
      )
    }
  }
}
