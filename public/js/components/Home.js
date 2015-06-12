var React = require('react');
var Leaderboard = require('./Leaderboard');
var ChallengeEditor = require('./ChallengeEditor');
var ChallengeInstructions = require('./ChallengeInstructions');
var Chat = require('./Chat');
var AuthActions = require('../actions/AuthActions');

var AuthStore = require('../stores/AuthStore');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Home = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  displayName: 'Home',
  mixins: [Router.State, Router.Navigation],

  getInitialState: function() {

    AuthActions.isAuth(window.localStorage.getItem('io.codergirl'));

    return {
      user: AuthStore.getUser()
    };
  },


  componentDidMount: function() {
    AuthStore.addChangeListener(this._onChange);

  },

  // componentWillMount: function(){
  //     if (!this.state.user){
  //       this.transitionTo('/login');
  //     }
  // },

  // shouldComponentUpdate: function(){
  //   if(!this.state.user.isAuth){
  //     return false;
  //   }
  // },

  _onChange: function() {
    // console.log("AuthStore:", AuthStore.getUser());
    if(this.isMounted()){
        this.setState ({
          user: AuthStore.getUser()
        });
      }

      if (!this.state.user){
        this.transitionTo('/login');
      }
      if(!this.state.user.isAuth){
        this.transitionTo('/login');
      }
    
  },

  render: function() {

    var home;

    if(this.state.user && this.state.user.isAuth){
      home = <div className="grid-block">
          <div className="medium-9 vertical grid-block">
            <RouteHandler/>
            <Chat/>
          </div>
          <div className="medium-3 grid-block">
            <Leaderboard/>
          </div>
          <div className="grid-block">
          </div>
        </div>

    } else {
      home = <div></div>
    }

    return home;

    // if(this.state.user && this.state.user.isAuth){
    //   return (
    //     <div className="grid-block">
    //       <div className="medium-9 vertical grid-block">
    //         <RouteHandler/>
    //         <Chat/>
    //       </div>
    //       <div className="medium-3 grid-block">
    //         <Leaderboard/>
    //       </div>
    //       <div className="grid-block">
    //       </div>
    //     </div>
    //   );
    // } else {
    //   this.transitionTo('login');
    //   // return Login;
    //     );
    // }



  }
});

module.exports = Home;


