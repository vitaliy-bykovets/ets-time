import React from 'react';
import AppBar from 'material-ui/AppBar';

const titleStyle = {
  fontSize: '14px'
};

class Topbar extends React.Component {
  render() {
    return (
      <AppBar
        title="Selecto Tracking System"
        showMenuIconButton={false}
        titleStyle={titleStyle}
      />
    );
  }
}

export default Topbar;
