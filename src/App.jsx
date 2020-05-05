// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';
import BookList from './booklist';
import ShippingDetails from './shipping_details';
import DeliveryDetails from './DeliveryDetails';
import Confirmation from './Confirmation';
import Success from './Success';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      formValues: {},
      cartTimeout: 60,
    };
  }

  updateCartTimeout = (timeout) => {
    this.setState({ cartTimeout: timeout });
  };

  alertCartTimeout = () => {
    this.setState({ currentStep: 10 });
  };

  updateFormData = (formData) => {
    const formValues = {
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state.formValues,
      ...formData,
    };
    // eslint-disable-next-line react/no-access-state-in-setstate
    const nextStep = this.state.currentStep + 1;
    this.setState({ currentStep: nextStep, formValues });
    console.log(formValues);
  };

  render() {
    switch (this.state.currentStep) {
      case 1:
        return (
          <BookList updateFormData={this.updateFormData} />
        );
      case 2:
        return (
          <ShippingDetails
            updateFormData={this.updateFormData}
            cartTimeout={this.state.cartTimeout}
            updateCartTimeout={this.updateCartTimeout}
            alertCartTimeout={this.alertCartTimeout}
          />
        );
      case 3:
        return (
          <DeliveryDetails
            updateFormData={this.updateFormData}
            cartTimeout={this.state.cartTimeout}
            updateCartTimeout={this.updateCartTimeout}
            alertCartTimeout={this.alertCartTimeout}
          />
        );
      case 4:
        return (
          <Confirmation
            data={this.state.formValues}
            updateFormData={this.updateFormData}
            cartTimeout={this.state.cartTimeout}
          />
        );
      case 5:
        return (
          <Success
            data={this.state.formValues}
            cartTimeout={this.state.cartTimeout}
          />
        );
      case 10:
        return (
          <div>
            <h2>Your cart timed out, Please try again!</h2>
          </div>
        );
      default:
        return (
          <BookList updateFormData={this.updateFormData} />
        );
    }
  }
}

export default App;
