
jest.dontMock('../constants/AppConstants');
jest.dontMock('../stores/ChallengeStore');
jest.dontMock('object-assign');

describe('ChallengeStore', function() {

  var AppConstants = require('../constants/AppConstants');
  var AppDispatcher;
  var ChallengeStore;
  var callback;


  // mock actions
  var actionSetChallenge = {
    actionType: AppConstants.SET_CHALLENGE,
    text: '????'
  };
  var actionPassChallenge = {
    actionType: AppConstants.PASS_CHALLENGE,
    id: '????'
  };

  var actionFailChallenge = {
    actionType: AppConstants.FAIL_CHALLENGE,
    id: '????'
  }

  beforeEach(function() {
    AppDispatcher = require('../dispatcher/AppDispatcher');
    ChallengeStore = require('../stores/ChallengeStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with one challenge????', function() {
    var all = ChallengeStore.getChallenge();
    expect(all).toEqual({});
  });



});