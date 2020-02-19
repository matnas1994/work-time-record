import React from "react";

import CalenderDay from "./CalenderDay/CalenderDay";

const CalenderWeek = props => {
  const emptyDaysInFirstWeek = 7 - props.firstMonthDay + 1;
  const startDay = emptyDaysInFirstWeek + (props.week - 1) * 7;
  let days = [];

  if (props.week === 0) {
    for (let day = 1; day < props.firstMonthDay; day++) {
      days.push(
        <CalenderDay
          key={day + Math.random()}
          onChangeInput={props.onChangeInputHandler}
          onChangePersonalExitHandler={props.changePersonalExitHandler}
          onCleanPersonaExit={props.cleanPersonaExitHandler}
          onChangeAbsenceHandler={props.changeAbsenceHandler}
          onCleanAbsenceHandler={props.cleanAbsenceHandler}/>
      );
    }
    for (let day = 1; day <= emptyDaysInFirstWeek; day++) {
      days.push(
        <CalenderDay
          initValues={props.workTimeRecords[day - 1]}
          key={day}
          day={day}
          onChangeInput={props.onChangeInputHandler}
          onChangePersonalExitHandler={props.changePersonalExitHandler}
          onCleanPersonaExit={props.cleanPersonaExitHandler}
          onChangeAbsenceHandler={props.changeAbsenceHandler}
          onCleanAbsenceHandler={props.cleanAbsenceHandler}
        />
      );
    }
  } else if (props.week === props.weekInMonth - 1) {
    for (let day = 1; day <= props.lastMonthDay; day++) {
      const currentDay = day + startDay;
      days.push(
        <CalenderDay
          initValues={props.workTimeRecords[currentDay - 1]}
          key={currentDay}
          day={currentDay}
          onChangeInput={props.onChangeInputHandler}
          onChangePersonalExitHandler={props.changePersonalExitHandler}
          onCleanPersonaExit={props.cleanPersonaExitHandler}
          onChangeAbsenceHandler={props.changeAbsenceHandler}
          onCleanAbsenceHandler={props.cleanAbsenceHandler}
        />
      );
    }
    for (let day = 1; day < 7 - props.lastMonthDay + 1; day++) {
      days.push(
        <CalenderDay
          key={day}
          onChangeInput={props.onChangeInputHandler}
          onChangePersonalExitHandler={props.changePersonalExitHandler}
          onCleanPersonaExit={props.cleanPersonaExitHandler}
          onChangeAbsenceHandler={props.changeAbsenceHandler}
          onCleanAbsenceHandler={props.cleanAbsenceHandler}
        />
      );
    }
  } else {
    for (let day = 1; day <= 7; day++) {
      const currentDay = day + startDay;
      days.push(
        <CalenderDay
          initValues={props.workTimeRecords[currentDay - 1]}
          key={currentDay}
          day={currentDay}
          onChangeInput={props.onChangeInputHandler}
          onChangePersonalExitHandler={props.changePersonalExitHandler}
          onCleanPersonaExit={props.cleanPersonaExitHandler}
          onChangeAbsenceHandler={props.changeAbsenceHandler}
          onCleanAbsenceHandler={props.cleanAbsenceHandler}
        />
      );
    }
  }

  return <tr>{days}</tr>;
};

export default React.memo(CalenderWeek);
