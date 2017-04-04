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

registerEvents(ProjectSchema);
export default mongoose.model('Project', ProjectSchema);
