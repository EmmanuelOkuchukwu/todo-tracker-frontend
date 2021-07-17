import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function getTodos() {
    return axios.get(`${API_URL}/gettodos`)
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        console.error(err);
    })
}

function getTodoId(id) {
    return axios.get(`${API_URL}/gettodos/${id}`)
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        console.error(err);
    })
}

function onAddTodo(todoData) {
    return axios.post(`${API_URL}/createtodos`, todoData, {
        headers: { 
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        console.log(err);
    })
}

function onDeleteTodo(id) {
    return axios.delete(`${API_URL}/removetodo/${id}`, {
        headers: {
            'Accept': 'application/json'
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        console.log(err);
    })
}

function onUpdateTodo(id, formData) {
    return axios.put(`${API_URL}/updatetodo/${id}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        return response.data
    })
    .catch((err) => {
        console.log(err)
    })
}

export const TodosService = {
    getTodos,
    getTodoId,
    onAddTodo,
    onDeleteTodo,
    onUpdateTodo
}