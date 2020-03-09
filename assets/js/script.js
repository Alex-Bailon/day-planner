$(document).ready(function(){
let today = moment().format('dddd, MMMM Do') //sets todays date into a var
$('#currentDay').text(today); //display todays date on webpage
let todayStored = moment().format('dddd, MMMM Do') //stores todays date into a different var to be able to check if its a new date
initDate() //if there is a date in local storage will replace todays date with whatever is in local storage
//var for all business hours with no events.
let hoursArray = [
    {
        hour: '9AM',
        timeEvent: 'No Event'
    },
    {
        hour: '10AM',
        timeEvent: 'No Event'
    },
    {
        hour: '11AM',
        timeEvent: 'No Event'
    },
    {
        hour: '12PM',
        timeEvent: 'No Event'
    },
    {
        hour: '1PM',
        timeEvent: 'No Event'
    },
    {
        hour: '2PM',
        timeEvent: 'No Event'
    },
    {
        hour: '3PM',
        timeEvent: 'No Event'
    },
    {
        hour: '4PM',
        timeEvent: 'No Event'
    },
    {
        hour: '5PM',
        timeEvent: 'No Event'
    }
]

let hours = hoursArray
// checks to see if today and todayStored are the same date, if so it will check if there is anything in local storage for hours array
if (today == todayStored){
    init()
    localStorage.setItem('todayStored', JSON.stringify(todayStored))   
}
// else means that its a new date so it will reset the hours array to start a new day.
else{
    hours = hoursArray
    todayStored = today
    localStorage.setItem('todayStored', JSON.stringify(todayStored))
    localStorage.setItem('hours', JSON.stringify(hours))
}

let h = 9 //var to help name rowDiv class. Should be set to whatever the first our of hours array is.
// creats a row for all the hours within array
for (var i = 0; i < hours.length; i++){
    let rowDiv = $('<div>')
    let hourCol = $('<div>')
    let textArea = $('<textarea>')
    let saveButton = $('<button>')
    let saveIcon = $('<i>')
    rowDiv.addClass('row time-block')
    rowDiv.attr('id', i +' hour-'+ h)
    h++
    hourCol.addClass('col-md-1 hour')
    hourCol.text(hours[i].hour)
    textArea.addClass('col-md-10 timeEvent')
    textArea.text(hours[i].timeEvent)
    saveButton.addClass('btn saveBtn col-md-1')
    saveIcon.addClass('fa fa-save')
    saveIcon.appendTo(saveButton)
    hourCol.appendTo(rowDiv)
    textArea.appendTo(rowDiv)
    saveButton.appendTo(rowDiv)
    $('.container').append(rowDiv)
}

//function to check current hour for all the rows it will check what hour id the row has and compare it the the current hour
function currentHour(){
    let rightNow = moment().hours()
    $('.time-block').each(function() {
        let hourBlock = +($(this).attr('id').split('-')[1])  
        //if row hour is less than the current hour it will add class past which changes the color of the row to gray
        if (hourBlock < rightNow) {
          $(this).addClass('past')
        } 
        //if the row hour is the same it will give the row the present class which will change the color to red
        else if (hourBlock == rightNow) {
          $(this).removeClass('past')
          $(this).addClass('present')
        } 
        //else it means its a future event which will change the color to green
        else {
          $(this).removeClass('past')
          $(this).removeClass('present')
          $(this).addClass('future')
        }
      });
}

currentHour()

let updateHour = setInterval(currentHour, 30000); //var to run the currentHour function every 30 seconds
//on click event for save buttons. Once clicked it will get save the event for that hour block into local storage
$('.saveBtn').on('click', function(){
    let val = $(this).siblings('.timeEvent').val()
    let time = +($(this).parent().attr('id').split(' ')[0])
    hours[time].timeEvent = val
    localStorage.setItem('hours', JSON.stringify(hours))
})
//funcation to retrive hours array from local storage
function init(){
    var retrive = JSON.parse(localStorage.getItem('hours'))
    if (retrive !== null){
        hours = retrive
    }
}
//funcation to retrive the stored date from local storage
function initDate(){
    var ret = JSON.parse(localStorage.getItem('todayStored'))
    if (ret !== null){
        todayStored = ret
    }
}

})