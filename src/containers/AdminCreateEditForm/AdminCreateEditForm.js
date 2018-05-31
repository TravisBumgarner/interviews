import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { MEASUREMENTS_PROPERTIES_ORDERING } from '../../constants';
import measurementActions from '../../store/measurements/actions';

import {
} from './AdminCreateEditForm.styles';

export class AdminCreateEditForm extends Component {
  constructor(props) {
    const measurementsKeyValues = {};

    MEASUREMENTS_PROPERTIES_ORDERING.map(m => {
      measurementsKeyValues[m] = "";
    });

    super(props);
    this.state = {
      ...measurementsKeyValues,
    };
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const {
    } = this.props;



    const formInputs = MEASUREMENTS_PROPERTIES_ORDERING.map(m =>{
      return (
        <FormControl fullWidth>
          <InputLabel htmlFor={ m }>{ m.toUpperCase() }</InputLabel>
          <Input id={ m } value={this.state[m]} onChange={this.handleChange} />
        </FormControl>
      )
    });

    return (
      <div>{ formInputs }</div>
    )
  }
}

AdminCreateEditForm.propTypes = {
};

export default connect((state, props) => ({
}), {
  deleteMeasurement: measurementActions.deleteMeasurement,
})(AdminCreateEditForm);