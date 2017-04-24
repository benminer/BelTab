/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/projects              ->  index
 * POST    /api/projects              ->  create
 * GET     /api/projects/:id          ->  show
 * PUT     /api/projects/:id          ->  upsert
 * PATCH   /api/projects/:id          ->  patch
 * DELETE  /api/projects/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Project from './project.model';
import Sprint from '../sprint/sprint.model';
import Story from '../stories/stories.model';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Projects
export function index(req, res) {
  return Project.find(req.query).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Project from the DB
export function show(req, res) {
  return Project.findById(req.params.id)
    .populate({
      path: 'sprints',
      populate: { path: 'stories' }
    })
    .populate('stories')
    .exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Project in the DB
export function create(req, res) {
  return Project.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
export function createSprint(req, res) {
  let body = req.query;
  body.project = req.params.id;

  console.log(body);
  return Promise.all([
    Sprint.create(body),
    Project.findById(req.params.id),
  ])
    .then(results => {
      let [sprint, project] = results;
      return project.addSprint(sprint);
      // todo populate sprints
    })
    .then(results => {
      return results[0].populate("sprints").execPopulate();
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
//CREATE STORY
export function createStory(req, res) {
  let body = req.query;
  body.project = req.params.id;

  console.log(body);
  return Promise.all([
    Story.create(body),
    Project.findById(req.params.id),
  ])
    .then(results => {
      let [story, project] = results;
      return project.addUserStory(story);
      // todo populate stories
    })
    .then(results => {
      return results[0].populate("stories").execPopulate();
    })
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Project in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Project.findOneAndUpdate({
      _id: req.params.id
    },
    req.body,
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    })
    .exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Project in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Project.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Project from the DB
export function destroy(req, res) {
  return Project.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
