import React, { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import Axios from 'axios';

function CreateArea(props) {
  const [inputClick, setInputClick] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  // useEffect(()=>{
  //   Axios.get("localhost:4000/notes").then((response)=>{
  //     setNote(response.data);
  //   });
  // }, []);

  function handleChange(event) {
    const { name, value } = event.target;


    setNote(preValue => {
      return {
        ...preValue,
        [name]: value
      }
    });
    
    
  }

  function handleClick(event) {
    props.addTodo(note);
    Axios.post("http://localhost:4000/notes", note);  
    setNote({
      title: "",
      content: ""
    })

    event.preventDefault();
  }
function handleInput(){
  setInputClick(true);
}

  return (
    <div>
      <form className="create-note">
        <input type={inputClick ? "text" : "hidden"} name="title" onChange={handleChange} value={note.title} placeholder="Title" />
        <textarea name="content" onChange={handleChange} onClick={handleInput} value={note.content} placeholder="Take a note..." rows={ inputClick ? "3" : "1"} />
        <Zoom in={inputClick}>
        <Fab onClick={handleClick}>
        <AddIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
