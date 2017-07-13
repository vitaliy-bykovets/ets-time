import React from 'react';
import { connect } from 'react-redux';
import ChartJS from 'chart.js';
import { map, each } from 'lodash';
import randomcolor from 'randomcolor';

// get api
import { getStatByUserID } from './../../store/actions/statActions';

// Icons
import FaFilter from 'react-icons/lib/fa/filter';

// Components
import Filters from './Filters';

// Chart settings
import {
  colors,
  dataChartPerStatus,
  dataChartPerTypeWork,
  dataChartPerDay,
  dataChartPerMonth,
  dataChartRadar,
  dataChartPerProjects
} from './chartSettings';

class Stats extends React.Component {
  state = {
    isGet: false,
    showFilters: false
  };

  /* init charts */
  componentDidMount() {
    const { byStatus, byDay, byMonth, byRadar, byTypeWork, byProjects } = this.refs;
    const chartPerStatusCtx = byStatus.getContext('2d');
    const chartPerTypeWorkCtx = byTypeWork.getContext('2d');
    const chartPerProjectsCtx = byProjects.getContext('2d');
    const chartPerDayCtx = byDay.getContext('2d');
    const chartPerMonthCtx = byMonth.getContext('2d');
    const chartRadarCtx = byRadar.getContext('2d');

    this.chartPerProjects = new ChartJS(chartPerProjectsCtx, dataChartPerProjects);
    this.chartPerTypeWork = new ChartJS(chartPerTypeWorkCtx, dataChartPerTypeWork);
    this.chartPerStatus = new ChartJS(chartPerStatusCtx, dataChartPerStatus);
    this.chartPerDay = new ChartJS(chartPerDayCtx, dataChartPerDay);
    this.chartPerMonth = new ChartJS(chartPerMonthCtx, dataChartPerMonth);
    this.chartRadar = new ChartJS(chartRadarCtx, dataChartRadar);
  }

  componentWillReceiveProps(np) {
    const { types } = this.props;

    // pie chart by status in current month
    dataChartPerStatus.data.labels = map(np.per_status, 'status');
    dataChartPerStatus.data.datasets = [];
    dataChartPerStatus.data.datasets.push({
      data: map(np.per_status, 'total'),
      backgroundColor: map(np.per_status, item => colors[item.status])
    });
    this.chartPerStatus.update();

    // pie chart by type work in current month
    dataChartPerTypeWork.data.labels = map(np.per_type_work, 'type_work');
    dataChartPerTypeWork.data.datasets = [];
    dataChartPerTypeWork.data.datasets.push({
      data: map(np.per_type_work, 'total'),
      backgroundColor: randomcolor.randomColor({ luminosity: 'bright', count: np.per_type_work.length })
    });
    this.chartPerTypeWork.update();

    // pie chart by type work in current month
    dataChartPerProjects.data.labels = map(np.per_projects, 'project');
    dataChartPerProjects.data.datasets = [];
    dataChartPerProjects.data.datasets.push({
      data: map(np.per_projects, 'total'),
      backgroundColor: randomcolor.randomColor({ luminosity: 'bright', count: np.per_projects.length })
    });
    this.chartPerProjects.update();

    // update bar chart per day
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

    // update chart per months if we need this
    dataChartPerMonth.data.labels = map(np.per_months, 'month');
    dataChartPerMonth.data.datasets = [];
    each(types, type => {
      dataChartPerMonth.data.datasets.push({
        label: type,
        data: map(np.per_months, type),
        backgroundColor: colors[type]
      });
    });
    this.chartPerMonth.update();

    // update radar chart
    dataChartRadar.data.labels = map(np.radar, 'name');
    dataChartRadar.data.datasets = [];
    dataChartRadar.data.datasets.push({
      borderColor: 'deepskyblue',
      borderWidth: 2,
      data: map(np.radar, 'percent'),
      label: 'Skill percentage'
    });
    this.chartRadar.update();
  }

  componentWillUnmount() {
    this.chartPerStatus = null;
    this.chartPerDay = null;
    this.chartPerMonth = null;
    this.chartRadar = null;
    this.chartPerProjects = null;
    this.chartPerTypeWork = null;
  }

  toggleFilters = () => {
    this.setState({ showFilters: !this.state.showFilters });
  };

  setHeaderData = (header_period, header_username) => {
    this.setState({ header_period, header_username });
  };

  render() {
    const { bgColor } = this.props;

    return (
      <div>
        <div className="container">
          <div className="statistic statistic--block">
            <div className="statistic__wrapper">
              <span className="statistic__number">
                {this.state.header_period}
              </span>
              <span className="statistic__label">Period</span>
            </div>
            <div className="statistic__wrapper">
              <span className="statistic__number">
                {this.state.header_username}
              </span>
              <span className="statistic__label">Member</span>
            </div>
          </div>
          <div className="stats">
            <div className="stats__label">By status (per tasks)</div>
            <canvas ref="byStatus" />
          </div>
          <div className="stats">
            <div className="stats__label">By type of work (per hours)</div>
            <canvas ref="byTypeWork" />
          </div>
          <div className="stats">
            <div className="stats__label">By project (per hours)</div>
            <canvas ref="byProjects" />
          </div>
          <div className="stats">
            <div className="stats__label">Current Month</div>
            <canvas ref="byDay" />
          </div>
          <div className="stats">
            <div className="stats__label">Skill Radar</div>
            <canvas ref="byRadar" />
          </div>
          <div className="stats">
            <div className="stats__label">All Activity</div>
            <canvas ref="byMonth" />
          </div>

          <Filters
            toggleFilters={this.toggleFilters}
            parentState={this.state}
            getStatByUserID={this.props.getStatByUserID}
            setHeaderData={this.setHeaderData}
          />
          <div className="mainBtns">
            <button className="mainBtns__btn" onClick={this.toggleFilters} style={{ color: bgColor }}>
              <FaFilter />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.generalReducer.token,
    bgColor: state.generalReducer.bgColor,
    per_status: state.statReducer.per_status,
    per_type_work: state.statReducer.per_type_work,
    per_day: state.statReducer.per_day,
    per_months: state.statReducer.per_months,
    per_projects: state.statReducer.per_projects,
    radar: state.statReducer.radar,
    types: state.trackReducer.statusTypes,
    activeUser: state.userReducer.activeUser
  };
}

export default connect(mapStateToProps, { getStatByUserID })(Stats);
