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
    changeItemComplete( id, completed ){
        fetch('/api/items/'+id,{
            method:'PUT',
            body: JSON.stringify( {
                id,
                completed
            } ),
            headers: {
                token: localStorage.getItem('userToken'),
                'Content-Type': 'application/json',
            }
        })
        .then( (res)=>{
            handleToken( res );
            this.loadListData();
        } )              
    }
    loadListData(){
        fetch('/api/items',{
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