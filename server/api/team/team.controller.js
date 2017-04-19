/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/teams              ->  index
 * POST    /api/teams              ->  create
 * GET     /api/teams/:id          ->  show
 * PUT     /api/teams/:id          ->  upsert
 * PATCH   /api/teams/:id          ->  patch
 * DELETE  /api/teams/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Team from './team.model';
import User from '../user/user.model';
import Project from '../project/project.model';

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
    console.log('error')
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Teams
export function index(req, res) {
  return Team.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Team from the DB
export function show(req, res) {
  return Team.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Team in the DB
export function create(req, res) {
  return Team.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

export function createProject(req, res) {
  console.log(req.body);
  return Promise.all([
    Team.findById(req.params.id),
    Project.create(req.body),
  ])
    .then(results => {
      console.log(results);
      let [team, proj] = results;
      return team.addProject(proj);
    })
    .then(results => {
      let [team, project] = results;
      return res.json({team, project})
    })
    .catch(handleError(res));
}

// Upserts the given Team in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Team.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function addUser(req, res) {
  console.log(req.params)
  console.log(req.body)

  return Promise.all([
    Team.findById(req.params.id).exec(),
    User.findById(req.body.userId).exec(),
  ])
  .then(results => {
    let [team, user] = results;
    console.log(results)

    if(!team || !user) {
      return res.status(404).end();
    }

    return team.addMember(user)
      .then(results => {
        let [team, member] = results;
        return res.json({team, member})
      });
  })
    .catch(handleError(res));
}

// Updates an existing Team in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Team.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Team from the DB
export function destroy(req, res) {
  return Team.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
