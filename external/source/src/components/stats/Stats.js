import React from 'react';
import { connect } from 'react-redux';
import ChartJS from 'chart.js';
import { sum, map } from 'lodash';

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
    datasets: [
      {
        data: [],
        backgroundColor: []
      }
    ],
    labels: []
  },
  options: {
    maintainAspectRatio: false
  }
};
let dataChartPerDay = {
  type: 'bar',
  data: {
    datasets: [
      {
        label: 'Hours',
        data: [],
        backgroundColor: colors.Accepted
      }
    ],
    labels: []
  },
  options: {
    maintainAspectRatio: false
  }
};
let dataChartPerMonth = {
  type: 'bar',
  data: {
    datasets: [
      {
        label: 'Total Accepted Hours',
        data: [],
        backgroundColor: colors.Accepted
      }
    ],
    labels: []
  },
  options: {
    maintainAspectRatio: false
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

    this.chartPerStatus = new ChartJS(chartPerStatusCtx, dataChartPerStatus);
    this.chartPerDay = new ChartJS(chartPerDayCtx, dataChartPerDay);
    this.chartPerMonth = new ChartJS(chartPerMonthCtx, dataChartPerMonth);
  }

  componentWillReceiveProps(np) {
    if (!this.state.isGet) {
      this.setState({ isGet: true });
      this.props.getStatByUserID(this.props.token, 1);
    }
    // update chart per status if we need this
    if (sum(map(np.per_status, 'total')) !== sum(map(this.props.per_status, 'total'))) {
      dataChartPerStatus.data.labels = map(np.per_status, 'status');
      dataChartPerStatus.data.datasets[0].data = map(np.per_status, 'total');
      dataChartPerStatus.data.datasets[0].backgroundColor = map(np.per_status, item => colors[item.status]);
      this.chartPerStatus.update();
    }

    // update chart per day if we need this
    if (sum(map(np.per_day, 'total')) !== sum(map(this.props.per_day, 'total'))) {
      dataChartPerDay.data.labels = map(np.per_day, 'date');
      dataChartPerDay.data.datasets[0].data = map(np.per_day, 'total');
      this.chartPerDay.update();
    }

    // update chart per months if we need this
    console.log(sum(map(np.per_months, 'total')));
    if (sum(map(np.per_months, 'total')) !== sum(map(this.props.per_months, 'total'))) {
      console.log('134');
      dataChartPerMonth.data.labels = map(np.per_months, 'month');
      dataChartPerMonth.data.datasets[0].data = map(np.per_months, 'total');
      this.chartPerMonth.update();
    }
  }

  componentWillUnmount() {
    this.chartPerStatus = null;
    this.chartPerDay = null;
    this.chartPerMonth = null;
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
    per_months: state.statReducer.per_months
  };
}

export default connect(mapStateToProps, { getStatByUserID })(Stats);
