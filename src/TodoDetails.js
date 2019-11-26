import React from 'react';
import {Link} from 'react-router-dom';
import handleToken from './handleToken';
import Modal from './modal/Modal.js';
import {getMonth, getDayOfWeek, getOrdinal} from './dateConvert.js';

class TodoDetails extends React.Component{
    constructor(props){
        super(props);
        this.hideModal = this.hideModal.bind( this );
        this.confirmDelete = this.confirmDelete.bind( this );
        this.handleDelete = this.handleDelete.bind( this );
        this.edit = this.edit.bind( this );
        this.state ={
            data: {},
            modalMessage: null
        }
    }
    componentDidMount(){
        fetch('/api/items/'+this.props.match.params.id,{
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
        fetch('/api/items/'+this.props.match.params.id,{
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
    edit(){
        this.props.history.push('/edit/' + this.props.match.params.id );
    }
    render(){
        const dateObject = new Date(this.state.data.added);
        const formattedDate = `${getDayOfWeek(dateObject)}, ${getMonth(dateObject)} ${dateObject.getDate()}${getOrdinal(dateObject.getDate())}, ${dateObject.getFullYear()}`;
        return (
            <div className="details justify-content-around">
                <div className="titleControls row text-light bg-dark">
                    <div className="title col-6 h3 align-middle">{this.state.data.title}</div>
                    <div className="controls col-6 form-group">
                        <label className="col-4">Complete:<input value="completed" name="completed" className="completeCheckbox" type="checkbox"/></label>
                        <div className="btn btn-danger col-4" onClick={this.confirmDelete}>Delete</div>
                        <div className="btn col-4 btn-info" onClick={this.edit}><i className="fa fa-edit"></i></div>
                    </div>
                </div>
                <div name="description" className="description blockquote border">{this.state.data.description}</div>
                <div>{formattedDate}</div>
                <Modal closeCallback={this.hideModal} display={this.state.modalMessage!==null}>
                    {this.state.modalMessage}
                </Modal>
            </div>
        );
    }
}

export default TodoDetails;