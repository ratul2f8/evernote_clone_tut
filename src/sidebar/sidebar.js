import React from "react";
import { withStyles, List, Divider, Button } from "@material-ui/core";
import styles from "./styles";
import SidebarItemComponent from "../sidebaritem/sidebaritem";

class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
    };
  }
  render() {
    const { selectedNoteIndex, notes, classes } = this.props;
    if(notes){
      return (
        <div className={classes.sidebarContainer}>
          <Button className={classes.newNoteBtn} onClick={this.newNoteBtnClick}>
            {this.state.addingNote ? "Cancel" : "New Note"}
          </Button>
          {this.state.addingNote ? (
            <div>
              <input
                placeholder="Enter note title"
                className={classes.newNoteInput}
                onKeyUp={(e) => this.updateTitle(e.target.value)}
              />
              <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
                Submit Note
              </Button>
            </div>
          ) : null}
          <List>
            {
              notes.map((_note, _index) => {
                return (<div key = {_index}>
                <SidebarItemComponent
                  _note={_note}
                  _index={_index}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                />
                <Divider/>
                </div>)
              })
            }
          </List>
        </div>
      );
    }else{
      return <div>Add a Note!</div>
    }
  }
  newNoteBtnClick = () => {
    this.setState({
      addingNote: !this.state.addingNote,
      title: null,
    });
  };

  updateTitle = (text) => {
    this.setState({
      title: text,
    });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      title: null,
      addingNote: false
    })
  };
  selectNote = (_note, _index) => this.props.selectNote(_note, _index);
  deleteNote = (_note) => {
    this.props.deleteNote(_note)
  }
}

export default withStyles(styles)(SidebarComponent);
