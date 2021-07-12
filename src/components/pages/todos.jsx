import React, { useState, useEffect } from 'react'
import { TodosService } from '../../service/todos.service';
import '../scss/todo.scss';
import moment from 'moment';

const Todos = ({ history }) => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        TodosService.getTodos()
        .then((results) => {
            console.log(results);
            setTodos(results);
            setIsLoading(true);
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }, [])

    const handleDelete = (id) => {
        TodosService.onDeleteTodo(id)
        .then((results) => {
            console.log('Removed Todo!!', results);
            const remove = todos?.todos?.filter(todo => {
                return todo._id !== id
            })
            setTodos(remove);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="todos-container">
            <div className="todos-title">
                <h2>Todo lists</h2>
                <i className="fas fa-plus-square fa-3x" onClick={()=> history.push('addtodo')} />
            </div>
            <div className="todos-list">
                {isLoading ? 
                    <div className="flex-container">
                        {todos?.todos?.length > 0 ? todos?.todos.map(todo => (
                            <div className="card" key={todo._id}>
                                <div className="card-header">
                                    {todo.title}
                                    <div className="update-delete-section">
                                        <i className="fas fa-trash" onClick={() => handleDelete(todo._id)} />
                                        <i className="far fa-edit" onClick={() => history.push(`/updatetodo/${todo._id}`)}/>
                                    </div>
                                </div>
                                <div className="card-body">
                                    {todo.content}<br />
                                    Posted at {moment (todo.createdAt).format('MMMM Do YYYY')}
                                </div>
                            </div>
                        )): 
                            <div className="card-error">
                                <p>Nothing recorded</p>
                            </div>
                        }
                    </div> : 
                    <div>
                        <h4>Data is Loading...</h4>
                    </div>   
                }
            </div>
        </div>
    )
}

export default Todos
