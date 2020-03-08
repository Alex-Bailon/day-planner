$(document).ready(function(){
$('#currentDay').text(moment().format("dddd, MMMM Do"));
let today = moment().format('dddd, MMMM Do')
let todayStored = moment().format('dddd, MMMM Do')
initDate()
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

if (today == todayStored){
    init()
    localStorage.setItem('todayStored', JSON.stringify(todayStored))   
    console.log(hours)
}
else{
    hours = hoursArray
    console.log(hours)
    todayStored = today
    localStorage.setItem('todayStored', JSON.stringify(todayStored))
}
let h = 9

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
    saveIcon.addClass('fas fa-save')
    saveIcon.appendTo(saveButton)
    hourCol.appendTo(rowDiv)
    textArea.appendTo(rowDiv)
    saveButton.appendTo(rowDiv)
    $('.container').append(rowDiv)
}

function currentHour(){
    let rightNow = moment().hours()
    console.log(rightNow)
    $(".time-block").each(function() {
        var blockHour = +($(this).attr("id").split("-")[1])
        console.log(blockHour)
  
        if (blockHour < rightNow) {
          $(this).addClass("past")
        } 
        else if (blockHour == rightNow) {
          $(this).removeClass("past")
          $(this).addClass("present")
        } 
        else {
          $(this).removeClass("past")
          $(this).removeClass("present")
          $(this).addClass("future")
        }
      });
}

currentHour()

var updateHour = setInterval(currentHour, 30000);

$('.saveBtn').on('click', function(){
    let val = $(this).siblings('.timeEvent').val()
    let time = +($(this).parent().attr('id').split(' ')[0])
    hours[time].timeEvent = val
    localStorage.setItem('hours', JSON.stringify(hours))
})

function init(){
    var retrive = JSON.parse(localStorage.getItem('hours'))
    if (retrive !== null){
        hours = retrive
    }
}

function initDate(){
    var ret = JSON.parse(localStorage.getItem('todayStored'))
    if (ret !== null){
        todayStored = ret
    }
}

})