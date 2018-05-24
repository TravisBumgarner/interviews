import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class Question extends Component {
  render() {
    const {
      questionContent
    } = this.props;
    return (
      <p>{questionContent.text}</p>
    );
  }
}

export default connect((state) => ({
  questionContent: state.questions.all[state.questions.selectedId]
}), {
})(Question);