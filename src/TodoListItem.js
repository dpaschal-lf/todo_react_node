import React from 'react';
import {Link} from 'react-router-dom';


export default props => {
    console.log(props);
    return (
        <Link to={`/details/${props.data.id}`} className="todoListItem row">
            <div className="title col-sm-5">{props.data.title}</div>
            <div className="added col-sm-5">{props.data.added}</div>
            <div className="controlArea col-sm-2">
                <input type="checkbox" checked={props.data.completed ==='completed'?'checked':''}/>
            </div>
        </Link>
    )
}