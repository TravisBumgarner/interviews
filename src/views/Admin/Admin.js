import React, { Component } from 'react';
import { connect } from 'react-redux';

import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { MEASUREMENTS_PROPERTIES_ORDERING } from '../../constants';

import AdminRow from '../../containers/AdminRow';
import AdminCreateEditForm from '../../containers/AdminCreateEditForm';

import {
  AdminCard
} from "./Admin.styles";

export class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };
  }

  toggleDialogOpen = () => {
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
    })
  };

  submitForm = () => {
    // Form validation would be a great addition here. Perhaps date pickers, etc. as well.
  }

  render(){
    const {
      measurements,
    } = this.props;

    console.log(measurements);
    console.log(Array.isArray(measurements));

    const headerCells = MEASUREMENTS_PROPERTIES_ORDERING.map(m => {
      return <TableCell key={ m }>{ m.toUpperCase() }</TableCell>
    });
    headerCells.push(<TableCell key="edit">EDIT</TableCell>);
    headerCells.push(<TableCell key="delete">DELETE</TableCell>);

    const rows = measurements.map(m => {
      return <AdminRow key = { m._id } data={ m } />
    });

    return (
      <AdminCard>
        <CardHeader
           title="Admin"
        />
        <CardContent>


          <Button onClick={ this.toggleDialogOpen } variant="raised" color="primary">Create</Button>

          <Table>
            <TableHead>
              <TableRow>
                { headerCells }
              </TableRow>
            </TableHead>
            <TableBody>
              { rows }
            </TableBody>
          </Table>

          <Dialog
            open={this.state.isDialogOpen}
            onClose={this.handleDialogClose}
            aria-labelledby="createEditForm"
          >
            <DialogTitle id="createEditForm">Create a new Entry</DialogTitle>
            <DialogContent>
              <AdminCreateEditForm />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.toggleDialogOpen} color="primary">
                Cancel
              </Button>
              <Button onClick={this.toggleDialogOpen} color="primary">
                Subscribe
              </Button>
            </DialogActions>
          </Dialog>

        </CardContent>
      </AdminCard>
    )

  }
}

export default connect((state) => ({
  measurements: state.measurements.all,
}), {

})(Admin);




