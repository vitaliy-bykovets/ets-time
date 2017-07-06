import React from 'react';
import { connect } from 'react-redux';
import ChartJS from 'chart.js';
import { sum, map, each } from 'lodash';

// get api
import { getStatByUserID } from './../../store/actions/statActions';

const colors = {
  Declined: '#FF6E40',
  Accepted: '#4CAF50',
  Open: '#FFC107'
};

let dataChartPerStatus = {
  type: 'pie',
  data: {
    datasets: [],
    labels: []
  },
  options: {
    maintainAspectRatio: false
  }
};
let dataChartPerDay = {
  type: 'bar',
  data: {
    datasets: [],
    labels: []
  },
  options: {
    maintainAspectRatio: false
  }
};
let dataChartPerMonth = {
  type: 'bar',
  data: {
    datasets: [],
    labels: []
  },
  options: {
    maintainAspectRatio: false
  }
};
let dataChartRadar = {
  type: 'radar',
  data: {
    datasets: [
      {
        label: 'Skill percentage',
        data: [],
        borderColor: 'deepskyblue',
        borderWidth: 2
      }
    ],
    labels: []
  },
  options: {
    maintainAspectRatio: false,
    scale: {
      ticks: {
        min: 0,
        max: 100
      }
    }
  }
};

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGet: false
    };
  }

  /* init charts */
  componentDidMount() {
    let chartPerStatusCtx = document.getElementById('byStatus').getContext('2d');
    let chartPerDayCtx = document.getElementById('byDay').getContext('2d');
    let chartPerMonthCtx = document.getElementById('byMonth').getContext('2d');
    let chartRadarCtx = document.getElementById('byRadar').getContext('2d');

    this.chartPerStatus = new ChartJS(chartPerStatusCtx, dataChartPerStatus);
    this.chartPerDay = new ChartJS(chartPerDayCtx, dataChartPerDay);
    this.chartPerMonth = new ChartJS(chartPerMonthCtx, dataChartPerMonth);
    this.chartRadar = new ChartJS(chartRadarCtx, dataChartRadar);
  }

  componentWillReceiveProps(np) {
    if (!this.state.isGet) {
      this.setState({ isGet: true });
      this.props.getStatByUserID(this.props.token, 1);
    }
    let { types } = this.props;
    // pie chart by status in current month
    if (sum(map(np.per_status, 'total')) !== sum(map(this.props.per_status, 'total'))) {
      dataChartPerStatus.data.labels = map(np.per_status, 'status');
      dataChartPerStatus.data.datasets = [];
      dataChartPerStatus.data.datasets.push({
        data: map(np.per_status, 'total'),
        backgroundColor: map(np.per_status, item => colors[item.status])
      });
      this.chartPerStatus.update();
    }

    // update bar chart per day
    if (sum(map(np.per_day, 'total')) !== sum(map(this.props.per_day, 'total'))) {
      dataChartPerDay.data.labels = map(np.per_day, 'date');
      dataChartPerDay.data.datasets = [];
      each(types, type => {
        dataChartPerDay.data.datasets.push({
          label: type,
          data: map(np.per_day, type),
          backgroundColor: colors[type]
        });
      });
      this.chartPerDay.update();
    }

    // update chart per months if we need this
    if (sum(map(np.per_months, 'total')) !== sum(map(this.props.per_months, 'total'))) {
      dataChartPerMonth.data.labels = map(np.per_months, 'month');
      each(types, type => {
        dataChartPerMonth.data.datasets.push({
          label: type,
          data: map(np.per_months, type),
          backgroundColor: colors[type]
        });
      });
      this.chartPerMonth.update();
    }

    // update radar chart

    dataChartRadar.data.labels = map(np.radar, 'name');
    dataChartRadar.data.datasets = [];
    dataChartRadar.data.datasets.push({
      borderColor: 'deepskyblue',
      borderWidth: 2,
      data: map(np.radar, 'percent')
    });
    this.chartRadar.update();
  }

  componentWillUnmount() {
    this.chartPerStatus = null;
    this.chartPerDay = null;
    this.chartPerMonth = null;
    this.chartRadar = null;
  }

  render() {
    return (
      <div>

        <div className="container">
          <div className="statheader statheader--block">
            by user
          </div>
          <div className="stats">
            <canvas id="byStatus" />
          </div>
          <div className="stats">
            <canvas id="byDay" />
          </div>
          <div className="stats">
            <canvas id="byMonth" />
          </div>
          <div className="stats">
            <canvas id="byRadar" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.generalReducer.token,
    per_status: state.statReducer.per_status,
    per_day: state.statReducer.per_day,
    per_months: state.statReducer.per_months,
    radar: state.statReducer.radar,
    types: state.trackReducer.statusTypes
  };
}

export default connect(mapStateToProps, { getStatByUserID })(Stats);
