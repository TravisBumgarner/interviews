import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { shuffle } from "../../utils/index";


export class QuestionAdminRow extends Component {
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
})(QuestionAdminRow);