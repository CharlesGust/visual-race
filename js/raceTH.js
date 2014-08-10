/*jshint loopfunc: true */
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

  function getNumbervRange(promptPhrase, min, max) {
    var nResult;

    do {
      nResult = getNumber(promptPhrase);
    } while( (nResult < min) || (nResult > max));

    return nResult;
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


  function Racer(name, speed, focus, species) {
    this.name = name;
    this.speed = speed;
    this.focus = focus;
    this.species = species;
    this.position = 0;
    this.verticalDelta = 0;
    this.dally = 0;
    //this.image_selector = null;

/*
    this.setImage = function(elImage) {
      var elI = elImage;
      this.image_selector = elI;
    };
*/

    // Here, move refers to a game move. The animal may or may not change position
    // The move function also reports the result of the game move
    // TODO: separate game logic from display logic, so that the move and any
    // calculations are done first, and then the object is instructed to draw
    this.move = function() {
      var sAction;

       if( Math.random() * 100 < this.focus) {
        this.position += toNumber(this.speed);


        sAction = "runs " + addplurals(this.speed,"yard") + " and is now";
      } else {
        sAction = "is distracted and remains";
      }

      if( graphical ) {
        var spc = this.species;
        var szAE = strAnimalElement(spc, "_image");
        var elS = document.getElementById(szAE);

        elS.style.marginLeft = this.position + "%";
        //alert(this.position);
      } else {
        lineout(this.name + " " + sAction + " at " + this.position + " yards.");
      }
    };

  }

  //var rabbit;
  //var turtle;
  var distance;
  var graphical;

  var nMaxRacers = 4; // This is arbitrary, but greater formatting complexity if big
  var nRacers = 0;
  var racers = [{}];

  // animals data
  // TODO: should be JSON somewhere if more complex.
  // TODO: something like enums is probably preferred to these constant indexes
  var ciAnimalsName = 0;
  var ciAnimalsMotion = 1;
  var ciAnimalsTendency = 2;
  var ciAnimalsDally = 3;
  var ciAnimalRabbit = 0;
  var ciAnimalTurtle = 1;
  var ciAnimalDog = 2;
  var ciAnimalCat =3;
  var animals = [
    ["Rabbit", "Hop", "get distracted easily", 2],
    ["Turtle", "Walk", "proceed steadily",0],
    ["Dog", "Run", "obey if it makes you happy",5],
    ["Cat", "Prance", "wander aimlessly",5]
  ];

  function displayWinner(iRacer) {
    var sWinnerLine = racers[iRacer].name.value + " wins!!";
    if( graphical) {
      alert(sWinnerLine);
    } else {
      lineout(sWinnerLine);
    }
  }

  // TODO: it would be better to build a winners list as the winners are found
  // than go back through this list looking for them
  function displayWinners() {
    var iRacer;

    if (! graphical) {
      lineout("It's too close to call!!");
    }
    for(iRacer = 0; iRacer < racers.length; iRacer++) {
      if(racers[iRacer].position >= distance) {
        displayWinner(iRacer);
      }
    }
  }

  function strAnimalElement(iSpecies, suffix) {
    var rv = animals[iSpecies][ciAnimalsName].toLowerCase() + suffix;
    return rv;
  }

  function playGame() {
    var iWinner;
    var iRacers;

/*
    // the pictures for the racers are the pictures of the respective animals
    for(iRacer = 0; iRacer < nRacers; iRacer++) {
      var rIr = racers[iRacer];
      var spc = rIr.species;
      var szAE = strAnimalElement(spc, "_image");
      var elS = document.getElementById(szAE);


      rIr.setImage(elS);
      // racers[iRacer].setImage(document.getElementById(strAnimalElement(racers[iRacer].species, "_image")));
    }
  */

    //var ti = document.getElementById("turtle_image");
    //alert(ti.style.marginLeft);
    //turtle.image(ti);
    //rabbit.image(document.getElementById("rabbit_image"));


    do {
      var nWinners = 0;

      for(iRacers = 0; iRacers < racers.length; iRacers++) {
        racers[iRacers].move();
        // racers[iRacers].draw();
        if( racers[iRacers].position >= distance) {
          iWinner = iRacers;
          nWinners++;
        }
      }
    } while(nWinners == 0);

    if(nWinners == 1) {
      displayWinner(iWinner);
    } else {
      displayWinners();
    }
  }

  function constructRacers() {
    var iRacer = 0;

    // alert("constructRacers");

    for(iRacer = 0; iRacer < nMaxRacers; iRacer++) {
      var sRacerPrefix = "racer"+iRacer;

      var rn = document.getElementById(sRacerPrefix+"name");

      if( rn == null) {
        iRacer = nMaxRacers;
      } else {
        var rs = toNumber(document.getElementById(sRacerPrefix+"speed").value);
        var rf = toNumber(document.getElementById(sRacerPrefix+"focus").value);
        var ra = toNumber(document.getElementById(sRacerPrefix+"species").value);
        var nr = new Racer(rn, rs, rf, ra);

        racers[iRacer] = nr;
        nRacers = iRacer;
      }
    }
    /*
    var rn = document.getElementById("rabbitname").value;
    var rs = document.getElementById("rabbitspeed").value;
    var rf = document.getElementById("rabbitfocus").value;

    var tn = document.getElementById("turtlename").value;
    var ts = document.getElementById("turtlespeed").value;
    var tf = document.getElementById("turtlefocus").value;

    rabbit = new Animal(rn, rs, rf);
    alert(rn);
    turtle = new Animal(tn, ts, tf);
    */

  }

  // destructSetup() removes all DOM elements of class game_setup
  function destructSetup() {
    var setup_list = document.getElementsByClassName("game_setup");

    while(setup_list[0]) {
      //alert("removing: " + setup_list[0]);
      setup_list[0].parentNode.removeChild(setup_list[0]);
    }
  }

/*
  function addRacerSpecies(sRacerPrefix, elRacerName, iAnimal) {
    alert("addRacerSpecies");
    var elRacerSpecies = document.createElement(sRacerPrefix + "species");
    var sNewText = document.createTextNode(iAnimal);
    elRacerSpecies.appendChild(sNewText);
    var position = document.getElementById(sRacerPrefix+"_input");
    position.appendChild(elRacerSpecies);
  }
*/

  function setupGame() {
    var iAnimal = 0;
    var iRacer = 0;
    var elRacerName;
    var elRacerSpeed;
    var elRacerFocus;
    var sRacerPrefix;
    var elRacerSpecies;
    var sAnimalMotion;

    // TODO: fancier animal selection is around the corner
    /* while( (iAnimal = getNumbervRange("What kind of animal to racer? 0 to exit",0,animals.length - 1)) > 0) { */
    for(iRacer = 0; iRacer < nMaxRacers; iRacer++) {
      sRacerPrefix = "racer" + iRacer;
      elRacerName = document.getElementById(sRacerPrefix+"name");
      elRacerSpeed = document.getElementById(sRacerPrefix+"speed");
      elRacerFocus = document.getElementById(sRacerPrefix+"focus");

      // TODO: is there a better way to get species than from user input on a form?
      elRacerSpecies = document.getElementById(sRacerPrefix+"species");

      sAnimalMotion = animals[elRacerSpecies][ciAnimalsMotion];
      }
      
    elRacerSpecies.onchange = function() {

    elRacerName.placeholder = "This " + animals[iAnimal][ciAnimalsName].toLowerCase() + " needs a suitable name";
    elRacerSpeed.placeholder = sAnimalMotion +", " + sAnimalMotion + ", " + sAnimalMotion + "...";
    elRacerFocus.placeholder = animals[iAnimal][ciAnimalsName] + " tend to " + animals[iAnimal][ciAnimalsTendency];

   };



    elRacerName.onchange = function() {
      var rn = elRacerName.value;
      elRacerSpeed.placeholder =
                              "How fast does " + rn + " " + animals[iAnimal][ciAnimalsMotion].toLowerCase() + " (1-10)?";
      elRacerFocus.placeholder =
                              "What percent of the time does " + rn + " focus?";
    };

    var elButtonRace = document.getElementById("buttonRace");
    elButtonRace.onclick = function() {
      constructRacers();
      destructSetup();
      playGame();
    };

    distance = 80; //getNumber("How many yards is the race?");
    graphical = true; //(prompt("Would you like to see a graphical race?"));

  }


  /* 
   * On mouseover of contestants button, changes the interface to a pop up of different animals to select.
   */
  function switchToContestants() {
    alert("in switchToContestants");
    var elContestant = document.getElementById("contestant");
    elContestant.onmouseover = function() {
      var elContestant_images = document.getElementById("contestant_selection");
      var elForm = document.getElementById("form1");
      var elInput = document.getElementById("racer0_input");
      var elRabbit = document.getElementById("rabbit_image");
      var elButton = document.getElementById("buttonRace");
      elForm.style.zIndex = "-200";
      elInput.style.visibility = "hidden";
      elButton.style.display = "none";
      elContestant_images.style.display = "block";
      elContestant.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    };
  }


 /*
  * Contains key value pairs to match animal image selection to the specific input box.
  */
  var input_lookup = {
    "/images/realrabbit.png": "racer0_input",
    "/images/zebra1.png": "racer1_input",
    "/images/octopus1.png": "racer2_input",
    "/images/fox1.png": "racer3_input"
    //"images/pelican.png"
  };

  
 /*
  * Looks up animal image src in input_lookup to retrieve the specific input form 
  * and make the form visible on page.
  */
  function switchInputBox(elSrc) {
    for (var src in input_lookup) {
      if (elSrc === src) {
        document.getElementById(input_lookup[src]).style.display = "block";
        racer0_input.style.display = "none";
      }
    }
    //var elContest = document.getElementById("contestant");
    //elContest.innerText = "Next Up"; //TODO: Change to same formatting as #contestant h3
    switchToContestants();
  }


 /*
  * Hides pop up animal selection 
  */
  function switchToForm() {
    var elAnimals = document.getElementsByClassName("setup_image");
    for (var i = 0; i < animals.length; i++) {
      elAnimals[i].style.display = "none";
    
    var elContestant_images = document.getElementById("contestant_selection");
    elContestant_images.style.display = "none";
    }
  }


  window.onload = function () {

    switchToContestants();
   
    var elAnimals = document.getElementsByClassName("setup_image");
    for (var i = 0; i < elAnimals.length; i++) {
      elAnimals[i].onmouseover = function() {this.style.opacity = "0.8";};
    }

    for (var j = 0; j < elAnimals.length; j++) {
      elAnimals[j].onclick = function() {
        switchToForm();
        var elPath = this.src;
        var elSrc = elPath.substr(elPath.lastIndexOf("/images"));
        switchInputBox(elSrc);
      };
    }

    setupGame();
    
  };

  



  
  






















