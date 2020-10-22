var container = $(".container");
var button = document.querySelectorAll("button");

var timeData = [
    ["9 AM","9"],
    ["10 AM","10"],
    ["11 AM","11"],
    ["12 AM","12"],
    ["1 PM","13"],
    ["2 PM","14"],
    ["3 PM","15"],
    ["4 PM","16"],
    ["5 PM","17"]
];

// build the rows using javascript
for (var i = 0; i < timeData.length; i++) {
 
    var rowObj = $("<div class='row time-block'>").attr("id", timeData[i][1]);
    var divObj2 = $("<div class='hour col-1'>")
    var divObj = $("<textarea class='col-10'>");
    var buttonObj = $("<button type='button' class='saveBtn col-1 fas fa-save fa-2x'>").attr("id", timeData[i][1]);

    container.append(rowObj);
    divObj2.text(timeData[i][0]);
    rowObj.append(divObj2);

    divObj.text();
    rowObj.append(divObj);

    buttonObj.text();
    rowObj.append(buttonObj);
}


// get the tasks from storage
for (var i = 0; i < 8; i++) {$("textarea")[i].value = localStorage.getItem(`textarea${i}`);}


function refreshPage() {
    // get the current time
    var date = moment();
    var timeDiv = $("#currentDay");
    // Put time at the top
    timeDiv.html("<p>Date: "+date.format('MMMM Do YYYY, h:mm:ss a')+"</p>");
    // for each time-block set the css style based on hour
    $(".time-block").each(function() {
        // getthe hour id from the object
        var rowHour = parseInt($(this).attr("id").split(" ")[0]);
        if (rowHour < date.hours()) {
            $(this).addClass("past");
        } else if (rowHour === date.hours()) {
            $(this).removeClass("past");
            $(this).addClass("present");
        } else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future");
        }
    });
}

// initial refresh
refreshPage();
// update the page every minute
var checkTime = setInterval(refreshPage, 1000);

// save the text to local storage on click
$("button").on("click", function(event) {
    event.preventDefault();
    localStorage.setItem(`textarea${event.target.id-9}`,  $("textarea")[event.target.id-9].value);
    
});
