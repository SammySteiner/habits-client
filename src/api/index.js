let DB_URL = 'https://fast-fjord-30160.herokuapp.com/api/v1'
// if (ENV['DB_URL']) {
//   DB_URL = ENV['DB_URL']
// }

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
    body: JSON.stringify( {plan: {title: title, description: description, repeat: repeat, goals_attributes: formatGoals(goals)}} )
  })
  .then( res => res.json() )
}

export function editPlan(plan){
  return fetch(DB_URL + 'plan/' + plan.id + '/edit', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.jwt
    },
    method: 'PATCH',
    body: JSON.stringify( {plan: formatPlan(plan) } )
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

export function deleteItem( type, id ){
  return fetch(DB_URL + 'users/' + type + '/' + id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.jwt
    },
    method: 'DELETE',
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

export function SuccessGif(){
  return fetch('https://api.giphy.com/v1/gifs/search?q=success&api_key=dc6zaTOxFJmzC')
  .then( res => res.json() )
}

function formatGoals(goals) {
  return goals.map( (goal) => {
    return Object.assign(goal, {actions_attributes: goal.actions})
  })
}

function formatPlan(plan) {
  var newPlan = Object.assign({}, plan, {goals_attributes: plan.goals})
  newPlan.goals_attributes = formatGoals(newPlan.goals_attributes)
  return newPlan
}
