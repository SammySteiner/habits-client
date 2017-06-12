import React, { Component } from 'react'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'


export default class AuthContainer extends Component {



  render(){
    return (
      <div>
        <h3>Login Form</h3>
        <LoginForm handleLogin={this.props.handleLogin}/>
        <h3>Signup Form</h3>
        <SignupForm />
      </div>
    )
  }
}
