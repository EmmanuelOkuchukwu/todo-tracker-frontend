import React, { useState } from 'react';
import { TodosService } from '../../service/todos.service';
import '../scss/addTodo.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodo = ({ history }) => {
    const initialValues = {
        title: '',
        content: ''
    }
    const [todoData, setTodoData] = useState(initialValues);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setTodoData({...todoData, [name]: value});
    }

    const handleAddTodo = (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        const formData = {
            title: todoData.title,
            content: todoData.content
        }
        TodosService.onAddTodo(formData)
        .then((results) => {
            history.push('/');
            console.log(results);
            setIsLoading(false);
            toast.dark('Todo added successfully!!');
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
            toast.error('Error creating Todo!');
        })
    }

    return (
        <div className="add-todo-container">
            <div className="add-todos-title">
                <h2>Add todo</h2>
                <i className="fas fa-long-arrow-alt-left fa-3x" onClick={() => history.push('/')} />
            </div>
            <div className="main-background-form">
                <div className="background">
                    <form className="add-todo-form" onSubmit={handleAddTodo}>
                        <h3>Create your Todos</h3>
                        <input className="text-input" type="text" name="title" value={todoData.title} onChange={handleChange} placeholder="Write your Title here..." />
                        <textarea className="text-input" name="content" value={todoData.content} onChange={handleChange} placeholder="Write your Content here..." rows="4" cols="50" />
                        <button className="btn-submit" type="submit" disabled={isLoading}>{!isLoading ? 'Add Todo' : 'Loading...'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTodo
