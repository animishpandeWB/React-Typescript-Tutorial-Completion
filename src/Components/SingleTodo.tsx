import React, { useRef, useState, useEffect } from 'react';
import { Todo } from '../Models';
import {AiOutlineEdit, AiTwotoneDelete} from 'react-icons/ai';
import {MdOutlineDone} from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
    todo: Todo,
    todos: Todo[],
    key: React.Key,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
    index: number
}

const SingleTodo: React.FC<Props> = ({index, todo, key, todos, setTodos}) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => 
        todo.id === id ? {...todo, isDone: !todo.isDone}: todo
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => 
            todo.id !== id
            )
        );
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => (
            todo.id === id ? 
            {
                ...todo,
                todo: editTodo
            } : todo
        )));

        setEdit(false);
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => 
                (
                    <form 
                        className='todos--single' 
                        onSubmit={(e) => handleEdit(e, todo.id)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {
                            edit ? (
                                <input
                                    ref={inputRef} 
                                    value={editTodo} 
                                    onChange={(e) => setEditTodo(e.target.value)} 
                                    className='todos--single--text' 
                                />
                            ) : todo.isDone ? (
                                <s className="todos--single--text">{todo.todo}</s>
                            ) : (
                                <span className="todos--single--text">{todo.todo}</span>
                            )
                        }
                        <div>
                            <span className='icon' onClick={() => {
                                if(!edit && !todo.isDone) {
                                    setEdit(!edit);
                                    }
                                }
                            }>
                                <AiOutlineEdit />
                            </span>
                            <span className='icon' onClick={() => handleDelete(todo.id)}>
                                <AiTwotoneDelete />
                            </span>
                            <span className='icon' onClick={() => handleDone(todo.id)}>
                                <MdOutlineDone />
                            </span>
                        </div>
                    </form>
                )
            }
        </Draggable>
    )
}

export default SingleTodo;