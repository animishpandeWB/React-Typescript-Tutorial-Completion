import React, { useState } from 'react';
import './App.css';
import InputField from './Components/InputField';
import TodoList from './Components/TodoList';
import { Todo } from './Models';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// let name: string = "Animish";
// let age: number | string = "21";
// let isStudent: boolean = false;
// let hobbies: string[] = ["Reading", "F1"];
// let role: [number, string] = [5, "SDE"];

// type Person = {
//   name: string;
//   age?: number;
// }

// let person: Person = {
//   name: "Animish",
//   // age: 21
// };

// let lotsOfPersons: Person[];

// function printName(name: string) {
//   console.log(name);
// }

// printName(name);

// let printName : (name: string) => never;
//{todos.map((t) => (
  // <li>{t.todo}</li>
  // ))}

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  
  const [todos, setTodos] = useState<Todo[]>([]);

  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  // console.log(todo);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo) {
      setTodos(
        [...todos, 
          {
            id: Date.now(),
            todo: todo,
            isDone: false
          }
        ]
      );
      setTodo("");
    }
  };

  console.log(todos);

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { source, destination } = result;
    
    if(!destination)
      return;
    
    if(destination.droppableId === source.droppableId && destination.index === source.index)
      return;
    
    let add, active = todos;
    let complete = completedTodos;

    if(source.droppableId === 'TodosList') {
      add = active[source.index];
      active.splice(source.index, 1);
    }else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId === 'TodosList') {
      active.splice(destination.index, 0, add);
    }else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading'>Taskify</span>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleAdd={handleAdd}
        />
        <TodoList 
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
