'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newSprint;

describe('Sprint API:', function() {
  describe('GET /api/sprints', function() {
    var sprints;

    beforeEach(function(done) {
      request(app)
        .get('/api/sprints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sprints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sprints).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/sprints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/sprints')
        .send({
          name: 'New Sprint',
          info: 'This is the brand new sprint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newSprint = res.body;
          done();
        });
    });

    it('should respond with the newly created sprint', function() {
      expect(newSprint.name).to.equal('New Sprint');
      expect(newSprint.info).to.equal('This is the brand new sprint!!!');
    });
  });

  describe('GET /api/sprints/:id', function() {
    var sprint;

    beforeEach(function(done) {
      request(app)
        .get(`/api/sprints/${newSprint._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          sprint = res.body;
          done();
        });
    });

    afterEach(function() {
      sprint = {};
    });

    it('should respond with the requested sprint', function() {
      expect(sprint.name).to.equal('New Sprint');
      expect(sprint.info).to.equal('This is the brand new sprint!!!');
    });
  });

  describe('PUT /api/sprints/:id', function() {
    var updatedSprint;

    beforeEach(function(done) {
      request(app)
        .put(`/api/sprints/${newSprint._id}`)
        .send({
          name: 'Updated Sprint',
          info: 'This is the updated sprint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedSprint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSprint = {};
    });

    it('should respond with the updated sprint', function() {
      expect(updatedSprint.name).to.equal('Updated Sprint');
      expect(updatedSprint.info).to.equal('This is the updated sprint!!!');
    });

    it('should respond with the updated sprint on a subsequent GET', function(done) {
      request(app)
        .get(`/api/sprints/${newSprint._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let sprint = res.body;

          expect(sprint.name).to.equal('Updated Sprint');
          expect(sprint.info).to.equal('This is the updated sprint!!!');

          done();
        });
    });
  });

  describe('PATCH /api/sprints/:id', function() {
    var patchedSprint;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/sprints/${newSprint._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Sprint' },
          { op: 'replace', path: '/info', value: 'This is the patched sprint!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedSprint = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedSprint = {};
    });

    it('should respond with the patched sprint', function() {
      expect(patchedSprint.name).to.equal('Patched Sprint');
      expect(patchedSprint.info).to.equal('This is the patched sprint!!!');
    });
  });

  describe('DELETE /api/sprints/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/sprints/${newSprint._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sprint does not exist', function(done) {
      request(app)
        .delete(`/api/sprints/${newSprint._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
