import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import measurementActions from '../../store/measurements/actions';

import {
  HomeCard
} from "./Home.styles";

export class Home extends Component {
  render(){

    const {
      getMeasurements,
    } = this.props;
    getMeasurements();

    return (
      <HomeCard>
        <CardHeader
           title="Welcome"
        />
        <CardContent>
          Hello.
        </CardContent>
      </HomeCard>
    )

  }
}

export default connect((state) => ({

}), {
  getMeasurements: measurementActions.getMeasurements,
})(Home);
