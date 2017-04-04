'use strict';

import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import {registerEvents} from './team.events';

import Project from '../project/project.model'

var TeamSchema = new mongoose.Schema({
  name: String,

  members: [{
      type: mongoose.Schema.ObjectId,
      ref: 'User',
  }],

  projects: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  }],

});

/**
* Add member to this team
*
* @param user {User} - User to add.
* @return {Promise}
*/
TeamSchema.methods.addMember = function(user) {
  return this.addMembers([user])
  .then(res => {
    // [team, user]
    return [res[0], res[1][0]]
  });
}
/**
* Add members to this team, same as addMembers but plural
*
* @param users {User[]} - users to add
* @returns {Promise}
*/
TeamSchema.methods.addMembers = function(users) {
  this.members = this.members.concat(users.map(u => u._id));

  return Promise.all([
    this.save(),
    Promise.all(users.map(u => {
      if (u.teams.indexOf(this._id) !== -1) return u;
      u.teams.push(this._id);
      return u.save();
    }))
  ])
}

/**
* Add project to this team
*
* @param user {User} - User to add.
* @return {Promise}
*/
TeamSchema.methods.addProject = function(proj) {
  return this.addProjects([proj])
  .then(res => {
    // [team, proj]
    return [res[0], res[1][0]]
  });
}
/**
* Add projects to this team,
*
* @param projects {Project[]} - projects to add
* @returns {Promise}
*/
TeamSchema.methods.addProjects = function(projects) {
  this.projects = this.projects.concat(projects.map(p => p._id));

  return Promise.all([
    this.save(),
    Promise.all(projects.map(p => {
      p.team = this._id;
      return p.save();
    }))
  ])
}


registerEvents(TeamSchema);
export default mongoose.model('Team', TeamSchema);
