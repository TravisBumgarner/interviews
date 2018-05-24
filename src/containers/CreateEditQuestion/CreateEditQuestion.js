import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import questionActions from '../../store/questions/actions';
import { OPERATIONS } from '../../../constants';

const NUMBER_OF_ANSWERS = 5;

export class CreateEditQuestion extends Component {

  constructor(props) {
    super(props);

    const answerKeys = {};
    for (let i=1; i < NUMBER_OF_ANSWERS + 1; i++){
      answerKeys[`answer${i}`] = ""
    }

    this.state = {
      ...answerKeys,
      question: "",
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCreate = () => {
  };

  render() {

    const answerInputFields = [];
    for (let i=1; i < NUMBER_OF_ANSWERS + 1; i++){
      const inputField = (
        <TextField
          fullWidth
          key={`answer${i}`}
          id={`answer${i}`}
          label={`answer${i}`}
          value={this.state[`answer${i}`]}
          onChange={this.handleChange(`answer${i}`)}
          margin="normal"
        />
      );
      answerInputFields.push(inputField);
    }

    return (
      <Fragment>

        <TextField
          fullWidth
          id={`question`}
          label={`question`}
          value={this.state.question}
          onChange={this.handleChange(`question`)}
          margin="normal"
        />

        { answerInputFields }

        <Divider />

        <Button
          fullWidth
          variant="raised"
          color="primary"
          onClick={ this.handleCreate }
        >
          Create
        </Button>
      </Fragment>
    );
  }
}

export default withRouter(connect((state) => ({
}), {
  getQuestions: questionActions.getQuestions,
})(CreateEditQuestion));