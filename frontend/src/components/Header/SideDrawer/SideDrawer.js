import React from 'react';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClock} from '@fortawesome/free-solid-svg-icons';
import './SideDrawer.css';

const SideDrawer = (props) => (
    <React.Fragment>
        <input type="checkbox" id="sideDrawerToggler"/>
        <div className="sideDrawer">
            <div className="sideDrawer__header">
                <div className="sideDrawer__logo">
                    <FontAwesomeIcon icon={faClock}/>
                    <h1>Ewidencja</h1>
                </div>
                <label htmlFor="sideDrawerToggler" className="sideDrawer-toggle">
                    <span className="sideDrawer-toggle__icon"></span>
                </label>
            </div>
            <ul className="nav">
                <li className="nav-item">
                    <a href="http://google.pl" className="nav-item__link">
                        <FontAwesomeIcon icon={faUsers}/>
                        <p>Pracownicy</p>
                        <span className="caret"></span>
                    </a>
                    <ul className="nav-submenu">
                        <li>
                            <NavLink to="/">Lista</NavLink>
                        </li>
                        <li>
                            <NavLink to="/employees/new">Dodaj</NavLink>
                        </li> 
                    </ul>
                </li>
            </ul>
        </div>
    </React.Fragment>
);

export default SideDrawer;