'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './project.events';
import Story from '../stories/stories.model'

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,

  active: {
    type: Boolean,
    default: true,
  },

  productOwner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },

  scrumMaster: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },

  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
  },

  stories: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Story',
    default: []
  }],
  sprints: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Sprint',
    default: []
  }]

});
ProjectSchema.methods.addUserStory = function(story) {
  return this.addStories([story])
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
ProjectSchema.methods.addStories = function(stories) {
  this.stories = this.stories.concat(stories.map(s => s._id));

  return Promise.all([
    this.save(),
    Promise.all(stories.map(s => {
      if (s.project === this._id) return s;
      s.project = this._id;
      return s.save();
    }))
  ])
}

ProjectSchema.methods.addSprint = function(sprint) {
  return this.addSprints([sprint])
  .then(res => {
    // [team, user]
    return [res[0], res[1][0]]
  });
}

ProjectSchema.methods.addSprints = function(sprints) {
  this.sprints = this.sprints.concat(sprints.map(s => s._id));

  return Promise.all([
    this.save(),
    Promise.all(sprints.map(s => {
      if (s.project === this._id) return s;
      s.project = this._id;
      return s.save();
    }))
  ])
}

registerEvents(ProjectSchema);
export default mongoose.model('Project', ProjectSchema);
