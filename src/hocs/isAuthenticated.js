import React from 'react'

import { Redirect } from 'react-router-dom'

export function isAuthenticated(WrappedComponent){
  return class extends React.Component {
    render(){
      if (!sessionStorage.jwt) {
        return <Redirect to='/login' />
      }
      return <WrappedComponent {...this.props} />
    }
  }
}
