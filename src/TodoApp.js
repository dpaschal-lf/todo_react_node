import React from 'react';
import logo from './logo.svg';
import './TodoApp.css';
import {Switch, Route} from 'react-router-dom';
import TodoList from 'TodoList';
import TodoListDetails from 'TodoListDetails';

class TodoApp extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div class="todoApp">
        <Switch>
          <Route path="/(/|list)/ component={TodoList}">
        </Switch>
      </div>
    );
  }
}

export default TodoApp;
