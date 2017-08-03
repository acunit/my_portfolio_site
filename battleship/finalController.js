
// variables needed in the $(document).ready(function
var clickRow = 0;
var clickCol = 0;
var clickPosition;
var torpedoFires = 0;
var hits = 0;
var misses = 0;
var carrierHits = 0;
var battleship1Hits = 0;
var battleship2Hits = 0;
var cruiser1Hits = 0;
var cruiser2Hits = 0;
var destroyer1Hits = 0;
var destroyer2Hits = 0;
var submarineHits = 0;
var torpedoStock = Math.round((boardRows * boardCols) / 2);
var possibleHits = 0;
var shipFourNum = 0;
var shipThreeNum = 0;
var shipTwoNum = 0;

// loads the functions we want to utilize once the page loads
$(document).ready(function() {
  // Need to build our table first
  buildTable();
  // Hide new game button
  $("button").hide();
  // placement of 5 block ship on board
  fiveBlockPlacement();
  possibleHits = possibleHits + 5;
  // placement of two 4 block ships on board
  shipFourNum = shipFourNum + 0.1;
  fourBlockPlacement();
  possibleHits = possibleHits + 4;
  shipFourNum = shipFourNum + 0.1;
  fourBlockPlacement();
  possibleHits = possibleHits + 4;
  // placement of two 3 block ships on board
  shipThreeNum = shipThreeNum + 0.1;
  threeBlockPlacement();
  possibleHits = possibleHits + 3;
  shipThreeNum = shipThreeNum + 0.1;
  threeBlockPlacement();
  possibleHits = possibleHits + 3;
  // placement of two 2 block ships on board
  shipTwoNum = shipTwoNum + 0.1;
  twoBlockPlacement();
  possibleHits = possibleHits + 2;
  shipTwoNum = shipTwoNum + 0.1;
  twoBlockPlacement();
  possibleHits = possibleHits + 2;
  // placement of 1 block ship on the board
  oneBlockPlacement();
  possibleHits = possibleHits + 1;
  // click function to determine a hit or a miss, and identify whether a cell was clicked.
  $(".cell").on("click", function() {
    // takes the data-index position from the cell that was clicked
    clickPosition = $(this).data("index");
    // converts the data-index position from an integer to a string
    var stringIndex = clickPosition.toString();
    // splits the two digit coded data-index into the row and column singular numbers
    var split = stringIndex.split("");
    // assigns the click row variable to the integer that correspondes with the row
    clickRow = parseInt(split[0]);
    // assigns the click column variable to the integer that correspondes with the column
    clickCol = parseInt(split[1]);
    // if statement to determine whether or not a ship position was hit or missed
    if (board[clickRow][clickCol] == 5) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      carrierHits++;
      $("#carrierHits").text("  " + carrierHits + " / 5");
      if (carrierHits == 5) {
        $("#carrier").append("<span class='sunk'>    SUNK</span>");
      };
    } else if (board[clickRow][clickCol] == 4.1) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      battleship1Hits++;
      $("#battleship1Hits").text("  " + battleship1Hits + " / 4");
      if (battleship1Hits == 4) {
        $("#battleship1").append("<span class='sunk'>    SUNK</span>");
      };
    } else if (board[clickRow][clickCol] == 4.2) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      battleship2Hits++;
      $("#battleship2Hits").text("  " + battleship2Hits + " / 4");
      if (battleship2Hits == 4) {
        $("#battleship2").append("<span class='sunk'>    SUNK</span>");
      };
    } else if (board[clickRow][clickCol] == 3.1) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      cruiser1Hits++;
      $("#cruiser1Hits").text("  " + cruiser1Hits + " / 3");
      if (cruiser1Hits == 3) {
        $("#cruiser1").append("<span class='sunk'>    SUNK</span>");
      };
    } else if (board[clickRow][clickCol] == 3.2) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      cruiser2Hits++;
      $("#cruiser2Hits").text("  " + cruiser2Hits + " / 3");
      if (cruiser2Hits == 3) {
        $("#cruiser2").append("<span class='sunk'>    SUNK</span>");
      };
    } else if (board[clickRow][clickCol] == 2.1) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      destroyer1Hits++;
      $("#destroyer1Hits").text("  " + destroyer1Hits + " / 2");
      if (destroyer1Hits == 2) {
        $("#destroyer1").append("<span class='sunk'>    SUNK</span>");
      };
    } else if (board[clickRow][clickCol] == 2.2) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      destroyer2Hits++;
      $("#destroyer2Hits").text("  " + destroyer2Hits + " / 2");
      if (destroyer2Hits == 2) {
        $("#destroyer2").append("<span class='sunk'>    SUNK</span>");
      };
    } else if (board[clickRow][clickCol] == 1) {
      console.log("HIT!");
      $(this).addClass("cellHit");
      hits++;
      $("#hitCounter").text(hits);
      submarineHits++;
      $("#submarineHits").text("  " + submarineHits + " / 1");
      $("#submarine").append("<span class='sunk'>    SUNK</span>");
    } else {
      console.log("miss");
      misses++;
      $("#missCounter").text(misses);
      $(this).addClass("cellMiss");
    };
    // changes the color of a clicked cell
    // counts the number of torpedo shots
    torpedoFires++;
    // updates the user with how many shots they have fired.
    $("#shotCounter").text(torpedoFires + " / " + torpedoStock);
    // prevents a player from clicking on the same cell more than once and having it count.
    if (hits == possibleHits && torpedoFires < torpedoStock) {
      // Displays the win/loss status of the game
      $(".status").show();
      // Displays that the user has won
      $("#winLose").text("You Win!");
      // Show button to allow player to start a new game.
      $("button").show();
      $("button").on("click", function() {
        location.reload();
      });
      // Prevents the user from being able to 'fire more torpedoes'.
      $(".cell").off("click");

    } else if (hits < possibleHits + 1 && torpedoFires == torpedoStock) {
      // Displays the win/loss status of the game
      $(".status").show();
      // Displays that the user has lost
      $("#winLose").text("You Lose.");
      // Show button to allow player to start a new game.
      $("button").show();
      $("button").on("click", function() {
        location.reload();
      });
      // adds a class to the cells with ships so that the missed ships are displayed
      $(".ship").addClass("missedShip");
      $(".ship2").addClass("missedShip");
      $(".ship3").addClass("missedShip");
      $(".ship4").addClass("missedShip");
      $(".ship5").addClass("missedShip");
      // Prevents the user from being able to 'fire more torpedoes'.
      $(".cell").off("click");
    }
    // Prevents the game from letting a user fire a torpedo more than once on a cell.
    $(this).off("click");
  });
})
