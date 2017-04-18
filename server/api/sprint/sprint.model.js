'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './sprint.events';

var SprintSchema = new mongoose.Schema({
  name: String,
  length: Number,
  active: Boolean,
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
  },
});

registerEvents(SprintSchema);
export default mongoose.model('Sprint', SprintSchema);
