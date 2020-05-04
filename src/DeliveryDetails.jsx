import React, { Component } from 'react';

export default class DeliveryDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deliveryOption: 'Primary',
    };
  }

  handleChange = (event) => {
    this.setState({ deliveryOption: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateFormData(this.state);
  };

  render() {
    return (
      <div>
        <h1>Choose your delivery options here.</h1>
        <div style={{ width: 200 }}>
          <form onSubmit={this.handleSubmit}>
            <div className="radio">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <input
                  type="radio"
                  checked={
                    this.state.deliveryOption === 'Primary'
                  }
                  value="Primary"
                  onChange={this.handleChange}
                />
                Primary -- Next day delivery
              </label>
            </div>
            <div className="radio">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <input
                  type="radio"
                  checked={
                    this.state.deliveryOption === 'Normal'
                  }
                  value="Normal"
                  onChange={this.handleChange}
                />
                Normal -- 3-4 days
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
