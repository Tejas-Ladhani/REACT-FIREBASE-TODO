import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { db } from './Firebase'
function Todo({ todo, inprogress, id }) {
    function toggleInProgress() {
        db.collection("todo").doc(id).update({
          is_in_progress: !inprogress,
        });
      }
    
    function deleteTodo(){
        db.collection('todo').doc(id).delete();
    } 
    
    function editTodo(){
    }
    
      return (
        <div style={{ display: "flex" }}>
          <ListItem>
            <ListItemText
              primary={todo}
              secondary={inprogress ? "In Progress" : "Completed"}
            />
          </ListItem>
    
          <Button onClick={toggleInProgress}>
            {inprogress ? "Done" : "UnDone"}
          </Button>
          <Button disabled>Edit</Button>
          <Button onClick={deleteTodo}>X</Button>
        </div>
      );
}

export default Todo
