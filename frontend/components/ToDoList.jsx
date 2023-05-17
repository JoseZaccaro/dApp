import React, { useEffect, useState } from 'react';
import { useCanister } from "@connect2ic/react"
import '../assets/toDo.css'
import { homework as homeworkActor } from '../../src/declarations/homework/index.js'
const ToDoList = () => {
  // Estado para almacenar la lista de tareas
  const [todos, setTodos] = useState([]);
  // Estado para almacenar el valor del input
  const [newTodo, setNewTodo] = useState('');

  // const [homeworkActor] = useCanister("homework")
  // Función para obtener todas las tareas
  const getAllHomework = async () => {
    const all = await homeworkActor.getAllHomework()
    setTodos(all)
  };

  useEffect(() => {
    getAllHomework()
  }, [])



  // Función para agregar una nueva tarea
  const addHomework = async () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
      setNewTodo('');
      try {
        let id = await homeworkActor.addHomework({
          title: newTodo,
          description: "",
          dueDate: Date.now(),
          completed: false
        })
        console.log(id);
      } catch (error) {

      }
    }
  };

  // Función para marcar una tarea como completada
  const markAsCompleted = async (id) => {
    setTodos(
      todos.map((todo, i) =>
        i === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    try {

      await homeworkActor.updateHomework(id, { ...todos[id], completed: !todos[id].completed })
    } catch (error) {
      console.log(error);
    }

  };

  // Función para eliminar una tarea
  const deleteHomework = async (id) => {
    setTodos(todos.filter((todo, i) => i !== id));
    try {
      await homeworkActor.deleteHomework(id)
    } catch (error) {
      console.log(error);
    }
  };

  // Función para actualizar una tarea
  const updateHomework = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // Función para buscar una tarea
  const searchHomework = (searchText) => {
    // Aquí puedes implementar la lógica de búsqueda según tus necesidades
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setTodos(filteredTodos)
    console.log(filteredTodos);
  };


  // Función para obtener las tareas pendientes
  const getPendingHomework = () => {
    const pendingTodos = todos.filter((todo) => !todo.completed);
    setTodos(pendingTodos)
    console.log(pendingTodos);
  };

  return (
    <div className="main">

      <div className="container">
        <h1>To Do List</h1>

        <input
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addHomework} className='add-button'>Add Task</button>

        <ul className="todo-list">
          {todos?.map((todo, i) => (
            <li key={i} className={todo.completed ? 'completed' : ''}>
              <span>{todo.title}</span>
              <button onClick={() => markAsCompleted(i)}>
                {todo.completed ? 'Unmark' : 'Mark'}
              </button>
              <button onClick={() => deleteHomework(i)}>Delete</button>
            </li>
          ))}
        </ul>

        <div>
          <h2>Search Homework</h2>
          <input
            type="text"
            placeholder="Search tasks"
            className="search-input"
            onChange={(e) => searchHomework(e.target.value)}
          />
        </div>

        {/* <div className=''>
        <button onClick={getAllHomework}>Get All Homework</button>
        <button onClick={getPendingHomework}>Get Pending Homework</button>
      </div> */}
        <div className="btns-get action-buttons">
          <button className="get-all-button" onClick={getAllHomework}>
            Get All Tasks
          </button>
          <button className="get-pending-button" onClick={getPendingHomework}>
            Get Pending Tasks
          </button>
        </div>

      </div >
    </div>
  );
};

export default ToDoList;


// export default ToDoList;
