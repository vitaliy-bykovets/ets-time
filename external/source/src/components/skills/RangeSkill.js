import React from 'react';
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'

class RangeSkill extends React.Component {
  state = {
    value: 5
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value: value });
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  };

  render() {
    const { value } = this.state;
    const { onSave } = this.props;
    const { skillId } = this.props;
    const { user_id } = this.props;

    return (
      <div className='slider'>
        <div className='value'>{value}</div>
        <Slider
          min={0}
          max={8}
          value={value}
          tooltip={false}
          onChange={this.handleChange}
        />
        <button type="button"
                onClick={onSave.bind(null, {
                  user_id: user_id,
                  skill_id: skillId,
                  value: value
                })}>
          save
        </button>
      </div>
    )
  }
}

export default RangeSkill;