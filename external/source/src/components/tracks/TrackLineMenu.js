import React from 'react';

// Icons
import FaPencil from 'react-icons/lib/fa/pencil';
import FaDelete from 'react-icons/lib/fa/trash-o';
import FaAccept from 'react-icons/lib/fa/check-square-o';
import FaDecline from 'react-icons/lib/fa/ban';

class TrackLineMenu extends React.Component {
  render() {
    const { view } = this.props;
    return (
      <div>
        {view === 'line'
          ? <div className="track__menuBtn--line">
              <div className="track__menuBtnLine--btn">
                <FaPencil />
              </div>
              <div className="track__menuBtnLine--btn">
                <FaDelete />
              </div>
              <div className="track__menuBtnLine--btn">
                <FaAccept />
              </div>
              <div className="track__menuBtnLine--btn">
                <FaDecline />
              </div>
            </div>
          : null}
      </div>
    );
  }
}

export default TrackLineMenu;
