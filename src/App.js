import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './App.css';
import { useState, useEffect } from 'react';
import { db } from './Firebase'
import firebase from 'firebase';
import Todo from './Todo';
function App() {
  const [todo, settodo] = useState([]); // will contain the list of todos

  const [todoInput, settodoInput] = useState('');

  // lets display the todos : when should it be fetched  -> At the very first time

  useEffect(() => {
    getTodos();
  }, []);


  function getTodos() {
    /**
     * We can have use get instead of snapShot but ss bcz whenever  data is added it will get reflected to our list (display).
     */

    db.collection("todo").onSnapshot(function (querySnapshot) {

      settodo(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().todo,
          inprogress: doc.data().is_in_progress,
        }))
      );
    });
  }




  // function to add Todo to fb
  function addTodo(e) {
    e.preventDefault()
    // console.log('clicked')
    /**
     * Collection is similar to table.
     * document is similar to a row
     * document have some fields and its values
     * each documnet can have a collection : makes nosql scalable 
     */
    db.collection("todo").add({
      is_in_progress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput

    })

    // now we must clear the field after pressing enter
    settodoInput('')
  }

  return (

    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }}>
      <h1>Tejas Ladhani's Todo App 🍔🍔</h1>
      <form noValidate autoComplete="off">
        <TextField id="standard-basic" style={{ width: "90vw", maxWidth: "500px" }} value={todoInput} onChange={(e) => { settodoInput(e.target.value) }} />
        <Button variant="contained" color="primary" type={'submit'} onClick={addTodo} style={{ display: 'none' }}>
          Add
        </Button>
      </form>
      <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
        {
          todo.map((t) => {
            return (
              // <div style={{display:'flex',}}>
              //   <ListItem key={t.id}>
              //     <ListItemText
              //       primary={t.title}
              //       secondary={t.inprogress ? "in-progess🍳" : "done"}
              //     />
              //   </ListItem>
              //   <Button> {t.inprogress ? "Done" : "Un-done"}</Button>
              //   <Button>X</Button>
              // </div>
              <Todo todo={t.title}
              inprogress={t.inprogress}
              id={t.id}/>

            )
          }
          )
        }
      </div>
    </div>
  );
}

export default App;

// timestamp 44 -4