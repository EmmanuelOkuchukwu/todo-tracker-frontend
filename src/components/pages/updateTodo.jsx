import React, { useState, useEffect } from 'react';
import '../scss/updateTodo.scss';
import { useParams } from 'react-router-dom';
import { TodosService } from '../../service/todos.service';

const UpdateTodo = ({ history }) => {
    let { id } = useParams();
    const initialValues = {
        title: '',
        content: ''
    }
    const [todoData, setTodoData] = useState(initialValues);
    const [todo, setTodo] = useState({});

    const handleChange = evt => {
        const { name, value } = evt.target;
        setTodoData({...todoData, [name]: value});
    }

    const handleUpdateTodo = () => {
        const formData = {
            title: todoData.title,
            content: todoData.content
        }
        TodosService.onUpdateTodo(id, formData)
        .then((results) => {
            console.log(results)
            setTodoData(results)
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        TodosService.getTodoId(id)
        .then((results) => {
            console.log(results)
            setTodo(results)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div>
            <div className="update-todo-container">
                <div className="update-todos-title">
                    <h2>Update todo</h2>
                    <i className="fas fa-long-arrow-alt-left fa-3x" onClick={() => history.push('/')} />
                </div>
                <div className="main-background-form">
                    <div className="background">
                        <form className="update-todo-form" onSubmit={handleUpdateTodo}>
                            <h3>Update your Todos</h3>
                            <input className="text-input" type="text" name="title" value={todoData.title} onChange={handleChange} placeholder="Write your Title here..." />
                            <textarea className="text-input" name="content" value={todoData.content} onChange={handleChange} placeholder="Write your Content here..." rows="4" cols="50"></textarea>
                            <input className="btn-submit" type="submit" value="Update Todo" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTodo
