import React, { Component } from 'react';

import { apiRequest } from '../../utils/index';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    apiRequest('GET', 'symptoms')
  }

  render() {

    return (
      <div>
        Hello.
      </div>
    )
  }
}
