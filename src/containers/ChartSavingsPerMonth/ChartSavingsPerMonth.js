import React, { Component, Fragment } from 'react';
import ChartistGraph from 'react-chartist';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/Header';

const RAW_DATA = [
    {
        "year": 2017,
        "month": 4,
        "kwh": 1000,
        "bill": 124.04,
        "savings": 12.99
    },
    {
        "year": 2017,
        "month": 3,
        "kwh": 730,
        "bill": 94.14,
        "savings": 2.99
    },
    {
        "year": 2017,
        "month": 2,
        "kwh": 500,
        "bill": 70.04,
        "savings": 1.32
    },
    {
        "year": 2017,
        "month": 1,
        "kwh": 750,
        "bill": 73.29,
        "savings": 3.49
    },
    {
        "year": 2016,
        "month": 12,
        "kwh": 1500,
        "bill": 144.04,
        "savings": 19.81
    },
];

export class ChartSavingsPerMonth extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  processData = () => {
    const chartData = {
      labels: [],
      series: [],
    };

    const savingsSeries = {
      data: [],
      className: 'savingsSeriesStackedBar'
    };
    const billSeries = {
      data: [],
      className: 'billSeriesStackedBar'
    };

    RAW_DATA.sort((a, b) => new Date(a.year, a.month) - new Date(b.year, b.month)).map(d => {
      chartData.labels.push(`${d.year} - ${d.month}`);
      // Series needs to be an array of arrays.
      savingsSeries.data.push(d.savings);
      billSeries.data.push(d.bill);
    });
    chartData.series.push(billSeries, savingsSeries);

    return chartData;
  };

  render() {

    const chartData = this.processData();
    const chartOptions = {
      stackBars: true,
    };

    console.log(chartData);

    return (
      <Fragment>
        <Header>Savings Per Month (red: bill, green: savings)</Header>
        <ChartistGraph data={ chartData } options={ chartOptions } type="Bar" />
      </Fragment>
    )
  }
}

ChartSavingsPerMonth.propTypes = {
};

export default connect((state, props) => ({
}), {
})(ChartSavingsPerMonth);