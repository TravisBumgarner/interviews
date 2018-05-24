import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import CreateEditQuestion from '../../containers/CreateEditQuestion';

import {
  CreateQuestionCard
} from "./CreateQuestion.styles";

export class CreateQuestion extends Component {
  handleCreate = () => {

  };

  render() {
    const {
      allQuestions,
    } = this.props;

    const questionRows = Object.keys(allQuestions).map(a =>{
      return <QuestionAdminRow content={ allQuestions[a] }/>
    });

    return (
      <CreateQuestionCard>
        <CardHeader
           title="Edit Questions"
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
