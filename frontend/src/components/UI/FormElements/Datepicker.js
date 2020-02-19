import React,  { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';

import './Datepicker.css';

const monthName = {
    1: 'Styczeń',
    2: 'Luty',
    3: 'Marzec',
    4: 'Kwiecień',
    5: 'Maj',
    6: 'Czerwiec',
    7: 'Lipiec',
    8: 'Sierpień',
    9: 'Wrzesień',
    10 : 'Październik',
    11 : 'Listopad',
    12 : 'Grudzień'
}

const Datepicker = (props) => {
    const [dateMonth, setDateMonth] = useState();
    const [dateYears, setDateYears] = useState(2020);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const togglerCalenderEl = useRef();

    const nextYearsHandler = () => {
        setDateYears(prev => prev + 1);
    }

    const prevYearsHandler = () => {
        setDateYears(prev => prev - 1);
    }

    const chooseMonthHandler = (numberMonth) => {
        setDateMonth(numberMonth);
        props.onDate(numberMonth, dateYears);
        togglerCalenderEl.current.click();
    }

    const calenderMonth = [];

    for (const month in monthName) {
        calenderMonth.push(<i key={month} className={`calendar__month ${currentMonth === (+month - 1)  && currentYear === dateYears && 'calendar__month--now'}`} onClick={() => chooseMonthHandler(month)}>{monthName[month]}</i>);
    }

    return <div className="date-picker">
        <label htmlFor="calendar" className="calendar-toggler" ref={togglerCalenderEl} >
               <FontAwesomeIcon icon={faCalendarAlt}/>
        </label>
        <input id="calendar" className="calendar-checkbox" type="checkbox" />
        <div className="calender">
            <div className="calendar__month-nav">
                <button className="calendar__switcher" onClick={prevYearsHandler}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>
                        <span className="calendar__year-name">{dateYears}</span>
                <button className="calendar__switcher" onClick={nextYearsHandler}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
            <div className="calendar__month-wrapper">
                {calenderMonth}
            </div>
        </div>
        <span className="date">{dateMonth ? `${monthName[dateMonth]} ${dateYears}` : "Wybierz date"}</span>
    </div>
} 

export default React.memo(Datepicker);