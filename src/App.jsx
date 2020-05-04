import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "-",
    };
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <input
        type="text"
        value={this.state.name}
        onChange={this.handleChange}
      />
    );
  }
}

export default App;
