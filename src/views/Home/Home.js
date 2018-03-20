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
      // Phase 1
      symptoms: {},
      selectedSymptom: NO_SYMPTOM_SELECTED,
      // Phase 2
      diagnoses: {},
      selectedDiagnosis: {},
      diagnosesSeenSum: 0,
      areDiagnosesLoaded: false,
      isFirstDiagnosisGuess: true,
    }
  }

  componentDidMount(){
    this.getSymptoms();
  }

  getDiagnoses = (event, index, value) => {
    apiRequest('GET', `symptoms/${value}`).then(r => {
      const {
        data: {
          diagnoses,
          times_encountered_sum,
        }
      } = r;

      const selectedDiagnosis = Object.keys(diagnoses).reduce((a, b) => {
        return diagnoses[a].times_encountered > diagnoses[b].times_encountered ? diagnoses[a] : diagnoses[b];
      });

      console.log(selectedDiagnosis);

      this.setState({
          diagnoses,
          selectedDiagnosis,
          areDiagnosesLoaded: true,
          diagnosesSeenSum: times_encountered_sum,
        })
      }).catch(e => {
        alert('There was an error with your request, please try again later');
    });
  };

  getSymptoms = () => {
    apiRequest('GET', 'symptoms').then(r => {
      console.log('symptoms', r.data);
      this.setState({
        symptoms: r.data,
      })
    }).catch(e => {
      alert('There was an error with your request, please try again later');
    });
  };

  render() {
    const {
      symptoms,
      selectedSymptom,
      selectedDiagnosis,
      areDiagnosesLoaded,
      isFirstDiagnosisGuess,
    } = this.state;

    const symptomsList = Object.values(symptoms).map(s => {
      return <MenuItem value={s.id} key={s.id} primaryText={s.name}/>
    });

    const isSymptomSelected = selectedSymptom !== NO_SYMPTOM_SELECTED;

    return (
      <HomeWrapper>
        {/* Phase 1 */}
        <h2>What are you experiencing today?</h2>
        <DropDownMenu
          value={this.state.selectedSymptom}
          onChange={this.getDiagnoses}
          disabled={ isSymptomSelected }>
          <MenuItem value={NO_SYMPTOM_SELECTED} key={NO_SYMPTOM_SELECTED} primaryText={'Select a Symptom'}/>
          {symptomsList}
        </DropDownMenu>

        {/* Phase 1 */}
        { areDiagnosesLoaded ? (
          isFirstDiagnosisGuess ? (
            <h2>{`Are you experiencing ${selectedDiagnosis.name} today?`}</h2>
          ) : (
            <h2>What about one of these?</h2>
          )
        ) : (
          <h2>Oops</h2>
        )

        }

      </HomeWrapper>
    )
  }
}
