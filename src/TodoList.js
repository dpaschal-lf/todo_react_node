import React from 'react'; 
import TodoListItem from './TodoListItem';

class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        };
    }
    componentDidMount(){
        fetch('http://localhost:5000/api/items')
            .then( res => res.json() )
            .then( data => {
                this.setState({
                    data
                });
            })
    }
    render(){
        return(<div>
            { !this.state.data.length 
                ? 'no data available' 
                : this.state.data.map( data=> <TodoListItem data={data} key={data.id}/> )
            }
        </div>)
    }
}

export default TodoList;