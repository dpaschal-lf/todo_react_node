import React from 'react';
import handleToken from './handleToken';

class TodoCreate extends React.Component{
    constructor(props){
        super(props);
        this.updateFormElement= this.updateFormElement.bind( this );
        this.saveItem = this.saveItem.bind( this );
        this.cancelItem = this.cancelItem.bind( this );
        this.state = {
            form: {
                title: '',
                description: ''
            },
            edit: false
        }
    }
    componentDidMount(){
        if(this.props.match.params.id){
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
                this.setState({
                    form:{
                        title: data.title,
                        description: data.description,
                        completed: data.completed
                    },
                    edit: true
                });
            })
        }
    }
    updateFormElement(e){
        const target = e.target;
        const name = target.getAttribute('name');
        const value = target.value;
        const form = {...this.state.form};
        form[name] = value;
        this.setState( {
            form
        });
    }
    cancelItem(){
        this.props.history.push('/list');
    }
    saveItem(){
        if(this.state.edit){
            this.putItem();
        } else {
            this.postItem();
        }
    }
    postItem(){
        fetch('http://localhost:5000/api/items/',{
            method:'POST',
            body: JSON.stringify( this.state.form ),
            headers: {
                token: localStorage.getItem('userToken'),
                'Content-Type': 'application/json',
            }
        })
        .then( (res)=>{
            handleToken( res );
            this.props.history.push('/list');
        } )        
    }
    putItem(){
        fetch('http://localhost:5000/api/items/'+this.props.match.params.id,{
            method:'PUT',
            body: JSON.stringify( this.state.form ),
            headers: {
                token: localStorage.getItem('userToken'),
                'Content-Type': 'application/json',
            }
        })
        .then( (res)=>{
            handleToken( res );
            this.props.history.push('/list');
        } )        
    }
    render(){
        if(this.state.edit){
            return (
                <div className="edit">
                    <input onChange={this.updateFormElement} type="text" name="title" value={this.state.form.title} className="title" placeholder="title"/>
                    <input onChange={this.updateFormElement} type="text" name="description" value={this.state.form.description} className="description" placeholder='description'/>
                    <label className="col-4">Complete:<input value="completed" name="completed" className="completeCheckbox" type="checkbox"/></label>
                    <div onClick={this.saveItem} className="button saveButton">save</div>
                    <div onClick={this.cancelItem} className="cancelButton button">cancel</div>            
                </div>  
            );
        } else {
            return(
                <div className="create">
                    <input onChange={this.updateFormElement} type="text" name="title" value={this.state.form.title} className="title" placeholder="title"/>
                    <input onChange={this.updateFormElement} type="text" name="description" value={this.state.form.description} className="description" placeholder='description'/>
                    <div onClick={this.saveItem} className="button saveButton">save</div>
                    <div onClick={this.cancelItem} className="cancelButton button">cancel</div>            
                </div>            
            );
        }

    }
}

export default TodoCreate;