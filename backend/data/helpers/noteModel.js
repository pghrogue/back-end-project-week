const db = require('../dbConfig');

module.exports = {
  get: (id) => {
    if( id ) {
      //console.log('get id found:', id );
      // Will return the note with the specified ID
      return db('notes').where('noteId', id).first();
    } else {
      //console.log('get id not found');
      // Will return a list of all notes
      return db('notes');
    }
  },

  insert: (note) => {
    // Create a new note and return the ID
    return db('notes').insert(note);
  },

  // This would not work in ES6 format.
  update: function(id, newNote) {
    // Edit note and return new note.
    return db('notes').where('noteId', id)
      .update(newNote)
      .then( (count) => (count > 0 ? this.get(id) : null) );
  },

  remove: (id) => {
    // Delete the note
    return db('notes').where('noteId', id)
      .del();
  }

};