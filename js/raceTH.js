/*jshint loopfunc: true */
//
// This is a simulation of an animal race, inspired by the classic tortoise/hare
//
// by Elizabeth Rives & Charles Gust
//
// In general, there is a setup phase that collects information about which animals
// you want to race, how fast they move and how focused they remain on racing.
// Then, the setup UI is removed, the racers are constructed.
// Each step of the simulation calculates whether the racer remained focused enough
// to move at their speed.
//

/* TODO: fix white space to have global functions start in leftmost column */
//alert("Javascript init");

  function yes(theString) {
    return theString[0].toLowerCase() == "y";
  }

  function toNumber(sbNumber) {
    return parseInt(sbNumber,10);
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


  function Racer(name, speed, focus, species, sImg) {
    this.name = name;
    this.speed = speed;
    this.focus = focus;
    this.species = species;
    this.sImg = sImg;
    this.position = 0;
    this.verticalDelta = 0;
    this.dally = 0;

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

        elS = document.getElementById(this.sImg);
        elS.style.marginLeft = this.position + "%";
      } else {
        lineout(this.name + " " + sAction + " at " + this.position + " yards.");
      }
    };

  }

  var distance;
  var graphical;

  var nMaxRacers = 4; // This is arbitrary limit, but greater formatting complexity if big
  var nRacers = 0;
  var racers = [{}];

  // animals data
  // TODO: should be JSON somewhere if more complex.
  // TODO: something like enums is probably preferred to these constant indexes
  var ciAnimalsName = 0;
  var ciAnimalsMotion = 1;
  var ciAnimalsTendency = 2;
  var ciAnimalsDally = 3;
  var ciAnimalZebra = 0;
  var ciAnimalOctopus = 1;
  var ciAnimailFox = 2;
  var ciAnimalPelican = 3;
  /*
  var ciAnimalRabbit = 0;
  var ciAnimalTurtle = 1;
  var ciAnimalDog = 2;
  var ciAnimalCat =3;
  */

