/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Team from '../api/team/team.model';
import Project from '../api/project/project.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        Thing.create({
          name: 'Development Tools',
          info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
                + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
                + 'Stylus, Sass, and Less.'
        }, {
          name: 'Server and Client integration',
          info: 'Built with a powerful and fun stack: MongoDB, Express, '
                + 'AngularJS, and Node.'
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep '
                + 'tests alongside code. Automatic injection of scripts and '
                + 'styles into your index.html'
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more '
                + 'code reusability and maximum scalability'
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript '
                + 'payload, minifies your scripts/css/images, and rewrites asset '
                + 'names for caching.'
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku '
                + 'and openshift subgenerators'
        });
      })
    .then(() => console.log('finished populating things'))
    .catch(err => console.log('error populating things', err));

    Promise.all([
      User.find({}).remove(),
      Team.find({}).remove(),
      Project.find({}).remove(),
    ])
      .then(() => {
        return Promise.all([
          User.create({
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
          }),
          User.create({
            name: 'Product Owner',
            email: 'product@example.com',
            password: 'test'
          }),
          User.create({
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
          })
        ])
        .then(users => {
          console.log('finished populating users ')

          return Team.insertMany([
            {
              name: 'Team Scrum Board',
            },
            {
              name: 'Team Super Dope',
            },
          ])
            .then(teams => {
              let [team1, team2] = teams;
              let t1, t2;

              return team1.addMembers(users)
                .then(res => {
                  t1 = res[0]
                })
                .then(() => team2.addMembers(users))
                .then(res => {
                  t2 = res[0]
                })
                .then(res => {

                  return Project.insertMany([{
                    name: "Some Project",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    productOwner: users[1],
                    scrumMaster: users[2],
                  }, {
                    name: "Another Project",
                    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    productOwner: users[1],
                    scrumMaster: users[2],
                  }, {
                    name: "Some Project",
                    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
                    productOwner: users[1],
                    scrumMaster: users[2],
                  }, {
                    name: "Some Project",
                    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. ",
                    productOwner: users[1],
                    scrumMaster: users[2],
                  }, {
                    name: "Some Project",
                    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                    productOwner: users[1],
                    scrumMaster: users[2],
                  }, {
                    name: "Some Project",
                    description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
                    productOwner: users[1],
                    scrumMaster: users[2],
                  }])
                    .then(projects => {
                      console.log(t1)
                      return Promise.all([
                        t1.addProjects([
                          projects[0],
                          projects[1],
                          projects[2],
                          projects[3],
                        ]),
                        t2.addProjects([
                          projects[4],
                          projects[5],
                        ])
                      ])
                    });
                })
            })


        })
        .then(() => console.log('populated team'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
