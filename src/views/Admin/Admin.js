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

import { MEASUREMENTS_COLUMNS_ORDER } from '../../constants';

import AdminRow from '../../containers/AdminRow';

import {
  AdminCard
} from "./Admin.styles";

export class Admin extends Component {
  handleCreate = () => {
    console.log('create');
  }

  render(){

    const headerCells = MEASUREMENTS_COLUMNS_ORDER.map(m => {
      return <TableCell key={ m }>{ m.toUpperCase() }</TableCell>
    });
    headerCells.push(<TableCell key="edit">EDIT</TableCell>);
    headerCells.push(<TableCell key="delete">DELETE</TableCell>);

    return (
      <AdminCard>
        <CardHeader
           title="Admin"
        />
        <CardContent>
          <Button onClick={ this.handleCreate } variant="raised" color="primary">Create</Button>

          <Table>
            <TableHead>
              <TableRow>
                { headerCells }
              </TableRow>
            </TableHead>
            <TableBody>
              <AdminRow id={ 0 }/>
              <AdminRow id={ 1 }/>
            </TableBody>
          </Table>

        </CardContent>
      </AdminCard>
    )

  }
}

export default connect((state) => ({

}), {

})(Admin);
