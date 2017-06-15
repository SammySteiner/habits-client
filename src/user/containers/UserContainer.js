import React, { Component } from 'react'
import { fetchUser, completeAction, deleteItem, createPlan } from '../../api'
import { Icon } from 'semantic-ui-react'

import Plan from '../components/Plan'
import PlanForm from '../components/PlanForm'
import UserHeader from '../components/UserHeader'

export default class UserContainer extends Component{
  constructor(){
    super()
    this.state = {
      user: null
    }
  }

  createUserPlan(title, description, repeat, goals){
    createPlan(title, description, repeat, goals)
    .then( (data) => this.setState({ user: data }) )
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
    deleteItem(type, id)
    .then( data => this.setState({ user: data }) )
  }

  render(){
    if (this.state.user === null) {
      return <div><Icon loading name='spinner' size='massive'/></div>
    } else {
      return (
        <div>
          <UserHeader username={this.state.user.username} plans={this.state.user.plans.filter(plan => plan.goals.length > 0)}/>
          <Plan user={this.state.user}
            onCompleteAction={this.handleCompleteAction.bind(this)}
            handleDelete={this.handleDelete.bind(this)}/>
          <PlanForm createUserPlan={this.createUserPlan.bind(this)} modalOpen={this.props.modalOpen} closeModal={this.props.closeModal}/>
        </div>
      )
    }
  }
}
