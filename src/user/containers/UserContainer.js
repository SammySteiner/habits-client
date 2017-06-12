import React, { Component } from 'react'
import { fetchUser } from '../../api'

import Plan from '../components/Plan'
import PlanForm from '../components/PlanForm'

export default class UserContainer extends Component{
  constructor(){
    super()
    this.state = {
      user: null

      // {
      //   id: null,
  	  //   username: null,
  	  //   plans: {
  		//     id: null,
  		//     title: null,
      //     description: null,
      //     repeat: null,
      //     complete: null,
      //     completed_at: null,
      //     goals: {
  		// 	    id: null,
  		// 	    expiration: null,
  		// 	    complete: null,
  		// 	    completed_at: null,
  		// 	    actions: {
  		// 		    id: null,
  		// 		    description: null,
  		// 		    complete: null,
  		// 		    completed_at: null
      //       }
  		//     }
  	  //   }
      // }
    }
  }


  componentDidMount(){
    console.log('user container did mount');
    fetchUser()
    .then( data => this.setState({ user: data })
  )}

  render(){
    return (
      <div>
        <h3>{this.state.user !== null ? `Welcome ${this.state.user.username}` : 'Loading'}</h3>
        <h4>{this.state.user !== null ? `You have ${this.state.user.plans.filter(plan => plan.goals.length > 0).length} plan(s)` : 'Loading'}</h4>
        {this.state.user !== null ? <Plan user={this.state.user} /> : <h5>Loading Plans</h5>}
        <h2>Create a new Plan:</h2>
        <PlanForm />
      </div>
    )
  }
}
