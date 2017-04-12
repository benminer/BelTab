'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './stories.events';

var StorySchema = new mongoose.Schema({
  description: String,

  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },

  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  },

  priority: {
    type: Number
  },

  tasks: [{
    content: String,
  }],

  completed: {
    default: false,
    type: Boolean
  },

});

// StorySchema.methods.addTask = function(task) {
//   this.tasks.push(task)
// }

registerEvents(StorySchema);
export default mongoose.model('Story', StorySchema);
