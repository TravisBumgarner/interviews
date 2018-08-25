import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CreateEditQuestion from '../../containers/CreateEditQuestion';

import {
  CreateQuestionCard
} from "./CreateQuestion.styles";

export class CreateQuestion extends Component {

  render() {
    return (
      <CreateQuestionCard>
        <CardHeader
           title="Create a Question"
        />
        <CardContent>
          <CreateEditQuestion />
        </CardContent>
      </CreateQuestionCard>

    )
  }
}

export default connect((state) => ({
  allQuestions: state.questions.all,
}), {

})(CreateQuestion);
