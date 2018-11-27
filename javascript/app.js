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
$("#submit-button").on("click", function(event){
    // prevent default behavior of refresh page
    event.preventDefault();
    




})


// ===== MATH FOR TRAIN TIME ===== //
//get train start from the database


// Pushing the start time back 1 yr to ensure it comes before the current time


// calculate the difference between trainStart and curTime


// calculate time apart


// minutes until arrival


//adding minutes until the train to the current time and formatting the appearance of the time


// add new row to on-screen table