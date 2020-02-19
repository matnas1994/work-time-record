import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/FormElements/Button';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faBan} from '@fortawesome/free-solid-svg-icons';


import './EmployeeItem.css';

const EmployeeItem = props => {
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    };

    const closeDeleteWarningHandler = () => {
        setShowConfirmModal(false);
    };

    return <React.Fragment>
        <Modal show={showConfirmModal} onCancel={closeDeleteWarningHandler} header={`Czy napewno chcesz usunąć ${props.name} ${props.surname}?`} footer={ 
            <React.Fragment>
                <Button type="button" onClick={closeDeleteWarningHandler} inverse>ANULUJ</Button>
                <Button type="button" onClick={() => { props.onDelete(props.id);  }} danger>USUŃ</Button>
            </React.Fragment>    
        }/>
        <tr>
            <th>{props.lp}</th>
            <th>{props.name}</th>
            <th>{props.surname}</th>
            <th>{props.position}</th>
            <th className="employee-edit">
                 <NavLink to={`/employees/${props.id}`}>
                    <FontAwesomeIcon icon={faAddressCard}/>
                </NavLink>
            </th>
            <th className="employee-delete" onClick={showDeleteWarningHandler}>
                <FontAwesomeIcon icon={faBan}/>
            </th>
        </tr>
    </React.Fragment>
}

export default React.memo(EmployeeItem);