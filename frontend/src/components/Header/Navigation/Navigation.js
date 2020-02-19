import React, {useContext, useState} from 'react';
import Button from '../../UI/FormElements/Button';
import Backdrop from '../../UI/Backdrop/Backdrop';
import {AuthContext} from '../../../context/auth-context';
import './Navigation.css';

const Navigation = (props) => {
    const auth = useContext(AuthContext);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);

    const dropdownTogglerHandler = () => {
        setDropdownIsOpen(prev => !prev);
    }

    return (
            <div className="Navigation">
                {dropdownIsOpen && <Backdrop onClick={dropdownTogglerHandler} transparent/>}
                <div className={`dropdown ${dropdownIsOpen && 'open'}`}>
                    <img onClick={dropdownTogglerHandler} src="https://i.pinimg.com/originals/be/2d/30/be2d307e7f0004d3b014ee1120756a93.png" alt="avatar"/>
                    <div className="dropdown-content">
                        <div className="user-box">
                            <div className="u-avatar">
                                <img src="https://i.pinimg.com/originals/be/2d/30/be2d307e7f0004d3b014ee1120756a93.png" alt="avatar"/>
                            </div>
                            <div className="u-text">
                                <h4>Mateusz Nasiłowski</h4>
                                <p>matnas1994@gmail.com</p>
                            </div>
                        </div>
                        <Button onClick={auth.logout} inverse center>Wyloguj</Button>
                    </div>
                </div>
            </div>
        );
}

export default Navigation;