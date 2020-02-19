import React, {useState, useEffect} from 'react';

import Modal from '../../../UI/Modal/Modal';
import Backdrop from '../../../UI/Backdrop/Backdrop';

import './CalenderDay.css';

const CalenderDay = (props) => { 
    const [showCalenderDayModal, setShowCalenderDayModal] = useState(false);
    const [isPersonaExit, setPersonaExit] = useState(false);
    const [isAbsence, setAbsence] = useState(false);

    useEffect(() => {
        if(props.initValues?.personalExit){
            setPersonaExit(true);
        }
        if(props.initValues?.absence){
            setAbsence(true);
        }
    }, [setAbsence, setPersonaExit, props.initValues])

    const showDetailsHandler = () => {
        setShowCalenderDayModal(true);
    };

    const closeDetailsHandler = () => {
        setShowCalenderDayModal(false);
    };

    const togglePersonalExitHandler = (day) => {
        if(isPersonaExit && props.initValues?.personalExit){
            props.onCleanPersonaExit(day);
        }
        setPersonaExit(!isPersonaExit)
    } 

    const toggleAbsenceHandler = (day) => {
        if(isAbsence && props.initValues?.absence){
            props.onCleanAbsenceHandler(day);
        }
        setAbsence(!isAbsence)
    } 


    return (
        <React.Fragment>
        {props.day &&
            <React.Fragment>
                <Modal show={showCalenderDayModal} onCancel={showDetailsHandler} contentClass="calenderDay-modal">
                <div className="calenderDay-modal__inputs-wraper">
                        <p>Normalne czas pracy:</p>
                        <input id="normal" type="time" value={props.initValues?.normal || ''} onChange={props.onChangeInput.bind(this, props.day ,'normal')} /> 
                    </div>
                    <div className="calenderDay-modal__inputs-wraper">
                        <p>Godziny pracy:</p>
                        <input id="begin" type="time" value={props.initValues?.begin || ''} onChange={props.onChangeInput.bind(this, props.day ,'begin')}/> 
                        - 
                        <input id="end" type="time" value={props.initValues?.end || ''} onChange={props.onChangeInput.bind(this, props.day ,'end')}/>
                    </div>
                    <div className="calenderDay-modal__inputs-wraper">
                        <p>Nadgodziny:</p>
                        <input id="overtime" type="time" value={props.initValues?.overtime || ''} onChange={props.onChangeInput.bind(this, props.day ,'overtime')} />
                    </div>
                    <div className="calenderDay-modal__inputs-wraper">
                        <input type="checkbox" id="absence" onChange={() => toggleAbsenceHandler(props.day)} checked={isAbsence}/>
                        <label htmlFor="absence"> Nieobecność </label>          
                        <input type="checkbox" id="personalExit" onChange={() => togglePersonalExitHandler(props.day)}  checked={isPersonaExit}/>
                        <label htmlFor="personalExit"> Wyjście w celach osobistych </label>
                        <input type="checkbox" id="holiday" onChange={props.onChangeInput.bind(this, props.day ,'holiday')} checked={props.initValues?.holiday || false}/>
                        <label htmlFor="holiday"> Święto </label>
                    </div>
                    {isPersonaExit &&
                    <div className="calenderDay-modal__inputs-wraper">
                        <p>Godziny wyjścia w celach osobistych:</p>
                        <input id="personalExitBegin" type="time" value={props.initValues?.personalExit?.begin || ''} onChange={props.onChangePersonalExitHandler.bind(this, props.day ,'begin')} /> 
                        - 
                        <input id="personalExitEnd" type="time" value={props.initValues?.personalExit?.end || ''} onChange={props.onChangePersonalExitHandler.bind(this, props.day ,'end')}/>
                    </div>}
                    {isAbsence &&
                    <div className="calenderDay-modal__inputs-wraper">
                         <p>Nieobecność:</p>
                        <select className="calendar-select" id="absenceReason" value={props.initValues?.absence?.reason || ''} onChange={props.onChangeAbsenceHandler.bind(this, props.day ,'reason')} >
                                <option value="">--Wybierz--</option>
                                <option value="1">Urlop wypoczynkowy</option>
                                <option value="2">Zwolnienie lekarskie</option>
                                <option value="3">Urlop okol./opieka</option>
                                <option value="4">Delegacje i szkolenia</option>
                                <option value="5">Inne</option>
                                <option value="6">Nieusprawiedliwiona</option>
                        </select>
                        <input id="absenceTime" type="time" value={props.initValues?.absence?.time || ''} onChange={props.onChangeAbsenceHandler.bind(this, props.day ,'time')}/>
                    </div>}
                </Modal>
                {showCalenderDayModal && <Backdrop onClick={closeDetailsHandler} transparent/>}
            </React.Fragment>
         }
        
        <td className={`calenderDay ${props.day && 'calenderDay--workDay'} ${props.initValues?.holiday && 'calenderDay--holiday'}`} onClick={showDetailsHandler}>
            <span className="calenderDay__number">{props.day ? props.day: ''}</span>
            <div className="calendarDay-content">
               { props.initValues?.normal && <span className="calendarDay-content__work-time calendarDay-content__work-time--normal">{props.initValues.normal}</span>}
               { props.initValues?.begin && <span className="calendarDay-content__work-time calendarDay-content__work-time--workTime">{props.initValues.begin} - {props.initValues.end}</span>}
               { props.initValues?.overtime && <span className="calendarDay-content__work-time calendarDay-content__work-time--overtime">{props.initValues.overtime}</span>}
               { props.initValues?.personalExit && <span className="calendarDay-content__work-time calendarDay-content__work-time--personalExit">{props.initValues.personalExit.begin} - {props.initValues.personalExit.end}</span>}
               { props.initValues?.absence && <span className="calendarDay-content__work-time calendarDay-content__work-time--absence">{props.initValues.absence.time || ''}</span>}
            </div>
        </td>
    </React.Fragment>);
}

export default React.memo(CalenderDay);