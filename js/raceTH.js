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

  
  function Animal(name, speed, focus) {
    this.name = name;
    this.speed = speed;
    this.focus = focus;
    this.position = 0;
    this.image_selector = null;

    this.image = function(image_selector) {
      this.image_selector = image_selector;
    };

    

    // Here, move refers to a game move. The animal may or may not change position
    // The move function also reports the result of the game move
    // TODO: separate game logic from display logic, so that the move and any
    // calculations are done first, and then the object is instructed to draw
    this.move = function() {
      var sAction;

       if( Math.random() * 10 < this.focus) {
        this.position += toNumber(this.speed);
        

        sAction = "runs " + addplurals(this.speed,"yard") + " and is now";
      } else {
        sAction = "is distracted and remains";
      }

      if( graphical ) {
        this.image_selector.style.marginLeft = this.position + "%";
        alert(this.position);
      } else {
        lineout(this.name + " " + sAction + " at " + this.position + " yards.");
      }
    };

  }


  // TODO: could ask user for these properties
  var rabbit;
  var turtle;
  var distance;
  var graphical;


  function playGame() {
   

    var ti = document.getElementById("turtle_image");
    alert(ti.style.marginLeft);
    turtle.image(ti);
    rabbit.image(document.getElementById("rabbit_image"));

    
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

  }

  function constructAnimals() {

    alert("constructAnimals");

    
    var rn = document.getElementById("rabbitname").value;
    var rs = document.getElementById("rabbitspeed").value;
    var rf = document.getElementById("rabbitfocus").value;
  
    var tn = document.getElementById("turtlename").value;
    var ts = document.getElementById("turtlespeed").value;
    var tf = document.getElementById("turtlefocus").value;
    
    rabbit = new Animal(rn, rs, rf);
    alert(rn);
    turtle = new Animal(tn, ts, tf);

  }

  function destructSetup() {
    
    var setup_list = document.getElementsByClassName("game_setup");

    while(setup_list[0]) {
      alert("removing: " + setup_list[0]);
      setup_list[0].parentNode.removeChild(setup_list[0]);

    
    }
    
  }

  function setupGame() {

    var elRabbit = document.getElementById("rabbitname");
    //alert("in setupGame");
    
    elRabbit.onchange = function() {
      var rn = elRabbit.value;
      document.getElementById("rabbitspeed").placeholder = 'How Fast Does ' + rn + ' Hop?';
      document.getElementById("rabbitfocus").placeholder = 'Is ' + rn + ' Easily Distracted?';
    };

    var elButton = document.getElementById("button1");
    elButton.onclick = function() {
      constructAnimals();
      destructSetup();
      playGame();
    };

    distance = 80; //getNumber("How many yards is the race?");
    graphical = true; //(prompt("Would you like to see a graphical race?"));

  }

  window.onload = function() {

    setupGame();
  };


    
    










  

  

 




