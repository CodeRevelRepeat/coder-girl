jest.dontMock('../Congrats.js');
jest.dontMock('object-assign');
jest.dontMock('./utils/ReactRouterContext');

describe('Congrats', function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Congrats = require('../Congrats');
  var ReactRouterContext = require('./utils/ReactRouterContext');
  var AuthStore = require('../../stores/AuthStore');
  var congrats;

  Congrats = ReactRouterContext(Congrats);

  beforeEach(function() {
    congrats = TestUtils.renderIntoDocument( <Congrats /> );
  });


  it('should dispaly current user\s level minus one', function() {
    var currentUser = AuthStore.getUser();
    console.log("currentUser", currentUser);

    var levelSpan = TestUtils.findRenderedDOMComponentWithClass(congrats, "congrats-level");

    console.log("levelSpan", levelSpan.textContent)
    expect(currentUser.level).toEqual(levelSpan.textContent);
  });


});