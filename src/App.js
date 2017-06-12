import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import AuthContainer from './auth/containers/AuthContainer'
import UserContainer from './user/containers/UserContainer'
import { isAuthenticated } from './hocs/isAuthenticated'
import { login } from './api'
import { withRouter } from 'react-router-dom'


const AuthenticatedUserContainer = isAuthenticated(UserContainer)

class App extends Component {
  constructor(){
    super()
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin( params ){
    login(params)
    .then( res => {
      sessionStorage.setItem('jwt', res.token)
    })
    .then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to Habits</h1>
          <Switch>
            <Route exact path='/' component={AuthenticatedUserContainer}/>
            <Route exact path='/login' render={ () => <AuthContainer handleLogin={this.handleLogin}/>}/>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App)
