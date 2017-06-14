import React, { Component } from 'react'
import { fetchUser, completeAction } from '../../api'
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


  componentDidMount(){
    fetchUser()
    .then( data => this.setState({ user: data })
  )}

  handleCompleteAction(action){
    completeAction(action.id)
    .then( data => this.setState({ user: data }))
  }

  render(){
    if (this.state.user === null) {
      return <div><Icon loading name='spinner' size='massive'/></div>
    } else {
      return (
        <div>
          <UserHeader username={this.state.user.username} plans={this.state.user.plans.filter(plan => plan.goals.length > 0)}/>
          <Plan user={this.state.user} onCompleteAction={this.handleCompleteAction.bind(this)}/>
          <h2>Create a new Plan:</h2>
          <PlanForm />
        </div>
      )
    }
  }
}
