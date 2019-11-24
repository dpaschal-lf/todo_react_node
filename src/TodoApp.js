import React from 'react';
import './TodoApp.css';
import {Switch, Route, Link, withRouter} from 'react-router-dom';
import TodoList from './TodoList';
import TodoDetails from './TodoDetails';  
import TodoCreate from './TodoCreate';

class TodoApp extends React.Component{
  constructor(props){
    super(props);
    this.menu = {
      'list' : [
        <Link className="navLink btn btn-success" key='create' to="/create">+</Link>
      ],
      'create': [
        <Link className="navLink btn btn-primary" key='list' to="/list">Back</Link>
      ],
      'details': [
        <Link className="navLink btn btn-primary" key='list' to="/list">Back</Link>,
      ]
    }
    this.menu[''] = this.menu['list']
  }
  render(){
    const pathParts = this.props.location.pathname.split('/');
    console.log( "path: ", this.props.location.pathname)
    const currentMenu = this.menu[ pathParts[1] ];
    return(
      <div className="todoApp">
        <h1>Todo App</h1>
        <div id="nav">
          { currentMenu }
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

export default withRouter(TodoApp);
