import React from 'react';

import moment from 'moment';

import CalenderWeek from './CalendarWeek/CalendarWeek';

import Card from '../UI/Card/Card';

import './WorkTimeRecordCalender.css';

const WorkTimeRecordCalender = (props) => {
    const firstMonthDay = moment(props.date, "YYYY MM DD").startOf('month').isoWeekday();
    const lastMonthDay = moment(props.date, "YYYY MM DD").endOf('month').isoWeekday();
    const dayInMoth = moment(props.date, "YYYY MM DD").daysInMonth();
    const weekInMonth = Math.ceil(dayInMoth / 7);
    const currMonthName  = moment(props.date, "YYYY MM DD").format('MMMM');
    const weekDaysNames = moment.weekdays();
    let calenderWeeks = [];

    for (let week = 0; week < weekInMonth;  week++) {
        calenderWeeks.push(<CalenderWeek 
            key={week} 
            week={week} 
            workTimeRecords={props.workTimeRecords} 
            weekInMonth={weekInMonth} 
            lastMonthDay={lastMonthDay} 
            firstMonthDay={firstMonthDay} 
            onChangeInputHandler={props.onChangeInputHandler} 
            changePersonalExitHandler={props.changePersonalExitHandler} 
            cleanPersonaExitHandler={props.cleanPersonaExitHandler}
            changeAbsenceHandler={props.changeAbsenceHandler}
            cleanAbsenceHandler={props.cleanAbsenceHandler}/>
            ); 
    }



    return <Card title="Ewidencja czasu pracy">
      <h1 className="workTimeRecordCalender-date">{currMonthName.toUpperCase()} {props.date.split('-')[0]}</h1>
      <table className="workTimeRecordCalender">
            <thead className="workTimeRecordCalender-header">
                <tr>
                    <th className="workTimeRecordCalender-header__day">{weekDaysNames[1]}</th>
                    <th className="workTimeRecordCalender-header__day">{weekDaysNames[2]}</th>
                    <th className="workTimeRecordCalender-header__day">{weekDaysNames[3]}</th>
                    <th className="workTimeRecordCalender-header__day">{weekDaysNames[4]}</th>
                    <th className="workTimeRecordCalender-header__day">{weekDaysNames[5]}</th>
                    <th className="workTimeRecordCalender-header__day">{weekDaysNames[6]}</th>
                    <th className="workTimeRecordCalender-header__day">{weekDaysNames[0]}</th>
                </tr> 
            </thead>
            <tbody>
                {calenderWeeks}
            </tbody>
        </table>
    </Card>
}

export default React.memo(WorkTimeRecordCalender);