// Initialize Firebase
var config = {
    apiKey: "AIzaSyAXOR2O3dum1umrzFO8jNgvTqvVMCj3TrM",
    authDomain: "train-schedule-app-5caa2.firebaseapp.com",
    databaseURL: "https://train-schedule-app-5caa2.firebaseio.com",
    projectId: "train-schedule-app-5caa2",
    storageBucket: "train-schedule-app-5caa2.appspot.com",
    messagingSenderId: "708092872162"
};

// Pass Firebase credentials (above) into initializeApp method
firebase.initializeApp(config);

// assign variable to firebase.database()
var database = firebase.database()
console.log(database);

// click listener for submit button
$("#submit-button").on("click", function (event) {
    // prevent default behavior of refresh page
    event.preventDefault();

    //assign variable for values from user inputs for train-name, destination, first-train, and frequency
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    //log variables to ensure we are grabbing info from form
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    // Push creates a new 'child'/'branch' in the root directory of your database. The new child/branch will be given an auto-generated serial number, and each of the key-value pairs defined below will be pushed into that new child/branch.
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");

});

// This chunk of code can be triggered in two scenarios: 1.) On page load/refesh this code will be executed FOR EACH child/branch that exists in the root directory of the database. 2.) This code will be executed when a new child/branch is added to the database (which, on this page, happens each time the click listener is triggered on the submit button).
database.ref().on("child_added", function (childSnapshot) {
    var nextArrival;

    //get train start from the database
    console.log(childSnapshot.val().firstTrain);
    var trainStart = childSnapshot.val().firstTrain;
    console.log(trainStart);

    // Pushing the start time back 1 yr to ensure it comes before the current time
    var trainStartConv = moment(trainStart, "HH:mm").subtract(1, 'years');
    console.log(trainStartConv)

    // calculate the difference between trainStart and curTime
    var timeDiff = moment().diff(moment(trainStartConv), "minutes");
    console.log(timeDiff);

    // calculate time apart
    var timeApart = timeDiff % childSnapshot.val().frequency;
    console.log(timeApart);

    // minutes until arrival
    var minutesAway = childSnapshot.val().frequency - timeApart;
    console.log(minutesAway);


    //adding minutes until the train to the current time and formatting the appearance of the time
    nextArrival = moment().add(minutesAway, "m").format("HH:mm");
    console.log(nextArrival)

    // add new row to on-screen table

    var trainName = $("<td>").text(childSnapshot.val().trainName);
    var destination = $("<td>").text(childSnapshot.val().destination);
    var firstTrain = $("<td>").text(childSnapshot.val().firstTrain);
    var frequency = $("<td>").text(childSnapshot.val().frequency);
    var nextArrival = $("<td>").text(nextArrival);
    var minutesAway = $("<td>").text(minutesAway);

    var newRow = $("<tr>");

    newRow.append(trainName, destination, frequency, nextArrival, minutesAway);

    $("#schedule").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});