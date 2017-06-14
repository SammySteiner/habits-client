import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'

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
    this.props.handleSignup(this.state)
    this.setState({
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    })
  }

  handleChange( prop, e){
    this.setState({
      [prop]: e.target.value
    })
  }

  render(){
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field>
          <label>Username:</label>
          <input type='text' value={this.state.username} onChange={e => this.handleChange( 'username', e )}/>
        </Form.Field>
        <Form.Field>
          <label>Email:</label>
          <input type='text' value={this.state.email} onChange={e => this.handleChange( 'email', e )}/>
        </Form.Field>
        <Form.Field>
          <label>Password:</label>
          <input type='password' value={this.state.password} onChange={e => this.handleChange( 'password', e )}/>
        </Form.Field>
        <Form.Field>
          <label>Password Confirmation:</label>
          <input type='password' value={this.state.password_confirmation} onChange={e => this.handleChange( 'password_confirmation', e )}/>
        </Form.Field>
        <Button type='submit'>Create User</Button>
      </Form>
    )
  }
}
