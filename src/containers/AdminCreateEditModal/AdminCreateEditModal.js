import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { MEASUREMENTS_PROPERTIES_ORDERING } from '../../constants';
import measurementActions from '../../store/measurements/actions';

const DEFAULT_FORM_VALUES = {};

MEASUREMENTS_PROPERTIES_ORDERING.map(m => {
  DEFAULT_FORM_VALUES[m] = "";
});

import {
} from './AdminCreateEditModal.styles';

export class AdminCreateEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillMount(){
    console.log('mounting');
  }

  componentWillReceiveProps(nextProps){
    const {
      data,
    } = this.props;

    const formData = nextProps.selectedId ? (
      data.filter(m => { return m._id === nextProps.selectedId })[0]
    ): (
      DEFAULT_FORM_VALUES
    );

    this.setState({
      ...formData
    });
  }

  setFormValues = (data) => {
    this.setState({...data});
  };

  handleModalClose = () => {
    const {
      closeModal,
    } = this.props;

    this.setFormValues();
    closeModal();
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleCreate = () => {
    const {
      closeModal,
      createMeasurement,
    } = this.props;

    // closeModal could be refactored into the redux store so that on CREATE_MEASUREMENT_SUCCESS this modal could
    // close or on CREATE_MEASUREMENT_FAILURE an error could be displayed here.
    //
    // Additionally, there should be some
    // sort of form validation here to make sure the inputs match the db model.

    const formData = {};
    MEASUREMENTS_PROPERTIES_ORDERING.map(m => {
      formData[m] = this.state[m];
    });
    createMeasurement(formData);

    this.setFormValues();
    closeModal();
  };

  handleEdit = () => {
    console.log('edit');
  };

  render() {
    const {
      isModalOpen,
      isEditMode,
      selectedId,
    } = this.props;
    console.log('createeditmodal state', this.state);
    console.log(`modal selectedId ${selectedId} isEditMode ${isEditMode}`);
    const formInputs = MEASUREMENTS_PROPERTIES_ORDERING.map(m =>{
      return (
        <FormControl
          fullWidth
          key={ m }
        >
          <InputLabel htmlFor={ m }>{ m.toUpperCase() }</InputLabel>
          <Input
            id={ m }
            value={ this.state[m] }
            onChange={ this.handleChange }
          />
        </FormControl>
      )
    });

    return (
      <Dialog
        open={ isModalOpen }
        onClose={ this.handleModalClose }
        aria-labelledby="createEditModal"
      >
        <DialogTitle id="createEditModal">{ isEditMode ? "Edit this Entry" : "Create a new Entry" }</DialogTitle>
        <DialogContent>
          <DialogContentText>
            (Note: These inputs are not validated.
            Please check they match the desired format, i.e. year: 2018, month: 1, kwh 2.5, bill 100.00, savings: 25.00)
          </DialogContentText>
          { formInputs }
        </DialogContent>
        <DialogActions>
          <Button
            onClick={ this.setFormValues }
            color="primary"
          >
            Clear
          </Button>
          <Button
            onClick={ this.handleModalClose }
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={ isEditMode ? this.handleEdit : this.handleCreate }
            color="primary"
            variant="raised"
          >
            { isEditMode ? "Update" : "Create" }
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

AdminCreateEditModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  selectedId: PropTypes.string.isRequired,
};

export default connect((state, props) => ({
  data: state.measurements.all,
}), {
  createMeasurement: measurementActions.createMeasurement,
})(AdminCreateEditModal);