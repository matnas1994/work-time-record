import React from 'react';

import './Card.css';

const Card = props => {
    return <div className={`card `+ props.className} style={props.style}>
            {props.title &&<div className='card-header'>
                <h2 className='card-title'>{props.title}</h2>
            </div> }
            <div className='card-body'>
                {props.children}
            </div>
        </div>
}

export default Card;