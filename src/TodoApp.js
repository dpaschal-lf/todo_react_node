import React from 'react';
import './TodoApp.css';
import {Switch, Route} from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetails from './TodoDetails';  

class TodoApp extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="todoApp">
        <Switch>
          <Route exact path={['/','/list']} component={TodoList}/ >
          <Route path='/create' component={TodoCreate}/ >
          <Route path='/edit/:id' component={TodoCreate}/ >
          <Route path='/details/:id' component={TodoDetails}/ >
        </Switch>
      </div>
    );
  }
}

export default TodoApp;
