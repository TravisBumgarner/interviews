import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CircularProgress from '@material-ui/core/CircularProgress';

import Question from '../../containers/Question';

import {
  QuestionsAdminCard
} from "./QuestionsAdmin.styles";

export class QuestionsAdmin extends Component {
  render() {
    const {
    } = this.props;

    return (
      <QuestionsAdminCard> Questions!</QuestionsAdminCard>
    )
  }
}

export default connect((state) => ({
}), {

})(QuestionsAdmin);
