import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';
import Login from './Login';
import Navigation from './Navigation';
import Homepage from './Homepage';
import UserContent from './UserContent';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import NotFound from './NotFound';
import LoadingBar from 'react-redux-loading'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <LoadingBar />
        <div className="App">
          {authedUser === null ? (
            <Route
              render={() => (
                
                  <Login />
                  
              )}
            />
          ) : (
            <Fragment>
              <Navigation />
                <Switch>
                  <Route exact path="/" component={Homepage} />
                  <Route path="/questions/bad_id" component={NotFound} />
                  <Route path="/questions/:question_id" component={UserContent} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route component={NotFound} />
                </Switch>
            </Fragment>
          )}
        </div>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps,{ handleInitialData })(App);