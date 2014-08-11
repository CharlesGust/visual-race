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
        // CMG: TODO: the next line is wrong if two animals of the same type are racing
        var elS = document.getElementById(szAE);

        elS.style.marginLeft = this.position + "%";
        //alert(this.position);
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

/*
  // After the input forms are complete, create a "Racer" object for each one
  // Also, update the global variable that counts the number of racers
  function constructRacers() {
    alert("in constructRacers");
    var iRacer = 0;

    for(iRacer = 0; iRacer < nMaxRacers; iRacer++) {
      var sRacerPrefix = "racer"+iRacer;
      var elName = document.getElementById(sRacerPrefix+"name");

      // TODO: We need to check whether the user ever entered data on the form to
      // see whether or not this racer "counts". Is the best way to check for that
      // to check if the length of the name entered is 0?
      if( elName.textLength > 0) {
        var sName = elName.value;
        var nSpeed = toNumber(document.getElementById(sRacerPrefix+"speed").value);
        var nFocus = toNumber(document.getElementById(sRacerPrefix+"focus").value);
        var nSpecies = toNumber(document.getElementById(sRacerPrefix+"species").value);
        var objRacer = new Racer(sName, nSpeed, nFocus, nSpecies);

        // use nRacers with post-increment instead of iRacer just in case code
        // is later altered to permit an empty form between two filled ones.
        racers[nRacers++] = objRacer;
      } else {
        // assumes the forms are filled sequentially and that there is no need
        // to check subsequent forms after we find the first empty name.
        // If that isn't the case, delete the following line to process all
        iRacer = nMaxRacers;
      }
    }
  }
*/

  var iCurrentSpecies;
  //
  // GetCurrentSpecies either has to access a global variable, or do a search
  // of the DOM to find which animal is selected.
  function getCurrentSpecies() {
    return iCurrentSpecies;
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

    var nSpecies = getCurrentSpecies();
    var objRacer = new Racer(sName, nSpeed, nFocus, nSpecies);

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

/*
  // destructClassName() removes all DOM elements of named class
  function destructIdName(sIdName) {
    var setup_list = document.getElementByIdentifer(sIdName);

    while(setup_list[0]) {
      //alert("removing: " + setup_list[0]);
      setup_list[0].parentNode.removeChild(setup_list[0]);
    }
  }
  */

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
    alert("in setupGame");
    var iAnimal = 0;
    var iRacer = 0;
    //var elRacerSpecies;
    //var sAnimalMotion;

/*
    function initInputFormForRacer(iRacer) {
        sRacerPrefix = "racer" + iRacer;
        elRacerName = document.getElementById(sRacerPrefix+"name");
        elRacerSpeed = document.getElementById(sRacerPrefix+"speed");
        elRacerFocus = document.getElementById(sRacerPrefix+"focus");
    }

    initInputFormForRacer(nRacers);
*/

    // TODO: is there a better way to get species than from user input on a form?
    // elRacerSpecies = document.getElementById(sRacerPrefix+"species");



/*
    TODO: CMG: I commented out this function because a elRacerSpecies listener is only relevant if
    we are entering a species on a form. Because we now infer the species from which picture was selected,
    there is no event we can watch to put in these cuter questions.
    We also don't need the sAnimalMotion string

    sAnimalMotion = animals[elRacerSpecies][ciAnimalsMotion].value;

    elRacerSpecies.onchange = function() {

    elRacerName.placeholder = "This " + animals[iAnimal][ciAnimalsName].toLowerCase() + " needs a suitable name";
    elRacerSpeed.placeholder = sAnimalMotion +", " + sAnimalMotion + ", " + sAnimalMotion + "...";
    elRacerFocus.placeholder = animals[iAnimal][ciAnimalsName] + " tend to " + animals[iAnimal][ciAnimalsTendency];

   };
*/

    




    elRacerName.onchange = function() {

      var sRacerPrefix = "racer" + iRacer;
      var elRacerName = document.getElementById(sRacerPrefix+"name");
      var rn = elRacerName.value;
      var elRacerSpeed = document.getElementById(sRacerPrefix+"speed");
      var elRacerFocus = document.getElementById(sRacerPrefix+"focus");


      elRacerSpeed.placeholder =
                              "How fast does " + rn + " " + animals[iAnimal][ciAnimalsMotion].toLowerCase() + " (1-10)?";
      elRacerFocus.placeholder =
                              "What percent of the time does " + rn + " focus?";
    };

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
        elButtonEnterContestant.style.display = "none";
        destructClassName("contestantSelect");
        destructClassName("setup_image");
      } else {
        initInputFormForRacer(nRacers);
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

  function initialState() {

    classDisplay("selectSpecies", "block");
    classDisplay("inputForm", "none");
    inputVisibility("inputForm", "hidden");
    elContestant = document.getElementById("contestant");
    elRaceButton = document.getElementById("buttonRace");
    elEnterContestant = document.getElementById("buttonEnterContestant");
    elRaceButton.style.display = "none";
    elContestant.style.display = "block";
    elEnterContestant.style.display = "none";
/*
    elContestant.onmouseover = function() {
*/
      var sRacerPrefix = "racer" + nRacers;

      elContestant_images = document.getElementById("contestant_selection");
      elForm = document.getElementById("form1");
      elInput = document.getElementById(sRacerPrefix);
      elForm.style.zIndex = "-200";
      //elInput.style.visibility = "hidden";
      //elButton.style.display = "none";
      //elContestant_images.style.display = "block";

      //CMG:TODO: don't think we need following line because all the setup images
      // are of selectSpecies class
      // classDisplay("setup_image", "block");
  /*
      elAnimals = document.getElementsByClassName("setup_image");
      for (var i = 0; i < animals.length; i++) {
        elAnimals[i].style.display = "block";
      }
  */
      elContestant.style.backgroundColor = "rgba(255, 0, 0, 0.7)";
    }

 /*
  * Hides pop up animal selection
  */
  function switchToForm() {
    var iSpecies = 0;
    // CMG:MERGE: not sure if the following line is supposed to be commented out
    // var elAnimals = document.getElementsByClassName("setup_image");

/*
    for (var i = 0; i < animals.length; i++) {
      elAnimals[i].style.display = "none";

    // var elContestant_images = document.getElementById("contestant_selection");
    elContestant_images.style.display = "none";
    }
    */

    classDisplay("selectSpecies", "none");

    var sRacerPrefix = "racer" + iSpecies;
    var elInputForm = document.getElementById(sRacerPrefix+"_input");
    elInputForm.style.display = "block";
    elInputForm.style.visibility = "visible";
    elEnterContestant.style.display = "block";
    //inputVisibility(sRacerPrefix+"_input", "block");

    //classDisplay("inputForm", "block");
    //inputVisibility("inputForm", "block");
    iCurrentSpecies = iSpecies;
  }

 /*
  * Contains key value pairs to match animal image selection to the specific input form.
  */
  /*
  // CMG: TODO: I don't think we should have this table. If an octopus and a fox are racing,
  //  their information is in racer0 and racer1; there's no implicit association with
  //  racer2 and racer3.
  var input_lookup = {
    "/images/realrabbit.png": "racer0_input",
    "/images/zebra1.png": "racer1_input",
    "/images/octopus1.png": "racer2_input",
    "/images/fox1.png": "racer3_input"
    //"images/pelican.png"
  };
  */


 /*
  * Looks up animal image src in input_lookup to retrieve the specific input form
  * and make the form visible on page.
  */
/*
  function switchInputBox(/*elSrc) {
    for (var src in input_lookup) {
      if (elSrc === src) {
        alert(current_form);
        document.getElementById(current_form).style.display = "none";
        document.getElementById(input_lookup[src]).style.display = "block";
        current_form = input_lookup[src];
      }
    }

    initialState();
    //var elContest = document.getElementById("contestant");
    //elContest.innerText = "Next Up"; //TODO: Change to same formatting as #contestant h3

  }
  */

  window.onload = function() {

    initialState();
    
    elAnimals = document.getElementsByClassName("setup_image");
    for (var i = 0; i < elAnimals.length; i++) {
      elAnimals[i].onmouseover = function() {this.style.opacity = "0.8";};
    }

    for (var j = 0; j < elAnimals.length; j++) {
      elAnimals[j].onclick = function() {
        //iCurrentSpecies = j;
        switchToForm();
        // var elPath = this.src;
        // var elSrc = elPath.substr(elPath.lastIndexOf("/images"));
        // switchInputBox(elSrc);
      };
    }

    // setupGame();
  };
