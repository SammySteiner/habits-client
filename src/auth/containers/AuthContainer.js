import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import { fetchUserNames } from '../../api'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

export default class AuthContainer extends Component {
  constructor(){
    super()
    this.state = {usernames: []}
  }

  componentDidMount(){
    fetchUserNames()
    .then( data => this.setState({ usernames: data }))
  }

  render(){
    return (
      <Grid columns={2} divided>
        <Grid.Column>
          <h3>Log In</h3>
          <LoginForm handleLogin={this.props.handleLogin}/>
        </Grid.Column>
        <Grid.Column>
          <h3>Sign Up</h3>
          <SignupForm usernames={this.state.usernames} handleSignup={this.props.handleSignup}/>
        </Grid.Column>
      </Grid>
    )
  }
}
