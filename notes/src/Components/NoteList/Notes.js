import React, { Component } from 'react';
import axios from 'axios';

import Note from './Note';
import './Notes.css';

/* Notes.js
 * List all of the notes in one page.
 * Calls out to Note to display each block.
 */

class Notes extends Component {
  constructor(props) {
    super(props);

    // I'm not sure what we'll need in state just yet. 
    this.state = {
      notes: [],
    };
  };

  // Pull all notes from the API
  componentDidMount() {
    axios.get(`http://localhost:1234/note/get/all`)
      .then( (response) => {
        console.log('response data: ', response.data);
        this.setState( () => ({ notes: response.data }) )
        console.log('state', this.state);
      })
      .catch( (error) => console.error(error) );
  };

  render() {
    return(
      <div className="appNotes">
        <h2>Your Notes:</h2>
        <div className="noteList">
          {this.state.notes.map( (note) => {
            return (<Note key={note.noteId} title={note.title} textBody={note.textBody} id={note.noteId} />);
          })}
        </div>
      </div>
    );
  };
};

export default Notes;