// Your code here
function createEmployeeRecord(arr) {
  const record = {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return record;
}






function calculatePayroll(employeeRecords) {
  let totalPayroll = 0;
  employeeRecords.forEach((employee) => {
    totalPayroll += allWagesFor(employee);
  });
  return totalPayroll;
}






function createEmployeeRecords(arr) {
  const records = arr.map(createEmployeeRecord);
  return records;
}


function createTimeInEvent(record, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(hour),
    date,
  };
  record.timeInEvents.push(timeInEvent);
  return record;
}

function createTimeOutEvent(record, dateTimeString) {
  const [date, hour] = dateTimeString.split(" ");
  const timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(hour),
    date,
  };
  record.timeOutEvents.push(timeOutEvent);
  return record;
}


function hoursWorkedOnDate(record, date) {
  const timeInEvent = record.timeInEvents.find((event) => event.date === date);
  const timeOutEvent = record.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}

function wagesEarnedOnDate(record, date) {
  const hoursWorked = hoursWorkedOnDate(record, date);
  const wagesEarned = hoursWorked * record.payPerHour;
  return wagesEarned;
}

function allWagesFor(record) {
  const datesWorked = record.timeInEvents.map((event) => event.date);
  const wages = datesWorked.reduce(
    (total, date) => total + wagesEarnedOnDate(record, date),
    0
  );
  return wages;
}
