import React, { Component } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'

export default class SignupForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      // email: '',
      password: '',
      password_confirmation: ''
    }
  }

  handleSubmit(e){
    e.preventDefault()
    if (this.checkPasswordConfirmation() && !this.checkUsernameTaken()) {
      this.props.handleSignup(this.state)
      this.setState({
        username: '',
        // email: '',
        password: '',
        password_confirmation: ''
      })
    } else {
      alert('User invalid. Check warning messages on sign up form.')
    }

  }

  handleChange( prop, e){
    this.setState({
      [prop]: e.target.value
    })
  }

  checkPasswordConfirmation(){
    return this.state.password === this.state.password_confirmation
  }

  checkUsernameTaken(){
    return this.props.usernames.includes(this.state.username)
  }

  render(){
    return (
      <Form warning onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field>
          <label>Username:</label>
          <input required={true} type='text' value={this.state.username} onChange={e => this.handleChange( 'username', e )}/>
          {this.checkUsernameTaken() ? <Message warning content="Username is taken" /> : ''}
        </Form.Field>
        {/* <Form.Field>
          <label>Email:</label>
          <input type='text' value={this.state.email} onChange={e => this.handleChange( 'email', e )}/>
        </Form.Field> */}
        <Form.Field>
          <label>Password:</label>
          <input required={true} type='password' value={this.state.password} onChange={e => this.handleChange( 'password', e )}/>
        </Form.Field>
        <Form.Field>
          <label>Password Confirmation:</label>
          <input required={true} type='password' value={this.state.password_confirmation} onChange={e => this.handleChange( 'password_confirmation', e )}/>
          {!this.checkPasswordConfirmation() ? <Message warning content="Password confirmation doesn't match password" /> : ''}
        </Form.Field>
        <Button type='submit'>Create User</Button>
      </Form>
    )
  }
}
