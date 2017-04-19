'use strict';

describe('Service: sprint', function() {
  // load the service's module
  beforeEach(module('jsScrumBoardApp.sprint'));

  // instantiate service
  var sprint;
  beforeEach(inject(function(_sprint_) {
    sprint = _sprint_;
  }));

  it('should do something', function() {
    expect(!!sprint).to.be.true;
  });
});
