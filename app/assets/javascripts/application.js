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

  function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !==2 ) {
      alert("Please enter a letter and a number valid on the board.")
    }
    else {
      firstChar = guess.charAt(0);
      var row = alphabet.indexOf(firstChar);
      var column = guess.charAt(1);

      if (isNaN(row) || isNaN(column)) {
        alert("Ooops, that isn't on the board.");
      }
      else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
        alert("Ooops, that's off the board.");
      }
      else {
        return row + column;
      }
    }
    return null;
  }

  var controller = {
    guesses: 0,

    processGuess: function(guess) {
      var location = parseGuess(guess);
      if (location) {
        this.guesses++;
        var hit = model.fire(location);
        if (hit && model.shipsSunk === model.numShips) {
            view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
        }
      }
    }
  };

  function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
  }

  function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
  }
  window.onload = init;


// controller.processGuess("A1");
// controller.processGuess("B0");
// controller.processGuess("C0");
// controller.processGuess("D0");
// controller.processGuess("D2");
// controller.processGuess("D3");
// controller.processGuess("D4");
// controller.processGuess("G3");
// controller.processGuess("G4");
// controller.processGuess("G5");

// console.log(parseGuess("A0"));
// console.log(parseGuess("B6"));
// console.log(parseGuess("G3"));
// console.log(parseGuess("H0"));
// console.log(parseGuess("A7"));

// model.fire("10");
// model.fire("20");
// model.fire("30");
// model.fire("32");
// model.fire("33");
// model.fire("34");
// model.fire("63");
// model.fire("64");
// model.fire("65");
// model.fire("00");

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");
// view.displayMessage("Tap tap, is this thing on?");

});

