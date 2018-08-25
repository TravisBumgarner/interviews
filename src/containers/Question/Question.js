import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import { shuffle } from "../../utils/index";

import {
  QuestionWrapper,
  AnswersWrapper,
} from './Question.styles';

export class Question extends Component {
  handleCorrect = () => {
    alert('woo!');
  };

  handleIncorrect = () => {
    alert('try again :(');
  };

 render() {
    const {
      questionContent: {
        text,
        answers,
      }
    } = this.props;

    const shuffledAnswers = shuffle(answers); // Otherwise correct answer would always be first.

    const Answers = shuffledAnswers.map(a => {
      return (
        <Button
          key={ a.text }
          variant="raised"
          color="primary"
          onClick={ a.is_correct_answer ? this.handleCorrect : this.handleIncorrect }
        >
          { a.text }
        </Button>
      )
    });

    return (
      <QuestionWrapper>
        <p>{text}</p>
        <AnswersWrapper>
          { Answers }
        </AnswersWrapper>

        <Button
          variant="raised"
          color="primary"
          onClick={ () => {(alert("Coming soon!"))} }
        >
          Next question >>
        </Button>
      </QuestionWrapper>
    );
  }
}

export default connect((state) => ({
  questionContent: state.questions.all[state.questions.selectedId]
}), {
})(Question);