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
  }]

});
ProjectSchema.methods.addStory = function(story) {
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

registerEvents(ProjectSchema);
export default mongoose.model('Project', ProjectSchema);
