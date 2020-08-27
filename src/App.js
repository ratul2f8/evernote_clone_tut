import React from "react";
import "./App.css";
import SidebarComponent from "./sidebar/sidebar";
import EditorComponent from "./editor/editor";

const firebase = require("firebase");

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null,
    };
  }
  componentDidMount() {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot((sereverUpdate) => {
        const notes = sereverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({ notes: notes });
      });
  }
  render() {
    return (
      <div className="app-container">
        <SidebarComponent
          notes={this.state.notes}
          selectedNoteIndex={this.state.selectedNoteIndex}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
          selectNote={this.selectNote}
        />
        {this.state.selectedNote ? (
          <EditorComponent
            notes={this.state.notes}
            selectedNoteIndex={this.state.selectedNoteIndex}
            selectedNote={this.state.selectedNote}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }

  selectNote = (note, index) => {
    this.setState({
      selectedNote: note,
      selectedNoteIndex: index,
    });
  };

  noteUpdate = (id, noteObj) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  newNote = async (title) => {
    const note = {
      title: title,
      body: "",
    };

    const newFromDB = await firebase.firestore().collection("notes").add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const newId = newFromDB.id;
    note.id = newId;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === newId)[0]
    );
    //now set the state to adopt the properties newely created note by our database
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note)})
    if( this.state.selectedNoteIndex === noteIndex){
      this.setState({
        selectedNote: null,
        selectedNoteIndex: null
      })
    }else{
      this.state.notes.length >= 1
      ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
      :
      this.setState({ selectedNote: null, selectedNoteIndex: null})
    }

    firebase.firestore().collection('notes').doc(note.id).delete();
  }
}

export default App;
