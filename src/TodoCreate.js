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
                <div className="create-edit edit">
                    <div className='row'>
                        <div className="form-group col-8">
                            <input onChange={this.updateFormElement} type="text" name="title" value={this.state.form.title} className="title form-control" placeholder="title"/>
                        </div>
                        <div className="form-group col-2">
                            <input id="completedCheckBox" value="completed" name="completed" className="completeCheckbox form-check-input col-4" type="checkbox"/>
                            <label for="completedCheckbox" className="col-8 form-check-label">Complete</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-8">
                            <textarea onChange={this.updateFormElement} name="description" value={this.state.form.description} className="description form-control" placeholder='description'></textarea>
                        </div>   
                        <div className="form-group col-4">
                            <div onClick={this.saveItem} className="btn btn-success saveButton">save</div>
                            <div onClick={this.cancelItem} className="cancelButton btn btn-warning">cancel</div> 
                        </div>        
                    </div>
                </div>
            );
        } else {
            return(
                <div className="create-edit create">
                    <div className='row'>
                        <div className="form-group col-12">
                            <input onChange={this.updateFormElement} type="text" name="title" value={this.state.form.title} className="title form-control" placeholder="title"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-8">
                            <textarea onChange={this.updateFormElement} name="description" value={this.state.form.description} className="description form-control" placeholder='description'></textarea>
                        </div>   
                        <div className="form-group col-4">
                            <div onClick={this.saveItem} className="btn btn-success saveButton">save</div>
                            <div onClick={this.cancelItem} className="cancelButton btn btn-warning">cancel</div> 
                        </div>        
                    </div>     
                </div>            
            );
        }

    }
}

export default TodoCreate;