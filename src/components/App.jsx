import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

function App() {
  const [item, setItem] = useState([]);
  
  function addTodo(note){
    setItem(prevItem=>{
      return [...prevItem, note];
    });
    
  }
  useEffect(()=>{
    Axios.get("http://localhost:4000/notes").then((response)=>{
      setItem(response.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }, []);
  function deleteNote(id){
    Axios.delete(`http://localhost:4000/notes/${id}`);
    setItem(prevItem => {
      return prevItem.filter((currentItem, index)=>{
        return index !== id;
      })
    })
  }
  return (
    <div>
      <Header />
      <CreateArea addTodo={addTodo} />
      {
        item.map((noteItem, index)=>{
          return <Note title={noteItem.title} content={noteItem.content} id={index} onChecked={deleteNote} />
        })
      }
      <Footer />
    </div>
  );
}

export default App;
