'use strict';

describe('Component: story', function() {
  // load the component's module
  beforeEach(module('story'));

  var storyComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function($componentController) {
    storyComponent = $componentController('story', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
