import React from 'react'; 

class TodoList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        console.log('loaded');
    }
    render(){
        return(<div>list</div>)
    }
}

export default TodoList;