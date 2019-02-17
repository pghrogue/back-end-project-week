import React, { Component } from 'react';
import auth0Client from './Components/Authorization/Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    this.props.history.replace('/');
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
};

export default Callback;