'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var sprintCtrlStub = {
  index: 'sprintCtrl.index',
  show: 'sprintCtrl.show',
  create: 'sprintCtrl.create',
  upsert: 'sprintCtrl.upsert',
  patch: 'sprintCtrl.patch',
  destroy: 'sprintCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sprintIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './sprint.controller': sprintCtrlStub
});

describe('Sprint API Router:', function() {
  it('should return an express router instance', function() {
    expect(sprintIndex).to.equal(routerStub);
  });

  describe('GET /api/sprints', function() {
    it('should route to sprint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'sprintCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/sprints/:id', function() {
    it('should route to sprint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sprintCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/sprints', function() {
    it('should route to sprint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sprintCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/sprints/:id', function() {
    it('should route to sprint.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sprintCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/sprints/:id', function() {
    it('should route to sprint.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sprintCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/sprints/:id', function() {
    it('should route to sprint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sprintCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
