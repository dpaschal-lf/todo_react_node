import React from 'react';
import {Link} from 'react-router-dom';


export default props => {
    console.log(props);
    return (
        <Link to={`/details/${props.data.id}`} className="todoListItem">
            <div className="title">{props.data.title}</div>
            <div className="added">{props.data.added}</div>
            <div className="controlArea">
                <input type="checkbox" checked={props.data.completed ==='completed'?'checked':''}/>
            </div>
        </Link>
    )
}