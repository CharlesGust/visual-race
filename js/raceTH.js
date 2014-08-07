//
// This runs a simple simulation of a tortoise hare race.
// This simulation considers each animal to have a name, speed and focus.
// The user is queried for the length of the race.
// If a randomly generated value determines the animal is focused, the animal advances their speed
// Otherwise, the animal remains at their position
//
// by Charles Gust
//

  function yes(theString) {
    return theString[0].toLowerCase() == "y";
  }

  function toNumber(sbNumber) {
    return parseInt(sbNumber,10);
  }

  function getNumber(promptPhrase) {
      var isNumber = false;
      var userInput;

      while(! isNumber) {
        userInput = toNumber(prompt(promptPhrase));
        isNumber = ! isNaN(userInput);
      }

      return userInput;
  }

  function lineout(phrase) {
    document.write("<p>" + phrase + "</p>");
  }

  // takes a number and a noun
  // if the unit is not 1, a trailing "s" is adding which forms the plural
  // of most English nouns
  function addplurals(number, noun) {
    var sReturn = number + " " + noun;

    if( number != 1) {
      sReturn = sReturn + "s";
    }

    return sReturn;
  }


  function Animal(name, speed, focus, selector) {
    this.name = name;
    this.speed = speed;
    this.focus = focus;
    this.selector = selector;
    this.position = 0;

    // Here, move refers to a game move. The animal may or may not change position
    // The move function also reports the result of the game move
    // TODO: separate game logic from display logic, so that the move and any
    // calculations are done first, and then the object is instructed to draw
    this.move = function() {
      var sAction;

      if( Math.random() * 10 < this.focus) {
        this.position += this.speed;

        sAction = "runs " + addplurals(this.speed,"yard") + " and is now";
      } else {
        sAction = "is distracted and remains";
      }

      if( graphical ) {
        this.selector.style.clientLeft = this.position;
      } else {
        lineout(this.name + " " + sAction + " at " + this.position + " yards.");
      }
    }

  }

  // TODO: could ask user for these properties
  var rabbit = new Animal("Bugs",5, 2, document.getElementById("IDrabbit"));
  var turtle = new Animal("Michaelangelo",1,10, document.getElementById("IDturtle"));


  var distance = getNumber("How many yards is the race?");
  var graphical = yes(prompt("Would you like to see a graphical race?"));

  do {
    rabbit.move();
    turtle.move();
  } while((rabbit.position < distance) && (turtle.position < distance));

  if(rabbit.position >= distance) {

    if(turtle.position >= distance) {
      lineout("It's too close to call!!");
    } else {
      lineout(rabbit.name + " wins!!!");
    }

  } else {
    lineout(turtle.name + " wins!!!");
  }


