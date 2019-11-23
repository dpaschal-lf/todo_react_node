import React from 'react';
import './TodoApp.css';
import {Switch, Route, Link} from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetails from './TodoDetails';  
import TodoCreate from './TodoCreate';

class TodoApp extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="todoApp">
        <h1>Todo App</h1>
        <div id="nav">
          <Link to="/create">+</Link>
        </div>
        <Switch>
          <Route exact path={['/','/list']} component={TodoList}/ >
          <Route path='/create' component={TodoCreate}/ >
          <Route path='/edit/:id' component={TodoCreate}/ >
          <Route path='/details/:id' component={TodoDetails}/ >
        </Switch>
        <footer>instructions</footer>
      </div>
    );
  }
}

export default TodoApp;