// CMG: TODO: we were planning to change more of the placeholder text
// the animals table holds anything that we want to associate with a particular animal
  var animals = [
  /*
    ["Rabbit", "Hop", "get distracted easily", 2],
    ["Turtle", "Walk", "proceed steadily",0],
    ["Dog", "Run", "obey if it makes you happy",5],
    ["Cat", "Prance", "wander aimlessly",5]
  */
    ["Zebra", "Gallop", "start and stop", 0],
    ["Octopus", "Swim", "pull themselves along", 2],
    ["Fox", "Run", "proceed slyly", 2],
    ["Pelican", "Fly", "stop for fish", 2]
  ];


  function displayWinner(iRacer) {
    var sWinnerLine = racers[iRacer].name + " wins!!";
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
    var nWinners = 0;

    do {
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

  var iCurrentSpecies;
  //
  // GetCurrentSpecies either has to access a global variable, or do a search
  // of the DOM to find which animal is selected.
  function getCurrentSpecies(invokingObj) {
    if(invokingObj == null) {
      return iCurrentSpecies;
    }
    for(var iAnimal = 0; iAnimal < animals.length; iAnimal++) {
      if (invokingObj.id == animals[iAnimal][ciAnimalsName].toLowerCase()+"_image") {
        iCurrentSpecies = iAnimal;
        return iCurrentSpecies;
      }
    }
  }

  function generateGameImages(nSpecies, sRacerID) {
    // we need to copy into racerXimage something that's just like a
    // <animal>_image (which are the game images). This needs to be a copy
    // because we could have two pelicans in the race, for instance.
    var elGameTitle = document.getElementById("game_title");
    var elGameImages = document.getElementById("game_images");
    var elCurrLI = elGameImages.firstElementChild;

    while(elCurrLI.firstElementChild.id != animals[nSpecies][ciAnimalsName].toLowerCase()+"_racer") {
      elCurrLI = elCurrLI.nextElementSibling;
    }

    //elCurrLI should now point to the game_images version we want to copy
    var elSourceImage;

    var elDestImage = document.createElement("img");
    elDestImage.src = elCurrLI.firstElementChild.src;
    elDestImage.id = sRacerID;

    var elDestImageLI = document.createElement("li");
    elDestImageLI.appendChild(elDestImage);

    var elDestImageLIUL = document.getElementById("racer_images");
    if( elDestImageLIUL == null) {
      // create UL for racer_images
      elDestImageLIUL = document.createElement("ul");
      elDestImageLIUL.id = "racer_images";
      elDestImageLIUL.class = "racerImages";
      elDestImageLIUL.appendChild(elDestImageLI);

      elGameImages.parentNode.appendChild(elDestImageLIUL);
    } else {
      // we have the UL holding at least one LI, append to the end
      elDestImageLIUL.appendChild(elDestImageLI);
    }
  }

  function constructRacer() {
    var sRacerPrefix = "racer"+nRacers;
    var elName = document.getElementById(sRacerPrefix+"name");

    if(elName.textLength <= 0) {
      return;
    }

    var sName = elName.value;
    var nSpeed = toNumber(document.getElementById(sRacerPrefix+"speed").value);

    if(nSpeed <= 0) {
      return;
    }

    var nFocus = toNumber(document.getElementById(sRacerPrefix+"focus").value);
    if( (nFocus <= 0) || (nFocus > 100)) {
      return;
    }

    var nSpecies = getCurrentSpecies(null);
    var objRacer = new Racer(sName, nSpeed, nFocus, nSpecies, sRacerPrefix+"image");

    generateGameImages(nSpecies, sRacerPrefix+"image");

    racers[nRacers++] = objRacer;
  }

  // destructClassName() removes all DOM elements of named class
  function destructClassName(sClassName) {
    var setup_list = document.getElementsByClassName(sClassName);

    while(setup_list[0]) {
      //alert("removing: " + setup_list[0]);
      setup_list[0].parentNode.removeChild(setup_list[0]);
    }
  }

  function setupGame() {
    var iAnimal = 0;
    var iRacer = 0;

    // this function is needed if the UI permits the start race button to be pressed
    // while there is a partially completed racer form.
    function commitContestant() {

    }

    var elButtonRace = document.getElementById("buttonRace");
    elButtonRace.onclick = function() {
      var audio = document.getElementById("race_music");
      //constructRacers();
      destructClassName("game_setup");
      audio.play();
      playGame();
    };

    var elButtonEnterContestant = document.getElementById("buttonEnterContestant");
    elButtonEnterContestant.onclick = function() {
      constructRacer(); // add Racer object, increment nRacers
      if(nRacers == nMaxRacers) {
        var elRaceButton = document.getElementById("buttonRace");

        elRaceButton.style.display = "block";
        elRaceButton.style.visibility = "visible";
        elButtonEnterContestant.style.display = "none";

        destructClassName("contestantSelect");
        destructClassName("setup_image");
      }
      else {
        switchToSpecies();
      }
    }

    distance = 80; //getNumber("How many yards is the race?");
    graphical = true; //(prompt("Would you like to see a graphical race?"));
  }


  var current_form;
  var elContestant;
  var elRaceButton;
  var elContestant_images;
  var elForm;
  var elInput;
  var elAnimals;

  // change the display attribute on a class display
  function classDisplay(sClassName, sSetting) {
  var display_list = document.getElementsByClassName(sClassName);

  for (var iNode=0; iNode < display_list.length; iNode++) {
    display_list[iNode].style.display = sSetting;
    }
  }

  // change the display attribute on an input class
  function inputVisibility(sClassName, sSetting) {
  var display_list = document.getElementsByClassName(sClassName);
    for (var iNode = 0; iNode < display_list.length; iNode++) {
      display_list[iNode].style.visibility = sSetting;
    }
  }

  /*
   * On mouseover of contestants button, changes the interface to a pop up of different animals to select.
   */
  current_form = "racer0_input";

  function switchToSpecies() {

    classDisplay("selectSpecies", "block");
    classDisplay("inputForm", "none");
    inputVisibility("inputForm", "hidden");
    elContestant = document.getElementById("contestant");
    elRaceButton = document.getElementById("buttonRace");
    elEnterContestant = document.getElementById("buttonEnterContestant");
    elRaceButton.style.display = "block";
    elRaceButton.style.visibility = "visible";
    elContestant.style.display = "block";
    elEnterContestant.style.display = "none";

      var sRacerPrefix = "racer" + nRacers;

      elContestant_images = document.getElementById("contestant_selection");
      elForm = document.getElementById("form1");
      elInput = document.getElementById(sRacerPrefix);
      elForm.style.zIndex = "-200";
      elContestant.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    }

 /*
  * Hides pop up animal selection
  */
  function switchToForm(invokingObj) {
    var iSpecies = getCurrentSpecies(invokingObj);

    classDisplay("selectSpecies", "none");

    var sRacerPrefix = "racer" + nRacers;
    var elInputForm = document.getElementById(sRacerPrefix+"_input");
    elInputForm.style.display = "block";
    elInputForm.style.visibility = "visible";
    elRaceButton = document.getElementById("buttonRace");
    elRaceButton.style.display = "none";
    elRaceButton.style.visibility = "hidden";
    elEnterContestant.style.display = "block";
    iCurrentSpecies = iSpecies;
  }

  // use window.onload
  // The code that runs here is code that creates the initial view and sets up the dynamic events
  // If the javascript code is contained in a tag that it modifies, the browser reloads, which means
  // the javascript runs twice. The way to fix this is supposed to be by putting the javascript code
  // in the <head> part of the html. However, by that point, we don't have enough of the DOM loaded
  // to do the code in here. So, doing it "onload" is a way to delay it's execution until the entire
  // page is loaded
  window.onload = function() {

    switchToSpecies();

    elAnimals = document.getElementsByClassName("setup_image");
    for (var i = 0; i < elAnimals.length; i++) {
      elAnimals[i].onmouseover = function() {this.style.opacity = "0.8";};
    }

    for (var j = 0; j < elAnimals.length; j++) {
      elAnimals[j].onclick = function() {
        switchToForm(this);
      };
    }

    setupGame();

  };

