import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import WorkTimeRecordCalender from "../../components/WorkTimeRecordCalender/WorkTimeRecordCalender";
import { useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import moment from "moment";

import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Button from "../../components/UI/FormElements/Button";
import Card from "../../components/UI/Card/Card";

const wortTimeRecordsReducer = (state, action) => {
  switch (action.type) {
    case "SET_FETCHING_WORK_TIME_RECORD":
      const days = [...state];
      action.fetchedDays.forEach((fetchedDay, id) => {
        days[id] = fetchedDay;
      });
      return days;
    case "CHANGE_DAY_PROPERTY": {
      const days = [...state];
      const indexDay = action.day - 1;
      days[indexDay] = {
        ...days[indexDay],
        [action.name]: action.value || !days[indexDay][action.name]
      };
      return days;
    }
    case "CHANGE_DAY_PERSONALEXIT": {
      const days = [...state];
      const indexDay = action.day - 1;
      const personalExit = {
        ...days[indexDay]["personalExit"],
        [action.name]: action.value
      };
      days[indexDay] = { ...days[indexDay], personalExit };
      return days;
    }
    case "CHANGE_DAY_ABSENCE": {
      const days = [...state];
      const indexDay = action.day - 1;
      const absence = {
        ...days[indexDay]["absence"],
        [action.name]: action.value
      };
      console.log(absence);
      days[indexDay] = { ...days[indexDay], absence };
      return days;
    }
    case "REMOVE_DAY_PROPERTY": {
      const days = [...state];
      const indexDay = action.day - 1;
      const day = days[indexDay];
      delete day[action.name];
      return days;
    }
    default:
      return state;
  }
};

const WorkTimeRecord = props => {
  const { employeeId, date } = useParams();
  const [isLoading, error, sendRequest] = useHttpClient();
  const daysInMoth = moment(date, "YYYY MM DD").daysInMonth();
  const days = [];
  const [workTimeRecords, dispatch] = useReducer(wortTimeRecordsReducer, days);

  useEffect(() => {
    for (let nrDay = 0; nrDay < daysInMoth; nrDay++) {
      days.push({});
    }
  }, [days, daysInMoth]);

  useEffect(() => {
    const fetchWorkTimeRecord = async () => {
      try {
        const response = await sendRequest(
          `http://localhost:5000/api/workTimeRecords/?date=${date}&employeeId=${employeeId}`
        );
        dispatch({
          type: "SET_FETCHING_WORK_TIME_RECORD",
          fetchedDays: response.workTimeRecords.days
        });
        console.log(response);
      } catch (err) {}
    };
    fetchWorkTimeRecord();
  }, [date, employeeId, dispatch, sendRequest]);

  const changeInputHandler = (day, id, event) => {
    if (event.target.type === "time") {
      console.log(event.target.value);
      if (event.target.value) {
        dispatch({
          type: `CHANGE_DAY_PROPERTY`,
          day: day,
          name: id,
          value: event.target.value
        });
      } else {
        dispatch({ type: `REMOVE_DAY_PROPERTY`, day: day, name: id });
      }
    } else {
      dispatch({ type: `CHANGE_DAY_PROPERTY`, day: day, name: id });
    }
  };

  const changePersonalExitHandler = (day, id, event) => {
    dispatch({
      type: `CHANGE_DAY_PERSONALEXIT`,
      day: day,
      name: id,
      value: event.target.value
    });
    console.log(workTimeRecords);
  };

  const cleanPersonaExitHandler = day => {
    dispatch({ type: `REMOVE_DAY_PROPERTY`, day, name: "personalExit" });
  };

  const changeAbsenceHandler = (day, id, event) => {
    dispatch({
      type: `CHANGE_DAY_ABSENCE`,
      day: day,
      name: id,
      value: event.target.value
    });
  };

  const cleanAbsenceHandler = day => {
    dispatch({ type: `REMOVE_DAY_PROPERTY`, day, name: "absence" });
  };

  const saveHandler = async () => {
    try {
      console.log(workTimeRecords);
      const response = await sendRequest(
        `http://localhost:5000/api/workTimeRecords`,
        "POST",
        {
          employeeId,
          date,
          days: workTimeRecords
        }
      );
      console.log("response: ");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {error && error[1] !== 404 && (
        <Card>
          <p>{error}</p>
        </Card>
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && workTimeRecords.length > 0 && (
        <React.Fragment>
          <WorkTimeRecordCalender
            date={date}
            workTimeRecords={workTimeRecords}
            onChangeInputHandler={changeInputHandler}
            changePersonalExitHandler={changePersonalExitHandler}
            cleanPersonaExitHandler={cleanPersonaExitHandler}
            changeAbsenceHandler={changeAbsenceHandler}
            cleanAbsenceHandler={cleanAbsenceHandler}
          />
          <Button onClick={saveHandler} size="big" width="wide" center inverse>
            ZAPISZ
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default WorkTimeRecord;
