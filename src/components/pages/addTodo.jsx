import React, { useState } from 'react';
import { TodosService } from '../../service/todos.service';
import '../scss/addTodo.scss';

const AddTodo = ({ history }) => {
    const initialValues = {
        title: '',
        content: ''
    }
    const [todoData, setTodoData] = useState(initialValues);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setTodoData({...todoData, [name]: value});
    }

    const handleAddTodo = (evt) => {
        evt.preventDefault();
        const formData = {
            title: todoData.title,
            content: todoData.content
        }
        TodosService.onAddTodo(formData)
        .then((results) => {
            history.push('/')
            console.log(results)
        })
        .catch((err) => {
            console.log(err);
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
                        <textarea className="text-input" name="content" value={todoData.content} onChange={handleChange} placeholder="Write your Content here..." rows="4" cols="50"></textarea>
                        <input className="btn-submit" type="submit" value="Add Todo" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddTodo
