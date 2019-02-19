import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import auth0Client from './Components/Authorization/Auth';

import './App.css';
import SecuredRoute from './Components/Authorization/SecuredRoute';
import Nav from './Components/Nav/Nav';
import Notes from './Components/NoteList/Notes';
import Note from './Components/Note/Note';
import EditNote from './Components/EditNote/EditNote';
import AddNote from './Components/EditNote/AddNote';
import Callback from './Components/Authorization/Callback';

/* Main entry point for the Lambda Notes app.
 * This will primarily contains the routes needed for our app
 */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    };
  }

  // Check if authorized
  async componentDidMount() {
    if( this.props.location.pathname === '/callback') {
      this.setState({checkingSession: false});
      return;
    }

    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if( err.error !== 'login_required')
        console.log(err.error);
    }
    this.setState({checkingSession: false});
  };

  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
        <SecuredRoute exact path="/notes" component={Notes} checkingSession={this.state.checkingSession} />
        <Route path="/note/:id" component={Note} />
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/add" component={AddNote} />
        <Route exact path='/callback' component={Callback} />
      </div>
    );
  }
}

export default App;
