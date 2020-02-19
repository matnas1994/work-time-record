import React from 'react';

import './Paginator.css';

const Paginator = props => {
    let pageItems = [];

    for(let item = 1; item <= props.numberOfpages; item++){
        pageItems.push(
        <li key={item} className={`paginator_item ${item === props.currentPage ? 'active': null }`} onClick={() => props.onChangePage(item)}>
            <p>{item}</p>
        </li>
        );
    }

    return (
        <ul className={`paginator ${props.className}`}>
            <li className={'paginator_item paginator_item--previous'} onClick={props.onPrevPage}>
                <p>Poprzednia</p>
            </li>
            {pageItems}
            <li className={'paginator_item paginator_item--next'}   onClick={props.onNextPage}>
                <p>Nastepna</p>
            </li>
        </ul>
    )
}

export default Paginator;