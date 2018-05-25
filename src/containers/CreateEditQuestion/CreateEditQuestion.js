import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import questionActions from '../../store/questions/actions';
import { OPERATIONS } from '../../../constants';

import {
  CreateEditQuestionWrapper,
  QuestionPartTextField,
} from './CreateEditQuestion.styles';

const NUMBER_OF_INCORRECT_ANSWERS = 4;

export class CreateEditQuestion extends Component {

  constructor(props) {
    super(props);

    const incorrectAnswers = {};
    for (let i=1; i < NUMBER_OF_INCORRECT_ANSWERS + 1; i++){
      incorrectAnswers[`incorrectAnswer${i}`] = ""
    }

    this.state = {
      ...incorrectAnswers,
      value1: "",
      value2: "",
      operator: "",
      correctAnswer: "",
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleCreate = () => {
    // The form could be written better or some validation could be useful here.

    const {
      value1,
      value2,
      operator,
      correctAnswer,
    } = this.state;

    const {
      createQuestion,
    } = this.props;

    let incorrectAnswers = [];
    for (let i=1; i < NUMBER_OF_INCORRECT_ANSWERS + 1; i++){
      incorrectAnswers.push(this.state[`incorrectAnswer${i}`]);
    }
    incorrectAnswers = incorrectAnswers.join(',');
    const question = `What is ${value1} ${operator} ${value2}`;

    const questionData = {
      question,
      incorrectAnswers,
      correctAnswer
    };

    createQuestion(questionData);
  };

  render() {

    const incorrectAnswerInputFields = [];
    for (let i=1; i < NUMBER_OF_INCORRECT_ANSWERS + 1; i++){
      const inputField = (
        <TextField
          fullWidth
          key={`incorrectAnswer${i}`}
          id={`incorrectAnswer${i}`}
          label={`Incorrect Answer ${i}`}
          value={this.state[`incorrectAnswer${i}`]}
          onChange={this.handleChange(`incorrectAnswer${i}`)}
          margin="normal"
        />
      );
      incorrectAnswerInputFields.push(inputField);
    }

    return (
      <CreateEditQuestionWrapper>
        What is

        <QuestionPartTextField
          id={`value1`}
          label={`Value 1`}
          value={this.state.value1}
          onChange={this.handleChange(`value1`)}
          margin="normal"
        />

        <QuestionPartTextField
          id={`operator`}
          label={`* + / -`}
          value={this.state.operator}
          onChange={this.handleChange(`operator`)}
          margin="normal"
        />

        <QuestionPartTextField
          id={`value2`}
          label={`Value 2`}
          value={this.state.value2}
          onChange={this.handleChange(`value2`)}
          margin="normal"
        />
        ?
        <TextField
          fullWidth
          key="correctAnswer"
          id="correctAnswer"
          label="Correct Answer"
          value={this.state["correctAnswer"]}
          onChange={this.handleChange("correctAnswer")}
          margin="normal"
        />

        { incorrectAnswerInputFields }

        <Divider />

        <Button
          fullWidth
          variant="raised"
          color="primary"
          onClick={ this.handleCreate }
        >
          Create
        </Button>
      </CreateEditQuestionWrapper>
    );
  }
}

export default withRouter(connect((state) => ({
}), {
  createQuestion: questionActions.createQuestion,
})(CreateEditQuestion));