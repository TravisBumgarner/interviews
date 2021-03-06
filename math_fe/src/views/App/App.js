import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

import Home from '../Home';
import QuestionsAdmin from '../QuestionsAdmin';
import SingleQuestion from '../SingleQuestion';
import NotFound from '../NotFound';
import CreateQuestion from '../CreateQuestion';

import Nav from '../../containers/Nav';

import {
  AppWrapper,
} from "./App.styles";

export class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Nav/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/question" component={SingleQuestion} />
          <Route path="/create" component={CreateQuestion} />
          <Route path="/admin" component={QuestionsAdmin} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    )
  }
}

export default withRouter(connect((state) => ({
}), {
})(App));
