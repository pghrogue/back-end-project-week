import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';
import auth0Client from '../Authorization/Auth';

/* Left side bar that remains open at all times.
 * This has the links to view & create
 */

class Nav extends Component {
  constructor(props) {
    super(props);
  };
  
  signOut = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  render() {
    return (
      <div className="Nav">
        <h1>Lambda Notes</h1>
        {
          !auth0Client.isAuthenticated() &&
          <button onClick={auth0Client.signIn}>Sign In</button>  
        }
        {
          auth0Client.isAuthenticated() &&
          <>
          <Link to="/" className="navButton">View Your Notes</Link>
          <Link to="/add" className="navButton">+ Create New Note</Link>
          </>
        }
      </div>
    );
  }
}

export default Nav;
