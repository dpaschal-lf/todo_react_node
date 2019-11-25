import React from 'react'; 
import TodoListItem from './TodoListItem';
import handleToken from './handleToken';

class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.changeItemComplete = this.changeItemComplete.bind( this );
        this.state = {
            data: []
        };
    }
    componentDidMount(){
        this.loadListData();
    }
    changeItemComplete( id, currentState ){

    }
    loadListData(){
        fetch('http://localhost:5000/api/items',{
            headers: {
                token: localStorage.getItem('userToken')
            }
        })
            .then( res => {
                handleToken( res );
                return res.json();
            } )
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
                : this.state.data.map( data=> <TodoListItem data={data} key={data.id} completeUpdateCallback={this.changeItemComplete}/> )
            }
        </div>)
    }
}

export default TodoList;