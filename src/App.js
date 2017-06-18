import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import NavBar from './NavBar'
import AuthContainer from './auth/containers/AuthContainer'
import UserContainer from './user/containers/UserContainer'
import { isAuthenticated } from './hocs/isAuthenticated'
import { login, createUser } from './api'
import { withRouter } from 'react-router-dom'
import { Container } from 'semantic-ui-react'


const AuthenticatedUserContainer = isAuthenticated(UserContainer)

class App extends Component {
  constructor(){
    super()
    this.state = {
      modalOpen: false
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }

  handleLogin( params ){
    login(params)
    .then( res => {
      sessionStorage.setItem('jwt', res.token)
    })
    .then(() => this.props.history.push('/'))
  }

  handleSignup( params ){
    createUser( params )
    .then( res => {
      sessionStorage.setItem('jwt', res.token)
    })
    .then(() => this.props.history.push('/'))
  }

  handleLogout(){
    sessionStorage.clear()
    this.props.history.push('/')
  }

  handleCloseModal(){
    this.setState({modalOpen: false})
  }

  handleOpenPlanForm(){
    if (sessionStorage.jwt === undefined ) {
      alert('You must be logged in to create a plan.')
    } else {
      this.setState({modalOpen: true})
    }
  }

  render() {
    return (
      <Container>
        <NavBar handleLogout={this.handleLogout} handleOpenPlanForm={this.handleOpenPlanForm.bind(this)}/>
        <h1>Welcome to Habits</h1>
          <Switch>
            <Route exact path='/' render={ () => <AuthenticatedUserContainer modalOpen={this.state.modalOpen} closeModal={this.handleCloseModal.bind(this)} handleOpenPlanForm={this.handleOpenPlanForm.bind(this)}/> }/>
            <Route exact path='/login' render={ () => <AuthContainer handleSignup={this.handleSignup} handleLogin={this.handleLogin}/>}/>
          </Switch>
      </Container>
    );
  }
}

export default withRouter(App)
