$(document).ready(function(){
$('#currentDay').text(moment().format("dddd, MMMM Do"));

let hours = [
    {
        hour: '9AM',
        timeEvent: ''
    },
    {
        hour: '10AM',
        timeEvent: ''
    },
    {
        hour: '11AM',
        timeEvent: ''
    },
    {
        hour: '12PM',
        timeEvent: ''
    },
    {
        hour: '1PM',
        timeEvent: ''
    },
    {
        hour: '2PM',
        timeEvent: ''
    },
    {
        hour: '3PM',
        timeEvent: ''
    },
    {
        hour: '4PM',
        timeEvent: ''
    },
    {
        hour: '5PM',
        timeEvent: ''
    }
]

let h = 9

for (var i = 0; i < hours.length; i++){
    let rowDiv = $('<div>')
    let hourCol = $('<div>')
    let textArea = $('<textarea>')
    let saveButton = $('<button>')
    rowDiv.addClass('row time-block')
    rowDiv.attr('id', 'hour-'+ h)
    h++
    hourCol.addClass('col-md-1 hour')
    hourCol.text(hours[i].hour)
    textArea.addClass('col-md-10 timeEvent')
    saveButton.addClass('btn saveBtn col-md-1')
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

})