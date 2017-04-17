'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './sprint.events';

var SprintSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(SprintSchema);
export default mongoose.model('Sprint', SprintSchema);
