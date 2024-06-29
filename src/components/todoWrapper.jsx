import React, { useState } from 'react'
import {App} from '../App'
import{v4 as uuidv4} from 'uuid'
uuidv4();

const todoWrapper = () => {
    const [todos, setTodos] = useState([])

    const  addTodo = todo => {
        setTodos([...todos, {id: uuidv4, task: todo, completed: false, isEditing: false}])
    }
    console.log(todos);
  return (
    <div className="todoWrapper">
        <todoForm addTodo={addTodo} />
    </div>
  )
}

export default todoWrapper