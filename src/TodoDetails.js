import React from 'react';


class TodoDetails extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data: {}
        }
    }
    componentDidMount(){
        fetch('http://localhost:5000/api/items/'+this.props.match.params.id)
            .then( res => res.json() )
            .then( data => {
                this.setState({
                    data
                });
            })
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
                <div className="updateControls hidden">
                        <div className="saveButton button">save</div>
                        <div className="cancelButton button">cancel</div>
                </div>
            </div>
        );
    }
}

export default TodoDetails;