import React from "react";
import ReactQuill from "react-quill";
import { withStyles } from "@material-ui/core";
import debounce from "../helpers";
import styles from "./styles";
import { BorderColor } from "@material-ui/icons";

class EditorComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      title: "",
      id: "",
    };
  }

  componentDidMount() {
    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
    });
  }

  componentDidUpdate() {
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
      <BorderColor className={classes.editIcon}/>
      <input
          placeholder= "Note Title..."
          className={classes.titleInput}
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}
      />
        <ReactQuill value={this.state.text} onChange={this.updateBody} />
      </div>
    );
  }

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  updateTitle  = async (title) => {
      await this.setState({ title: title});
      this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
        title: this.state.title,
        body: this.state.text
    })
  }, 1500);
}

export default withStyles(styles)(EditorComponent);
