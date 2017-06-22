import React from 'react';

class LoadingPage extends React.Component {
  render() {
    return (
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
    );
  }
}

export default LoadingPage;
