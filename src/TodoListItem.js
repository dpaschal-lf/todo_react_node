import React from 'react';


export default props => {
    console.log(props);
    return (
        <div className="todoListItem">
            <div className="title">{props.data.title}</div>
            <div className="added">{props.data.added}</div>
            <div className="controlArea">
                <input type="checkbox" checked={props.data.completed ==='completed'?'checked':''}/>
            </div>
        </div>
    )
}