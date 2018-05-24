import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';

import questionActions from '../../store/questions/actions';
import { OPERATIONS } from '../../../constants';

export class FilterQuestionsForm extends Component {

  constructor(props) {
    super(props);

    const operationTypes = {}

    Object.keys(OPERATIONS).map(o => {
      const value = OPERATIONS[o].computer;
      operationTypes[value] = true;
    });

    this.state = {
      useNegativeValues: '0',
      operationTypes,
    };
  }

  handleNegativeValues = event => {
    this.setState({ useNegativeValues: event.target.value });
  };

  handleOperationTypes = name => event => {
    const {
      operationTypes
    } = this.state;

    const newOperatonTypes = {
      ...operationTypes,
      [name]: event.target.checked
    };

    this.setState({ operationTypes: newOperatonTypes});
  };

  handleSubmit = () => {
    const {
      operationTypes,
      useNegativeValues,
    } = this.state;

    const {
      getQuestions,
      history: { push }
    } = this.props;
    getQuestions('HI!');
    console.log(this.state);
    push('/question');

  };

  render() {
    const {
    } = this.props;

    const Checkboxes = Object.keys(OPERATIONS).map(o => {
      return (
        <FormControlLabel
          key={OPERATIONS[o].computer}
          control={
            <Checkbox
              checked={this.state.operationTypes[OPERATIONS[o].computer]}
              onChange={this.handleOperationTypes(OPERATIONS[o].computer)}
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
              value={this.state.useNegativeValues}
              onChange={this.handleNegativeValues}
            >
              <FormControlLabel value="1" control={<Radio />} label="Yes" />
              <FormControlLabel value="0" control={<Radio />} label="No" />
            </RadioGroup>
        </FormControl>

        <Divider />

        <FormControl component="fieldset">
          <FormLabel component="legend">Select operation types:</FormLabel>
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

export default withRouter(connect((state) => ({
}), {
  getQuestions: questionActions.getQuestions,
})(FilterQuestionsForm));