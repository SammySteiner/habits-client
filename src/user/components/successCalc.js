export function completedPlans(user){
  let completePlans = 0
  user.plans.forEach( plan => {
    if (plan.complete) {
      completePlans += 1
    }
  })
  return completePlans
}

export function completedActiveGoals(user){
  let totalActiveGoals = 0
  let completeActiveGoals = 0
  user.plans.forEach( plan => {
    plan.goals.forEach( goal => {
      let today = new Date()
      let start = new Date(goal.start_date)
      if ( start < today ) {
        totalActiveGoals += 1
        if (goal.complete) {
          completeActiveGoals += 1
        }
      }
    })
  })
  return Math.round(completeActiveGoals / totalActiveGoals * 100)
}

export function completedActiveActions(user){
  let totalActiveActions = 0
  let completeActiveActions = 0
  user.plans.forEach( plan => {
    plan.goals.forEach( goal => {
      let today = new Date()
      let start = new Date(goal.start_date)
      if ( start < today ) {
        goal.actions.forEach(action =>{
          totalActiveActions += 1
          if (action.complete) {
            completeActiveActions += 1
          }
        })
      }
    })
  })
  return Math.round(completeActiveActions / totalActiveActions * 100)
}

export function chartData(user){
  let data = {
    datasets: [{
        data: [],
        backgroundColor: []
          }],
    labels: []
  }

  user.plans.forEach(plan => {
    let totalActiveActions = 0
    let completeActiveActions = 0
    plan.goals.forEach(goal => {
      if (Date.parse(goal.start_date) < Date.now()) {
        goal.actions.forEach(action =>{
          totalActiveActions += 1
          if (action.complete) {
            completeActiveActions += 1
          }
        })
      }
    })

    data.datasets[0].data.push(Math.round(completeActiveActions / totalActiveActions * 100))
  })

  user.plans.forEach((plan, i) => {
    data.labels.push(plan.title)
    data.datasets[0].backgroundColor.push(colors[i])
  })

  return data
}

let colors = [ '#3366CC', '#DC3912', '#FF9900', '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC']
