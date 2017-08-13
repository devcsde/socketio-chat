const moment = require("moment");


// Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());

let date = moment();

// date.add(100, "years").subtract(9, "months");
// date.add(4, "hours");

console.log(date.format("MMM Do YYYY, h:mm a"));
console.log(date.format("h:mm a"));