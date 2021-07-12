import React from 'react';
import './components/scss/App.scss';
import Navbar from './components/layout/navbar';
import { Switch, Route, useHistory } from 'react-router-dom';
import Todo from './components/pages/todos';
import AddTodo from './components/pages/addTodo';
import UpdateTodo from './components/pages/updateTodo';

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <Navbar />
      <Switch history={history}>
        <Route exact path="/" component={Todo} />
        <Route path="/addtodo" component={AddTodo} />
        <Route path="/updatetodo/:id" component={UpdateTodo} />
      </Switch>
    </div>
  );
}

export default App;
