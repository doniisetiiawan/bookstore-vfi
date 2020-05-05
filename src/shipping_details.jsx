import React, { Component } from 'react';

export default class ShippingDetails extends Component {
  constructor(props) {
    super(props);

    this.intervals = [];
    this.state = {
      fullName: '',
      contactNumber: '',
      shippingAddress: '',
      error: false,
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

  _renderError = () => {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      );
    }
  };

  _validateInput = () => {
    if (this.state.fullName === '') {
      this.setState({ error: 'Please enter full name' });
    } else if (this.state.contactNumber === '') {
      this.setState({
        error: 'Please enter contact number',
      });
    } else if (this.state.shippingAddress === '') {
      this.setState({
        error: 'Please enter shipping address',
      });
    } else {
      this.setState({ error: false });
      return true;
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      fullName: this.state.fullName,
      contactNumber: this.state.contactNumber,
      shippingAddress: this.state.shippingAddress,
    };

    if (this._validateInput()) {
      this.props.updateFormData(formData);
    }
  };

  handleChange = (event, attribute) => {
    const newState = this.state;
    newState[attribute] = event.target.value;
    this.setState(newState);
    console.log(this.state);
  };

  render() {
    const errorMessage = this._renderError();
    const minutes = Math.floor(this.state.cartTimeout / 60);
    const seconds = this.state.cartTimeout - minutes * 60;

    return (
      <div>
        <h1>Enter your shipping information.</h1>
        {errorMessage}
        <div style={{ width: 200 }}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full Name"
                value={this.state.fullName}
                onChange={(event) => this.handleChange(event, 'fullName')}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Contact number"
                value={this.state.contactNumber}
                onChange={(event) => this.handleChange(event, 'contactNumber')}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Shipping Address"
                value={this.state.shippingAddress}
                onChange={(event) => this.handleChange(
                  event,
                  'shippingAddress',
                )}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="well">
          <span
            className="glyphicon glyphicon-time"
            aria-hidden="true"
          />
          {' '}
          You have
          {' '}
          {minutes}
          {' '}
          Minutes,
          {' '}
          {seconds}
          {' '}
          Seconds,
          before confirming order
        </div>
      </div>
    );
  }
}
