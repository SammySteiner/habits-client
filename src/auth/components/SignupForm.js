import React, { Component } from 'react'
import { createUser } from '../../api'

export default class SignupForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleSubmit(e){
    e.preventDefault()
    createUser(this.state.username, this.state.email, this.state.password, this.state.password_confirmation)
    .then(() => this.setState({
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  )
  }

  handleChange( prop, e){
    this.setState({
      [prop]: e.target.value
    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Username:</label>
        <input type='text' value={this.state.username} onChange={e => this.handleChange( 'username', e )}/>
        <label>Email:</label>
        <input type='text' value={this.state.email} onChange={e => this.handleChange( 'email', e )}/>
        <label>Password:</label>
        <input type='password' value={this.state.password} onChange={e => this.handleChange( 'password', e )}/>
        <label>Password Confirmation:</label>
        <input type='password' value={this.state.password_confirmation} onChange={e => this.handleChange( 'password_confirmation', e )}/>
        <input type='submit' value='Create User'/>
      </form>
    )
  }
}
