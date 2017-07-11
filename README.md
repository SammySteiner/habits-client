# Habits
## Client Application

Habits is an goal setting and activity tracking application with data analysis and performance feedback. Users can create accounts, sign in, create new goals with the 'create goal' form on the nav bar, edit their goals, and check off their accomplishments. Habits does the rest.

To create a new goal, open the form and give the goal a simple title. The description can be anything you want, but I find it is most helpful to ask what is the motivation behind the goal. What positive change are you trying to make in your life with this goal or habit. Then break the goal down into manageable phases. Each phase should take a number of days and have a number of actions. Add a few actions, and ask yourself how many days do you want to take to complete phase 1? Try to be as granular as possible. This process is a great first step toward achieving your goal.

When you're done, create the form. You can always edit your goal later. If you select 'Auto Repeat', your goal will recreate all the phases from your initial goal. When you've completed a set of actions in your repeated plan, it will let you know when your new phase will start.

## Demo

![Habits Demo](public/HabitsDemo.gif)

## Installation

run `npm install` to set up the install the node modules and create the dependencies. This will create your pakage-json.lock file.

If you are running this off a different database than the one hosted on heroku, you will need to modify the url in 'src/api/index.js' on line 1. This should point to wherever your database lives. If you forked and cloned Habits-Api as well, you'll want to point the api requests to 'http://localhost:3000/api/v1/'.

run `npm start` to run this on a localhoast server.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
