import React, { Component } from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { apiRequest } from '../../utils/index';

import {
  HomeWrapper
} from "./Home.styles";

const NO_SYMPTOM_SELECTED = '0';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      symptoms: {},
      diagnoses: {},
      selectedSymptom: NO_SYMPTOM_SELECTED,
    }
  }

  componentDidMount(){
    this.getSymptoms();
  }

  handleSymptomSelect = (event, index, value) => {
  apiRequest('GET', 'diagnoses').then(r => {
        console.log('diagnosis', r.data);
        this.setState({
          diagnoses: r.data,
        })
      }).catch(e => {
        alert('There was an error with your request, please try again later');
        this.setState({
        })
    });

    this.setState({
      selectedSymptom: value,
    });

  };

  getSymptoms = () => {
    apiRequest('GET', 'symptoms').then(r => {
      console.log('symptoms', r.data);
      this.setState({
        loaded: false,
        symptoms: r.data,
      })
    }).catch(e => {
      alert('There was an error with your request, please try again later');
      this.setState({
        loaded: false,
      })
    });
  };

  render() {
    const {
      symptoms,
      selectedSymptom,
    } = this.state;

    const symptomsList = Object.values(symptoms).map(s => {
      return <MenuItem value={s.id} key={s.id} primaryText={s.name}/>
    });

    const isSymptomSelected = selectedSymptom !== NO_SYMPTOM_SELECTED;

    return (
      <HomeWrapper>

        <h2>What are you experiencing today?</h2>
        <DropDownMenu
          value={this.state.selectedSymptom}
          onChange={this.handleSymptomSelect}
          disabled={ isSymptomSelected }>
          <MenuItem value={NO_SYMPTOM_SELECTED} key={NO_SYMPTOM_SELECTED} primaryText={'Select a Symptom'}/>
          {symptomsList}
        </DropDownMenu>
      </HomeWrapper>
    )
  }
}
