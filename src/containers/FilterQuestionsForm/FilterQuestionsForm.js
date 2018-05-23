import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';


import { OPERATIONS } from '../../../constants';

export class FilterQuestionsForm extends Component {

  constructor(props) {
    super(props);

    const operationTypes = {}

    Object.keys(OPERATIONS).map(o => {
      const value = OPERATIONS[o].computer;
      operationTypes[value] = false;
    });

    this.state = {
      age: '',
      negativeValues: 'no',
      ...operationTypes,
    };
  }

  handleNegativeValues = event => {
    this.setState({ negativeValues: event.target.value });
  };

  handleProblemTypes = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleSubmit = () => {
    // TODO Write this next

  };

  render() {
    const {
    } = this.state;

    const Checkboxes = Object.keys(OPERATIONS).map(o => {
      return (
        <FormControlLabel
          key={OPERATIONS[o].computer}
          control={
            <Checkbox
              checked={this.state[OPERATIONS[o].computer]}
              onChange={this.handleProblemTypes(OPERATIONS[o].computer)}
              value={OPERATIONS[o].computer}
            />
          }
          label={OPERATIONS[o].human}
        />
      )
    });

    return (
      <Fragment>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">Include questions with negative values?</FormLabel>
            <RadioGroup
              aria-label="negativeValues"
              name="negativeValues"
              value={this.state.negativeValues}
              onChange={this.handleNegativeValues}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
        </FormControl>

        <Divider />

        <FormControl component="fieldset">
          <FormLabel component="legend">Problem Types:</FormLabel>
          <FormGroup>
            { Checkboxes }
          </FormGroup>
        </FormControl>

        <Divider />

        <Button
          fullWidth
          variant="raised"
          color="primary"
          onClick={ this.handleSubmit }
        >
          Get Started!
        </Button>
      </Fragment>
    );
  }
}

export default connect((state) => ({
}), {
})(FilterQuestionsForm);