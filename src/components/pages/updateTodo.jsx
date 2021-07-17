import React, { useState, useEffect } from 'react';
import '../scss/updateTodo.scss';
import { useParams } from 'react-router-dom';
import { TodosService } from '../../service/todos.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTodo = ({ history }) => {
    const [isLoading, setIsLoading] = useState(false);
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

    const { id } = useParams();
   const handleUpdateTodo = (evt) => {
       evt.preventDefault();
       setIsLoading(true);
       const formData = {
           title: todoData.title,
           content: todoData.content
       }
       TodosService.onUpdateTodo(id, formData)
           .then((results) => {
               toast.dark('Successfully updated Todo');
               console.log(results);
               setIsLoading(false);
               setTodo(results);
           })
           .catch((error) => {
               console.log(error);
               setIsLoading(false);
           })
   }

    console.log('todo object: ', todo);

    useEffect(() => {
        return getTodo(id);
    }, [id])

    const getTodo = (id) => {
        TodosService.getTodoId(id)
            .then((results) => {
                console.log(results);
                setTodo(results);
            })
            .catch((err) => {
                console.log(err);
            })
    }
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
                            <input className="text-input" type="text" name="title" value={todo?.title} onChange={handleChange} placeholder={todo?.doc?.title} />
                            <textarea className="text-input" name="content" value={todo?.content} onChange={handleChange} placeholder={todo?.doc?.content} rows="4" cols="50" />
                            <button className="btn-submit" type="submit" disabled={isLoading}>{isLoading ? 'Updating...' : 'Update Todo'}</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
             />
        </div>
    )
}

export default UpdateTodo
