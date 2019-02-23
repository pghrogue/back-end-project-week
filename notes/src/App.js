import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import './App.css';
import Nav from './Components/Nav/Nav';
import Notes from './Components/NoteList/Notes';
import Note from './Components/Note/Note';
import EditNote from './Components/EditNote/EditNote';
import AddNote from './Components/EditNote/AddNote';
import Home from './Components/Home/Home';

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

  render() {
    return (
      <div className="App">
        <Route path="/" component={Nav} />
        <Route exact path="/" component={Home} />
        <Route exact path="/notes" component={Notes} checkingSession={this.state.checkingSession} />
        <Route path="/note/:id" component={Note} />
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/add" component={AddNote} />
      </div>
    );
  }
}

export default withRouter(App);
