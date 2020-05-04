// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';

class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [
        {
          id: 1,
          name: 'Zero to One',
          author: 'Peter Thiel',
        },
        {
          id: 2,
          name: 'Monk who sold his Fearrary',
          author: 'Robin Sharma',
        },
        {
          id: 3,
          name: 'Wings of Fire',
          author: 'A.P.J. Abdul Kalam',
        },
      ],
      selectedBooks: [],
      error: false,
    };
  }

  _renderError = () => {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      );
    }
  };

  handleSelectedBooks = (event) => {
    const { selectedBooks } = this.state;
    const index = selectedBooks.indexOf(event.target.value);
    if (event.target.checked) {
      if (index === -1) selectedBooks.push(event.target.value);
    } else {
      selectedBooks.splice(index, 1);
    }
    // console.log(selectedBooks);
    this.setState({ selectedBooks });
  };

  _renderBook = (book) => (
    <div className="checkbox" key={book.id}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        <input
          type="checkbox"
          value={book.name}
          onChange={this.handleSelectedBooks}
        />
        {book.name}
        {' '}
        --
        {book.author}
      </label>
    </div>
  );

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.selectedBooks.length === 0) {
      this.setState({
        error:
          'Please choose at least one book to continue',
      });
    } else {
      this.setState({ error: false });
      this.props.updateFormData({
        selectedBooks: this.state.selectedBooks,
      });
    }
  };

  render() {
    const errorMessage = this._renderError();

    return (
      <div>
        <h3>
          {' '}
          Choose from wide variety of books available in our
          store
        </h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {this.state.books.map((book) => this._renderBook(book))}
          <input
            type="submit"
            className="btn btn-success"
          />
        </form>
      </div>
    );
  }
}

class ShippingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      contactNumber: '',
      shippingAddress: '',
      error: false,
    };
  }

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
      </div>
    );
  }
}

function DeliveryDetails() {
  return <h1>Choose your delivery options here.</h1>;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStep: 1,
      formValues: {},
    };
  }

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
    // eslint-disable-next-line default-case
    switch (this.state.currentStep) {
      case 1:
        return (
          <BookList updateFormData={this.updateFormData} />
        );
      case 2:
        return (
          <ShippingDetails
            updateFormData={this.updateFormData}
          />
        );
      case 3:
        return (
          <DeliveryDetails
            updateFormData={this.updateFormData}
          />
        );
    }
  }
}

export default App;
