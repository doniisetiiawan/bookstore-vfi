import React, { Component } from 'react';

export default class DeliveryDetails extends Component {
  constructor(props) {
    super(props);

    this.intervals = [];
    this.state = {
      deliveryOption: 'Primary',
      cartTimeout: this.props.cartTimeout,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    this.setInterval(this.decrementCartTimer, 1000);
  };

  setInterval = (...args) => {
    // eslint-disable-next-line prefer-spread
    this.intervals.push(setInterval.apply(null, args));
  };

  decrementCartTimer = () => {
    if (this.state.cartTimeout == 0) {
      this.props.alertCartTimeout();
      return;
    }
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      cartTimeout: this.state.cartTimeout - 1,
    });
  };

  componentWillUnmount = () => {
    this.intervals.map(clearInterval);
    this.props.updateCartTimeout(this.state.cartTimeout);
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = (newProps) => {
    this.setState({ cartTimeout: newProps.cartTimeout });
  };

  handleChange = (event) => {
    this.setState({ deliveryOption: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateFormData(this.state);
  };

  render() {
    const minutes = Math.floor(this.state.cartTimeout / 60);
    const seconds = this.state.cartTimeout - minutes * 60;

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

        <div className="well">
          <span
            className="glyphicon glyphicon-time"
            aria-hidden="true"
          />
          You have {minutes} Minutes, {seconds} Seconds,
          before confirming order
        </div>
      </div>
    );
  }
}
