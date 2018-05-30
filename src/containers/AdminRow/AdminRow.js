import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { MEASUREMENTS_COLUMNS_ORDER } from '../../constants';
import measurementActions from '../../store/measurements/actions';

import {
} from './AdminRow.styles';

export class AdminRow extends Component {
  handleEdit = () => {
    console.log('edit');
  };

  handleDelete = () => {
    const {
      data: { _id },
      deleteMeasurement,
    } = this.props;
    const shouldDelete = confirm("Are you sure you want to delete this entry?");
    if(shouldDelete) deleteMeasurement(_id);
    console.log(`delete ${ _id }`);
  };

  render() {
    const {
      data,
    } = this.props;

    const cells = MEASUREMENTS_COLUMNS_ORDER.map(m => {
      return <TableCell key={ data[m] }>{ data[m] }</TableCell>
    });

    cells.push(
      <TableCell key="edit">
        <Button onClick={ this.handleEdit } variant="raised" color="primary">Edit</Button>
      </TableCell>
    );

    cells.push(
      <TableCell key="delete">
        <Button onClick={ this.handleDelete } variant="raised" color="secondary">Delete</Button>
      </TableCell>
    );
    return (
      <TableRow>
        { cells }
      </TableRow>
    )
  }
}

AdminRow.propTypes = {
  data: PropTypes.object.isRequired,
  deleteMeasurement: PropTypes.func.isRequired,
};

export default connect((state, props) => ({
}), {
  deleteMeasurement: measurementActions.deleteMeasurement,
})(AdminRow);