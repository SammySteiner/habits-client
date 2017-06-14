const DB_URL = 'http://localhost:3000/api/v1/'

export function fetchUsers(username, password){
  return fetch(DB_URL + 'users/', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.jwt
    },
    method: 'GET',
    body: JSON.stringify( {user: {username: username, password: password} } )
  } )
    .then( res => res.json() )
}

export function fetchUser(){
  return fetch(DB_URL + 'users/dashboard' , {
    headers: {
      'Authorization': sessionStorage.jwt
    }
  } )
    .then( res => res.json() )
}

export function createUser(params){
  return fetch(DB_URL + 'users', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify( {user: params} )
  })
  .then( res => res.json() )
}

export function createPlan(title, description, repeat, goals){
  return fetch(DB_URL + 'users/newplan', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.jwt
    },
    method: 'POST',
    body: JSON.stringify( {plan: {title: title, description: description, repeat: repeat, goals: goals}} )
  })
  .then( res => res.json() )
}

export function completeAction(action_id){
  return fetch(DB_URL + 'users/complete-action/' + action_id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.jwt
    },
    method: 'PATCH',
  })
  .then( res => res.json() )
}

export function login(params){
  return fetch(DB_URL + 'auth', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify( params )
  })
  .then( res => res.json() )
}
