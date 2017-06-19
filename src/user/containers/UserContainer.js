import React, { Component } from 'react'
import { fetchUser, completeAction, deleteItem, createPlan, editPlan, SuccessGif } from '../../api'
import { completedPlans } from '../components/successCalc'
import { Icon } from 'semantic-ui-react'

import Plan from '../components/Plan'
import PlanForm from '../components/PlanForm'
import UserHeader from '../components/UserHeader'
import SuccessModal from '../components/SuccessModal'

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
      },
      successModal: false,
      successModalPlan: null,
      successCheer: ''
    }
  }

  componentWillUpdate(nextProps, nextState){
    if (this.state.user !== null && completedPlans(this.state.user) !== completedPlans(nextState.user)) {
      let plan = nextState.user.plans.find(newPlan => newPlan.complete !== this.state.user.plans.find(oldPlan => oldPlan.id === newPlan.id).complete)
      SuccessGif().then(res => res.data[Math.floor(Math.random() * res.data.length)].images.fixed_height.url)
      .then(img => this.setState({successModal: true, successModalPlan: plan, successCheer: img}))
    }
  }

  handleCloseSuccessModal(){
    this.setState({successModal: false, successModalPlan: null})
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
    if (type = 'plans') {
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
          <UserHeader user={this.state.user} plans={this.state.user.plans.filter(plan => plan.goals.length > 0)} />
          <SuccessModal plan={this.state.successModalPlan} successModal={this.state.successModal} closeSuccessModal={this.handleCloseSuccessModal.bind(this)} gif={this.state.successCheer}/>
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
