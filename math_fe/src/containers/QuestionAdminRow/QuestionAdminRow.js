import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import questionActions from '../../store/questions/actions';

export class QuestionAdminRow extends Component {
  handleDelete = () => {
    const {
      content: { id },
      deleteQuestion,
    } = this.props;

    deleteQuestion({ id })
  };

  render() {
    const {
      content,
    } = this.props;

    return (
      <TableRow>
        <TableCell>{ content.text }</TableCell>
        <TableCell>
          <Button
          variant="raised"
          color="primary"
          onClick={ () => {alert('Coming soon!')} }
          >
            Edit
          </Button>
        </TableCell>
        <TableCell>
          <Button
          variant="raised"
          color="primary"
          onClick={ this.handleDelete }
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    );
  }
}

export default connect((state) => ({
}), {
  deleteQuestion: questionActions.deleteQuestion,
})(QuestionAdminRow);