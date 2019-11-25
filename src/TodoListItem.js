import React from 'react';
import {Link} from 'react-router-dom';
import {getMonth, getDayOfWeek, getOrdinal} from './dateConvert.js';


export default props => {
    const handleCompleteToggle = ( e )=>{
        e.stopPropagation();
        const element = e.target;
        const checkedValue = element.checked ? 'completed' : 'active';
        props.completeUpdateCallback( props.data.id, checkedValue );
    }
    const dateObject = new Date(props.data.added);
    const formattedDate = `${getDayOfWeek(dateObject)}, ${getMonth(dateObject)} ${dateObject.getDate()}${getOrdinal(dateObject.getDate())}, ${dateObject.getFullYear()}`;
    return (
        <Link to={`/details/${props.data.id}`} className="todoListItem row">
            <div className="title col-sm-5">{props.data.title}</div>
            <div className="added col-sm-5">{formattedDate}</div>
            <div className="controlArea col-sm-2">
                <input onClick={handleCompleteToggle} type="checkbox" checked={props.data.completed ==='completed'?'checked':''}/>
            </div>
        </Link>
    )
}