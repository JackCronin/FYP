import { auth ,database } from '../Firebase';
export const GET_SCHEDULE = 'get_schedule';
export const SCHEDULE_STATUS = 'schedule_status';
//get shedule object from firebase database
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
//get previous schedule and set that as current schedule 
export function UploadScheduleFromPrev(dates,nodeToCopy) {
  var Monday= {}
  var Tuesday= {}
  var Wednesday= {}
  var Thursday= {}
  var Friday= {}
  var Saturday= {}
  var Sunday= {}
  var date= dates;
  var type;
  var group;
  const newSchedRef = database.ref('Schedules');
  const ScheduleRef = database.ref('Schedules').child(nodeToCopy).once('value')
  .then(snap => {
          Monday = (snap.val().Monday);
          Tuesday =(snap.val().Tuesday);
          Wednesday= (snap.val().Wednesday);
          Thursday =(snap.val().Thursday);
          Friday =(snap.val().Friday);
          Saturday =(snap.val().Saturday);
          Sunday =(snap.val().Sunday);
          type = snap.val().Type
          group = snap.val().Group;
          const GroupRef = database.ref('Groups').child(group);
          const NewSched = {
            date_of_upload:date,
            Group:group,
            Type:type,
            Monday,
            Tuesday,
            Wednesday,
            Thursday,
            Friday,
            Saturday,
            Sunday
        }
        var shedkey =newSchedRef.push(NewSched).getKey();
        const newGroup={
          currentSchedule : shedkey,
        }

        GroupRef.update(newGroup);
    })

}
//upload a new schedule to firebase database 
export function UploadSchedule(hour_block,WeekA,WeekB,WeekC,date,Group) {
const ScheduleRef = database.ref('Schedules');
const GroupRef = database.ref('Groups').child(Group);
console.log("Here = "+ WeekA);
var shedkey;
if(hour_block === "24"){
  console.log("Here m9");
   const NewSchedule ={
    date_of_upload:date,
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
    date_of_upload:date,
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
    date_of_upload:date,
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
