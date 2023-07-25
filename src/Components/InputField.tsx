import React, { useEffect, useRef } from 'react';
import './styles.css';
import {VscSend} from 'react-icons/vsc';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {
    useEffect(() => {
        inputRef.current?.focus();
    }, [todo]);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <form className='input' onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.blur();
            }}>
            <input 
                type='input' 
                placeholder='Enter a task'
                className='input--box'
                value={todo}
                onChange={
                    (e) => setTodo(e.target.value)
                }
                ref={inputRef}
            />
            <button className='input--submit' type='submit'><VscSend /></button>
        </form>
    )
}

export default InputField;