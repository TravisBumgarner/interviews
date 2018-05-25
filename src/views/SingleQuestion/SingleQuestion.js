import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

import Question from '../../containers/Question';

import {
  SingleQuestionCard
} from "./SingleQuestion.styles";

export class SingleQuestion extends Component {
  render() {
    const {
      isLoading,
      doQuestionsExist,
    } = this.props;

    console.log('WHY', isLoading, doQuestionsExist);

    return (
      isLoading ? (
        <CircularProgress />
      ) : (
        doQuestionsExist ? (
          <SingleQuestionCard>
            <CardHeader
               title='Math!'
            />
            <CardContent>
              <Question />
            </CardContent>
          </SingleQuestionCard>
        ) : (
          <p>Please return to the homepage and select a question set.</p>
        )
      )
    )
  }
}

export default connect((state) => ({
  isLoading: state.questions.meta.isLoading,
  doQuestionsExist: state.questions.meta.doQuestionsExist,
}), {

})(SingleQuestion);
