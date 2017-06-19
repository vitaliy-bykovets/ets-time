import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

// Data
import colors from './../../data/colors';

// Icons
import FaArrowUp from 'react-icons/lib/fa/arrow-up';

// Actions
import { changeBgColor } from './../../store/actions/generalActions';

class Settings extends React.Component {
  state = { bgColor: '' };

  componentDidMount() {
    this.setState({ bgColor: this.props.bgColor });
  }

  handleClickColor = color => {
    this.setState({ bgColor: color });
  };

  saveSettings = () => {
    const { bgColor } = this.state;
    localStorage.setItem('bdColor', bgColor);
    this.props.changeBgColor(bgColor);
    this.props.toggleSettings();
  };

  render() {
    const { settingsOpen, toggleSettings } = this.props;
    const { bgColor } = this.state;
    const colorsSection = colors.map((i, index) =>
      <div
        key={index}
        className="sidebar__color"
        style={{ background: i }}
        onClick={() => this.handleClickColor(i)}
      >
        {bgColor === i
          ? <FaArrowUp className="sidebar__color-pointer" />
          : null}
      </div>
    );

    return (
      <div
        className={classnames('sidebar', {
          'sidebar--open': settingsOpen
        })}
      >
        <div className="sidebar__wrapper">
          <label className="filters__headline">Background color</label>
          <div className="sidebar__colors">
            {colorsSection}
          </div>
        </div>
        <div className="filtersBtns">
          <button
            className="filtersBtns__btn filtersBtns__btn--save"
            onClick={this.saveSettings}
          >
            Save
          </button>
          <button
            className="filtersBtns__btn filtersBtns__btn--cancel"
            onClick={toggleSettings}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bgColor: state.generalReducer.bgColor
  };
}

export default connect(mapStateToProps, { changeBgColor })(Settings);
