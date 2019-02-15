import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import NoteForm from './NoteForm';
import './EditNote.css';

/* EditNote/AddNote.js
 * Class used for editing a current note. I'd like to use a standard
 * form for both edit and create. This is very much a duplicate of EditNote
 */
class AddNote extends Component {
  constructor(props){
    super(props);

    this.state = {
      note: {},
      newTitle: "",
      newText: "",
      redirect: false
    };
  };

  /* Will need an axios call to pull the note data initially */
  componentDidMount() {
    axios.get(`http://localhost:1234/note/get/${this.props.match.params.id}`)
      .then( (response) => {
        this.setState( () => ({ note: response.data, newTitle: response.data.title, newText: response.data.textBody }) )
      })
      .catch( (error) => console.error(error) );
  };

  /* Need a handler for changing form fields */
  handleInput = (event) => {
    this.setState( {[event.target.name]: event.target.value} );
  };

  // Need a handler for submitting & updating through axios
  handleSubmit = (event) => {
    event.preventDefault();

    // Setting variable to avoid setting/updating axios through state.
    // Was having a major block using state.
    const newNote = Object.assign({}, this.state.note, {
      title: this.state.newTitle,
      textBody: this.state.newText,
      userId: 1
    });
    
    // Send to axios
    axios.post(`http://localhost:1234/note/create`, newNote )
    .then( (response) => {
      console.log( "response:", response );
      this.setState( () => ({ 
        note: { noteId: response.data.success }, 
        newTitle: "", 
        newText: "", 
        redirect: true 
      }) )
    })
    .catch( (error) => console.error(error));
  };

  /* Send props:
  * -- handleInput: fn()
  * -- handleSubmit: fn()
  * -- title: ""
  * -- textBody: ""
  */
  render() {
    if ( this.state.redirect === true ) {
      return (<Redirect to={`/note/${this.state.note.noteId}`} />);
    }

    return (
      <div className="viewNote">
        <div className="viewNoteTitle">Add Note:</div>
        <NoteForm 
          handleInput={this.handleInput} 
          handleSubmit={this.handleSubmit}
          title={this.state.newTitle}
          textBody={this.state.newText}
        />
      </div>
    );
  };
};

export default AddNote;