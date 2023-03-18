// let testEmployee = createEmployeeRecord(["Gray", "Worm", "Security", 1])
//         expect(testEmployee.firstName).to.eq("Gray")


let employeeRecords = {}

let createEmployeeRecord = function(employeeArray){
  // let name = `${employeeArray[0]}_${employeeArray[1]}`
  return {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(arrays){
    return arrays.map(function(array){
      return createEmployeeRecord(array)
    })
  }

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, soughtDate){
    let inEvent = employee.timeInEvents.find(function(e){
        return e.date === soughtDate
    })
    let outEvent = employee.timeOutEvents.find(function(e){
        return e.date === soughtDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, soughtDate){
    let hours = hoursWorkedOnDate(employee, soughtDate)
    return hours * employee.payPerHour
}

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payable = eligibleDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return payable
}

let calculatePayroll = function(arrays){
    return arrays.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}
