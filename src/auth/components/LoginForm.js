import React, { Component } from 'react'

export default class LoginForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.handleLogin(this.state)
    this.setState({
      username: '',
      password: ''
    })
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
        <label>Password:</label>
        <input type='password' value={this.state.password} onChange={e => this.handleChange( 'password', e )}/>
        <input type='submit' value='Login'/>
      </form>
    )
  }
}
