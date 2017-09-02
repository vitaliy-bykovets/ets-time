import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Data
import colors from './../../data/colors';

// Icons
import FaArrowUp from 'react-icons/lib/fa/arrow-up';

// Actions
import { changeBgColor, toggleStatistic, toggleDivideDays } from './../../store/actions/generalActions';

class Settings extends React.Component {
  state = { bgColor: '', showStatistic: true, divideDays: false };

  changeInput = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  componentDidMount() {
    let { bgColor, showStatistic, divideDays } = this.props;
    this.setState({ bgColor, showStatistic, divideDays });
  }

  handleClickColor = color => {
    this.setState({ bgColor: color });
  };

  saveSettings = () => {
    const { bgColor, showStatistic, divideDays } = this.state;

    localStorage.setItem('bdColor', bgColor);
    localStorage.setItem('showStatistic', showStatistic);
    localStorage.setItem('divideDays', divideDays);

    this.props.changeBgColor(bgColor);
    this.props.toggleStatistic(showStatistic);
    this.props.toggleDivideDays(divideDays);
    this.props.toggleSettings();
  };

  render() {
    const { settingsOpen, toggleSettings } = this.props;
    const { bgColor } = this.state;
    const colorsSection = colors.map((i, index) => (
      <div key={index} className="sidebar__color" style={{ background: i }} onClick={() => this.handleClickColor(i)}>
        {bgColor === i ? <FaArrowUp className="sidebar__color-pointer" /> : null}
      </div>
    ));

    return (
      <div
        className={classnames('sidebar', {
          'sidebar--open': settingsOpen
        })}
      >
        <div className="sidebar__wrapper">
          <h4 className="sidebar__title">Settings</h4>
          <h5 className="sidebar__subtitle">General</h5>
          <div className="m-t-20">
            <input
              id="checkStatistic"
              type="checkbox"
              name="showStatistic"
              checked={this.state.showStatistic}
              onChange={this.changeInput}
              className="checkbox"
            />
            <label htmlFor="checkStatistic">Show statistic</label>
          </div>
          <div className="m-t-20">
            <input
              id="checkDaysRange"
              type="checkbox"
              name="divideDays"
              checked={this.state.divideDays}
              onChange={this.changeInput}
              className="checkbox"
            />
            <label htmlFor="checkDaysRange">Divide days to ranges (table view)</label>
          </div>
          <h5 className="sidebar__subtitle">Style</h5>
          <label className="input-headline">Background color</label>
          <div className="sidebar__colors">{colorsSection}</div>
        </div>
        <div className="sidebarBtns">
          <button className="sidebarBtns__btn sidebarBtns__btn--save" onClick={this.saveSettings}>
            Save settings
          </button>
          <button className="sidebarBtns__btn sidebarBtns__btn--cancel" onClick={toggleSettings}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { bgColor, showStatistic, divideDays } = state.generalReducer;
  return {
    bgColor,
    showStatistic,
    divideDays
  };
}

export default connect(mapStateToProps, { changeBgColor, toggleStatistic, toggleDivideDays })(Settings);
