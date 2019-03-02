// Initialize Firebase
var config = {
  apiKey: "AIzaSyDjdEebUvzNdlaDLR5ZaIKMkeycWZ-wJM8",
  authDomain: "employeedatamanagement-deaf5.firebaseapp.com",
  databaseURL: "https://employeedatamanagement-deaf5.firebaseio.com",
  projectId: "employeedatamanagement-deaf5",
  storageBucket: "employeedatamanagement-deaf5.appspot.com",
  messagingSenderId: "859236025483"
};
firebase.initializeApp(config);
database = firebase.database();

$(document).ready(function () {

    $('.btn').on('click', function(event){

        event.preventDefault();

        var name = $('#name-input').val().trim();
        var role = $('#role-input').val().trim();
        var date = $('#date-input').val().trim();
        var rate = $('#rate-input').val().trim();

        var convertedDate = moment(date,'YYYY-MM-DD');
        var dateAdded = firebase.database.ServerValue.TIMESTAMP;

        var monthsWorked = moment(dateAdded).diff(convertedDate,'months');

        $('#name-input').val('');
        $('#role-input').val('');
        $('#date-input').val('');
        $('#rate-input').val('');

        

        console.log(name);
        console.log(role);
        console.log(date);
        console.log(rate);

        database.ref().push({
            name: name,
            role: role,
            date: date,
            rate: rate,
            dateAdded: dateAdded,
            monthsWorked: monthsWorked
        });

  
    });

    addInfo();

});

function addInfo(){
    database.ref().on('child_added', function(snapshot) {

        var sv = snapshot.val();
        console.log(typeof sv.date);
        var dateToUnix = new Date(sv.date).getTime() / 1000;
        var tMonths = (sv.dateAdded - dateToUnix)/2629743;
        console.log(tMonths);

        console.log(sv.name);
        console.log(sv.role);
        console.log(sv.date);
        console.log(sv.rate);
        console.log(sv.dateAdded);
        console.log(sv.monthsWorked);

        var row = $('<tr>');
        var tName = $('<td>').text(sv.name);
        var tRole = $('<td>').text(sv.role);
        var tDate = $('<td>').text(sv.date);
        var tRate = $('<td>').text(sv.rate);
        var tWorked = $('<td>').text(sv.monthsWorked);

        
        row.append(tName).append(tRole).append(tDate).append(tRate).append(tWorked);
        $('#table').append(row);
    })
}