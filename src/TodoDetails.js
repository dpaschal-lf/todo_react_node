import React from 'react';
import {Link} from 'react-router-dom';
import handleToken from './handleToken';

class TodoDetails extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data: {}
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/api/items/'+this.props.match.params.id,{
            headers: {
                token: localStorage.getItem('userToken')
            }
        })
            .then( res => {
                handleToken( res );
                return res.json();
             })
            .then( data => {
                console.log("got it!", data);
                this.setState({
                    data
                });
            })
    }
    handleDelete(){
        fetch('http://localhost:5000/api/items/'+this.props.match.params.id,{
            method:'DELETE',
            headers: {
                token: localStorage.getItem('userToken')
            }
        })
        .then( (res)=>{
            handleToken( res );
            this.props.history.push('/list');
        } )

    }
    render(){
        return (
            <div className="details">
                <div className="titleControls">
                    <div className="title">{this.state.data.title}</div>
                    <div className="controls">
                        <input value="completed" name="completed" className="completeCheckbox updatable" type="checkbox"/>
                        <div className="delete button">Delete</div>
                    </div>
                </div>
                <div name="description" className="description">{this.state.data.description}</div>
                <input type="datetime-local" name="added" className="added" value={this.state.data.added}/>
            </div>
        );
    }
}

export default TodoDetails;