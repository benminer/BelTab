'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './stories.events';

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,

  active: {
    type: Boolean,
    default: true,
  },

  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },

  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  },

});

registerEvents(StorySchema);
export default mongoose.model('Story', StorySchema);
