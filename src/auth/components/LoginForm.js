import React, { Component } from 'react'
import { Form, Button, Container } from 'semantic-ui-react'

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
      <Container>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Field>
            <label>Username:</label>
            <input required={true} type='text' value={this.state.username} onChange={e => this.handleChange( 'username', e )}/>
          </Form.Field>
          <Form.Field>
            <label>Password:</label>
            <input required={true} type='password' value={this.state.password} onChange={e => this.handleChange( 'password', e )}/>
          </Form.Field>
          <Button type='submit'>Log In</Button>
        </Form>
      </Container>
    )
  }
}
