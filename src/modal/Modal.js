import {React} from 'react';
import 'modal.css';

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.close = this.close.bind(this);
        this.state ={
            data: {},
            display: this.props.display === undefined ? false : this.props.display
        }
    }
    componentDidUpdate( oldProps, oldState ){
        if(oldProps.display === this.props.display){
            this.setState({
                display: this.props.display
            })
        }
    }
    close(){
        this.props.closeCallback();
        this.setState({
            display: false
        })
    }
    render(){
        return(
            <div className="modal shadow" style={{display: this.props.display ? 'black' : 'none' }}>
                <div className="body">
                    <div className="close" onClick={this.close}>X</div>
                    <div className="content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}

export default Modal;