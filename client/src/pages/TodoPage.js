import React, { useState, useEffect } from "react";
import TodoList from "../components/TodoList/TodoList";
import { getTasks, createTask } from "../api/taskApi";
import TodoForm from "../components/TodoForm/TodoForm";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTasks()
      .then((result) => {
        setTodos(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getNewTd = (data) => {
    createTask({
      status: "new",
      ...data,
    })
      .then(({ data: createdTask }) => {
        const newTodo = [...todos, createdTask];
        setTodos(newTodo);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h1>TodoPage</h1>
      <TodoForm sendData={getNewTd} />
      <TodoList todos={todos} />
    </>
  );
};

export default TodoPage;
