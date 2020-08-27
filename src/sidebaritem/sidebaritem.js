import React from "react";
import { withStyles, ListItem, ListItemText  } from "@material-ui/core";
import { removeHTMLTags } from "../helpers";
import styles from "./styles";
import { Delete } from "@material-ui/icons";

class SidebarItemComponent extends React.Component{

    render(){
        const { classes, _note, _index, selectedNoteIndex } = this.props;
        return <div key = "_index">
            <ListItem className={classes.listItem}
            selected={selectedNoteIndex === _index}
            alignItems="flex-start"
            >
            <div className={classes.textSection}
            onClick={() => this.selectNote(_note, _index)}
            >
            <ListItemText
                primary={_note.title}
                secondary={removeHTMLTags(_note.body.substring(0,30)) + "..."}
            />
            </div>
            <Delete
                onClick={() => this.deleteNote(_note)}
                className={classes.deleteIcon}
            />
            </ListItem>
        </div>
    }
    selectNote = (_note, _index) => this.props.selectNote(_note, _index);
    deleteNote = (_note) => {
        if(window.confirm(`Are you sure to delete the note : ${_note.title}`)){
            this.props.deleteNote(_note)
        }
    }
}

export default withStyles(styles)(SidebarItemComponent);