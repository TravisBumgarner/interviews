import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import Home from '../Home';
import NotFound from '../NotFound';

import {
  AppWrapper,
} from "./App.styles";

export class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </AppWrapper>
    )
  }
}

export default connect((state) => ({
}), {
})(App);
