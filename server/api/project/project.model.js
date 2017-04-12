'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './project.events';

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

});
ProjectSchema.methods.addStory = function(story) {
  return this.addStories([Story])
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
ProjectSchema.methods.addStory = function(story) {
  this.stories = this.stories.concat(stories.map(u => u._id));

  return Promise.all([
    this.save(),
    Promise.all(stories.map(u => {
      if (u.projects.indexOf(this._id) !== -1) return u;
      u.projects.push(this._id);
      return u.save();
    }))
  ])
}

registerEvents(ProjectSchema);
export default mongoose.model('Project', ProjectSchema);
