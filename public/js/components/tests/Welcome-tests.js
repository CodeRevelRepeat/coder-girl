jest.dontMock('../Welcome.js');
jest.dontMock('object-assign');
jest.dontMock('./utils/ReactRouterContext');

describe('Welcome', function() {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Welcome = require('../Welcome');
  var ReactRouterContext = require('./utils/ReactRouterContext');
  var welcome;

  Welcome = ReactRouterContext(Welcome);

  beforeEach(function() {
    welcome = TestUtils.renderIntoDocument( <Welcome /> );
    welcome.setState ({
      user: {username: "Ann", level: 5, score: 100}
    })

    // welcome = TestUtils.renderIntoDocument( <Welcome /> );
  });


  it('should greet current user', function() {

    var userSpan = TestUtils.findRenderedDOMComponentWithClass(welcome, "welcome-username");
    // userSpan.getDOMNode().value = "Ann"
    // TestUtils.Simulate.change(userSpan, {target: {value: 'Ann'}});
    expect(userSpan.getDOMNode().textContent).toEqual("Ann");
  });

  // it('should show current user\'s level', function() {

  //   var levelSpan = TestUtils.findRenderedDOMComponentWithClass(welcome, "welcome-user-level");

  //   expect(welcome.state.user.level).toEqual(levelSpan.textContent);
  // });

  // it('should show current user\'s score', function() {

  //   var scoreSpan = TestUtils.findRenderedDOMComponentWithClass(welcome, "welcome-user-score");

  //   expect(welcome.state.user.score).toEqual(scoreSpan.textContent);
  // });


});


