import { auth ,database } from '../Firebase';
export const GET_SCHEDULE = 'get_schedule';
export const SCHEDULE_STATUS = 'schedule_status';
export function getSchedule() {
  return dispatch => {
    dispatch({
      type: SCHEDULE_STATUS,
      payload: true
    });
    database.ref('Schedules').on('value', db => {
      dispatch({
        type: GET_SCHEDULE,
        payload: db.val()
      });
      dispatch({
        type: SCHEDULE_STATUS,
        payload: false
      });
    });
  };
}

export function UploadSchedule(hour_block,WeekA,WeekB,WeekC,date,Group) {
const ScheduleRef = database.ref('Schedules');
const GroupRef = database.ref('Groups').child(Group);
console.log("Here = "+ WeekA);
var shedkey;
if(hour_block === "24"){
  console.log("Here m9");
   const NewSchedule ={
    date:date,
    Group:Group,
    Type:hour_block,
    Monday:{
      A : WeekA.Monday1
    },
    Tuesday:{
        A : WeekA.Tuesday1

    },
    Wednesday:{
        A : WeekA.Wednesday1

    },
    Thursday:{
        A : WeekA.Thursday1

    },
    Friday:{
        A : WeekA.Friday1

    },
    Saturday:{
        A : WeekA.Saturday1

    },
    Sunday:{
        A : WeekA.Sunday1

    }
}
window.alert("Uploaded");
shedkey = ScheduleRef.push(NewSchedule).getKey();
}
if(hour_block === "12"){
  console.log("Here m9");
   const NewSchedule ={
    Date:date,
    Group:Group,
    Type:hour_block,
    Monday:{
        A : WeekA.Monday1,
        B : WeekB.Monday2
    },
    Tuesday:{
    A  :  WeekA.Tuesday1,
    B :   WeekB.Tuesday2

    },
    Wednesday:{
    A :   WeekA.Wednesday1,
    B :   WeekB.Wednesday2

    },
    Thursday:{
    A :   WeekA.Thursday1,
    B :   WeekB.Thursday2

    },
    Friday:{
    A :   WeekA.Friday1,
    B :   WeekB.Friday2
    },
    Saturday:{
    A :  WeekA.Saturday1,
    B :  WeekB.Saturday2
    },
    Sunday:{
  A :   WeekA.Sunday1,
  B :   WeekB.Sunday2
    }
}
window.alert("Uploaded");
shedkey = ScheduleRef.push(NewSchedule).getKey();
}
if(hour_block === "8"){
  console.log("Here m9");
   const NewSchedule ={
    Date:date,
    Group:Group,
    Type:hour_block,
    Monday:{
    A : WeekA.Monday1,
    B : WeekB.Monday2,
    C : WeekC.Monday3
    },
    Tuesday:{
      A : WeekA.Tuesday1,
      B : WeekB.Tuesday2,
      C : WeekC.Tuesday3
    },
    Wednesday:{
      A : WeekA.Wednesday1,
      B : WeekB.Wednesday2,
      C : WeekC.Wednesday3
    },
    Thursday:{
      A : WeekA.Thursday1,
      B : WeekB.Thursday2,
      C : WeekC.Thursday3
    },
    Friday:{
      A : WeekA.Friday1,
      B : WeekB.Friday2,
      C : WeekC.Friday3
    },
    Saturday:{
      A : WeekA.Saturday1,
      B : WeekB.Saturday2,
      C : WeekC.Saturday3
    },
    Sunday:{
      A : WeekA.Sunday1,
      B : WeekB.Sunday2,
      C : WeekC.Sunday3
    }
}
window.alert("Uploaded");
shedkey =ScheduleRef.push(NewSchedule).getKey();
}
const newGroup={
  currentSchedule : shedkey,
}

GroupRef.update(newGroup);
}
