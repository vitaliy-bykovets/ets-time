import React from 'react';
import classnames from 'classnames';

class TrackBlockMenu extends React.Component {
  render() {
    const { t, menuOpen } = this.props;
    return (
      <div
        className={classnames('track-menu-btns', {
          'track-menu-btns--opened': menuOpen
        })}
      >
        <button className="track-menu-btns__btn">Edit</button>
        <button className="track-menu-btns__btn">Delete</button>
        {t.status !== 'Declined'
          ? <button className="track-menu-btns__btn">Decline</button>
          : null}
        {t.status !== 'Accepted'
          ? <button className="track-menu-btns__btn">Accept</button>
          : null}
        <button
          className="track-menu-btns__btn"
          onClick={this.props.toggleMenu}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default TrackBlockMenu;
