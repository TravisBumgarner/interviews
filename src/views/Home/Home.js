import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  HomeWrapper,
} from './Home.styles'

export class Home extends Component {
  calculatePath = () => {
    return 5;
  }

  render() {
    this.calculatePath();
    return (
      <HomeWrapper>
        Hi.
      </HomeWrapper>
    )

  }
}

export default connect((state) => ({

}), {

})(Home);
