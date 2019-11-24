import React from 'react';
import {Link} from 'react-router-dom';
import handleToken from './handleToken';
import Modal from './modal/Modal.js';

class TodoDetails extends React.Component{
    constructor(props){
        super(props);
        this.hideModal = this.hideModal.bind( this );
        this.confirmDelete = this.confirmDelete.bind( this );
        this.handleDelete = this.handleDelete.bind( this );
        this.state ={
            data: {},
            modalMessage: null
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
    hideModal(){
        this.setState({
            modalMessage: null
        })
    }
    confirmDelete(){
        this.setState({
            modalMessage: <React.Fragment>
                You are about to delete <em>{this.state.data.title}</em>
                <p>Are you sure?</p>
                <span className="button" onClick={this.handleDelete}>Delete</span><span onClick={this.hideModal} className="button">Cancel</span>
            </React.Fragment>
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
            <div className="details justify-content-around">
                <div className="titleControls row text-light bg-dark">
                    <div className="title col-8 h3 align-middle">{this.state.data.title}</div>
                    <div className="controls col-4 form-group">
                        <label className="col-6">Complete:<input value="completed" name="completed" className="completeCheckbox" type="checkbox"/></label>
                        <div className="btn btn-danger col-offset-2 col-4" onClick={this.confirmDelete}>Delete</div>
                    </div>
                </div>
                <div name="description" className="description blockquote border">{this.state.data.description}</div>
                <input type="datetime-local" name="added" className="added" value={this.state.data.added}/>
                <Modal closeCallback={this.hideModal} display={this.state.modalMessage!==null}>
                    {this.state.modalMessage}
                </Modal>
            </div>
        );
    }
}

export default TodoDetails;