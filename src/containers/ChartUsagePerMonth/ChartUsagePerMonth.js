import React, { Component, Fragment } from 'react';
import ChartistGraph from 'react-chartist';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

export class ChartUsagePerMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  processData = () => {
    const {
      data,
    } = this.props;

    const chartData = {
      labels: [],
      series: [],
    };

    const usageSeries = {
      data: [],
      className: 'usageSeriesLine'
    };

    data.sort((a, b) => new Date(a.year, a.month) - new Date(b.year, b.month)).map(d => {
      chartData.labels.push(`${d.year} - ${d.month}`);
      // Series needs to be an array of arrays.
      usageSeries.data.push(d.kwh);
    });
    chartData.series.push(usageSeries);

    return chartData;
  };

  render() {

    const chartData = this.processData();
    const chartOptions = {
      low: 0,
    };

    console.log(chartData);

    return (
      <Fragment>
        <Header>Usage (kwh) Per Month</Header>
        <ChartistGraph data={ chartData } options={ chartOptions } type="Line" />
      </Fragment>
    )
  }
}

ChartUsagePerMonth.propTypes = {
};

export default connect((state) => ({
  data: state.measurements.all,
}), {
})(ChartUsagePerMonth);