import React from 'react';
import Card from '../Card/Card';

import './Search.css';

const pl = {
    name: 'Imię',
    surname: 'Nazwisko',
    position: 'stanowisko'
}

const Search  = (props) => {

    const searchInputs = props.filters && Object.keys(props.filters).map(filter => {
        return <div key={filter} className="input-wrapper">
            <label htmlFor={filter}>{pl[filter]}</label>
            <input id={filter} value={props.filters[filter]} onChange={props.onChange} />
        </div>
    });

    return <Card className={'search'} title="Wyszukiwarka">
        {searchInputs}
    </Card>
}

export default Search;