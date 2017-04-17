/**
 * Sprint model events
 */

'use strict';

import {EventEmitter} from 'events';
var SprintEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SprintEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Sprint) {
  for(var e in events) {
    let event = events[e];
    Sprint.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    SprintEvents.emit(event + ':' + doc._id, doc);
    SprintEvents.emit(event, doc);
  };
}

export {registerEvents};
export default SprintEvents;
