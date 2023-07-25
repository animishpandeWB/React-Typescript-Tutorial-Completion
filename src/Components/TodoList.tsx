import React from 'react';
import './styles.css';
import { Todo } from '../Models';
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';


interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos, setCompletedTodos}) => {
    return (
            <div className='container'>
                {/* INSERT TODO LIST */}
                <Droppable droppableId='TodosList'>
                    {
                        (provided, snapshot) => (
                            <div 
                                className={`todo--list ${snapshot.isDraggingOver? 'dragactive': ''}`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}    
                            >
                                <span className='todo--list--heading'>
                                    Active Tasks
                                </span>
                                {
                                    todos.map((todo, index) => (
                                        <SingleTodo 
                                            index={index}
                                            todo={todo}
                                            key={todo.id}
                                            todos={todos}
                                            setTodos={setTodos}
                                        />
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>
                {/* REMOVE TODO LIST */}
                <Droppable droppableId='TodosRemove'>
                    {
                        (provided, snapshot) => (
                            <div 
                                className={`todo--list remove ${
                                    snapshot.isDraggingOver ? 'dragcomplete' : ''
                                }`}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <span className='todo--list--heading'>
                                    Completed Tasks
                                </span>
                                {
                                    completedTodos.map((todo, index) => (
                                        <SingleTodo 
                                            index={index}
                                            todo={todo}
                                            key={todo.id}
                                            todos={completedTodos}
                                            setTodos={setCompletedTodos}
                                        />
                                    ))
                                }
                                
                            </div>
                        )
                    }
                </Droppable>
        </div>
    );
}

export default TodoList;