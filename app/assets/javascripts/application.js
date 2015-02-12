// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$(function() {
  var view = {
    displayMessage: function(msg) {
      var messageArea = document.getElementById("messageArea");
      messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class","hit");
    },
    displayMiss: function(location) {
      var cell = document.getElementById(location);
      cell.setAttribute("class","miss");
    }
  };

  // var ship1 = { locations: ["10", "20", "30"], hits: ["", "", ""] };
  // var ship2 = { locations: ["32", "33", "34"], hits: ["", "", ""] };
  // var ship3 = { locations: ["63", "64", "65"], hits: ["", "", ""] };

  var model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,

    ships: [
      // alphabet number: 10 = B0 | 20 = C0 | 30 = D0 [vertical / length: 3blocks]
      { locations: ["10", "20", "30"], hits: ["", "", ""] },
      // alphabet number: 32 = D2 | 33 = D3 | 34 = D4 [horizontal / length: 3blocks]
      { locations: ["32", "33", "34"], hits: ["", "", ""] },
      // alphabet number: 63 = G3 | 64 = G4 | 65 = G5 [horizontal / length: 3blocks]
      { locations: ["63", "64", "65"], hits: ["", "", ""] }
    ],

    fire: function(guess) {
      for (var i = 0; i < this.numShips; i++) {
        // get the ship
        var ship = this.ships[i];
        // get the locations of the ship
        // get the index of the guess in the location
        var index = ship.locations.indexOf(guess);
        if (index >= 0) {
          ship.hits[index] = "hits";
          view.displayHit(guess);
          view.displayMessage("HIT!");
          if (this.isSunk(ship)) {
            view.displayMessage("You sunk my battleship!");
            this.shipsSunk++;
          }
          return true;
        }
      }
      view.displayMiss(guess);
      view.displayMessage("You missed!");
      return false;
    },
    isSunk: function(ship) {
      for (var i = 0; i < this.numShips; i++) {
        if (ship.hits[i] !== "hit") {
          return false;
        }
      }
      return true;
    }
  };




// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");
// view.displayMessage("Tap tap, is this thing on?");

});


// $(function() {
//   // ship1
//   // var location1 = 3;
//   // var location2 = 4;
//   // var location3 = 5;

//   // ship1: positioning ship1 randomly. Take the random location along with the next two consecutive
//   var randomLoc = Math.floor(Math.random() * 5);
//   var location1 = randomLoc;
//   var location2 = location1 + 1;
//   var location3 = location2 + 1;

//   // user guesses
//   var guess; 

//   // number of hits
//   var hits = 0;

//   // number of guesses
//   var guesses = 0;

//   // keep track of whether the ship has sunk
//   var isSunk = false;

//   // loop whiles the ship is not sunk
//   while (isSunk == false) {
//     // get users guess
//     guess = prompt("Ready, aim, fire! enter a number from 0 - 6:");
//     // check the validity by making sure guess is between 0 and 6
//     if (guess < 0 || guess > 6) {
//       alert("Please enter a valid cell number");
//     } 
//     // keeping track count of guesses
//     else {
//       guesses = guesses + 1;
//       // if guess matches one of the ship location we increment the ship count
//       if (guess == location1 || guess == location2 || guess == location3) {
//         alert("HIT!");
//         hits = hits + 1;
//         if (hits == 3) {
//           isSunk = true;
//           alert("You sunk my battleship!");
//         }
//       }
//       else {
//         alert("MISS!");
//       }
//     }
//   }
//   var stats = "You took " + guesses + " guesses to sink my battleship, " + "which means your shooting accuracy was " + (3/guesses);
//   alert(stats);

// });

















