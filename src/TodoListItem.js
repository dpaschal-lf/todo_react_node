import React from 'react';
import {Link} from 'react-router-dom';


export default props => {
    const handleCompleteToggle = ( e )=>{
        e.stopPropagation();
        const element = e.target;
        const checkedValue = element.checked ? 'checked' : 'active';
        this.props.completeUpdateCallback( props.data.id, checkedValue );
    }
    return (
        <Link to={`/details/${props.data.id}`} className="todoListItem row">
            <div className="title col-sm-5">{props.data.title}</div>
            <div className="added col-sm-5">{props.data.added}</div>
            <div className="controlArea col-sm-2">
                <input onClick={handleCompleteToggle} type="checkbox" checked={props.data.completed ==='completed'?'checked':''}/>
            </div>
        </Link>
    )
}