import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';

import QuestionAdminRow from '../../containers/QuestionAdminRow';

import {
  QuestionsAdminCard
} from "./QuestionsAdmin.styles";

export class QuestionsAdmin extends Component {
  handleCreate = () => {
    const {
      history: { push }
    } = this.props;

    push('/create')
  };

  render() {
    const {
      allQuestions,
    } = this.props;

    const questionRows = Object.keys(allQuestions).map(a =>{
      return <QuestionAdminRow content={ allQuestions[a] }/>
    });

    return (
      <QuestionsAdminCard>
        <CardHeader
           title="Add/Edit Questions"
        />
        <CardContent>
          <Button
          variant="raised"
          color="primary"
          onClick={ this.handleCreate }
          >
            Create new question
          </Button>
          <Table>
            <TableBody>
                { questionRows }
            </TableBody>
          </Table>
        </CardContent>
      </QuestionsAdminCard>

    )
  }
}

export default connect((state) => ({
  allQuestions: state.questions.all,
}), {

})(QuestionsAdmin);
