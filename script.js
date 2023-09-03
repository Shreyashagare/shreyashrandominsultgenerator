// eslint-disable-next-line no-unused-vars
const projectName = "random-insult-machine";
const colors = [
  "#8B0000",
  "#800000",
  "#483D8B",
  "#2E8B57",
  "#8B008B",
  "#556B2F",
  "#800080",
  "#8B4513",
  "#006400",
  "#2F4F4F",
  "#D2691E",
  "#9932CC",
  "#4B0082",
  "#8A2BE2",
  "#006400",
  "#556B2F",
  "#8B4513",
  "#D2691E",
  "#9932CC",
  "#4B0082",
];

var currentInsult = "";
const insultArray = [];

// Initialize the SpeechSynthesisUtterance
const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance();

// Initialize the audio element for the sound effect
const audio = new Audio("audio/ohhh sound.mp3"); // Replace with your audio file

function getRandomInsult(insults) {
  return insults[Math.floor(Math.random() * insults.length)];
}

function speakInsult(insult) {
  // Set the text to be spoken
  utterance.text = insult;

  // When speech is done, play the sound effect
  utterance.onend = function () {
    playSoundEffect();
  };

  // Speak the insult
  synth.speak(utterance);
}

function playSoundEffect() {
  audio.play();
}

function getInsult() {
  // Fetch insults from data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const insults = data.insults;
      let randomInsult = getRandomInsult(insults);
      currentInsult = randomInsult;

      $(".insult-text").animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $("#text").text(randomInsult);

        // Read the new insult aloud
        speakInsult(randomInsult);
      });

      var color = Math.floor(Math.random() * colors.length);
      $("html body").animate(
        {
          backgroundColor: colors[color],
          color: colors[color],
        },
        1000
      );
      $(".button").animate(
        {
          backgroundColor: colors[color],
        },
        1000
      );
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
}

$(document).ready(function () {
  getInsult();

  $("#new-insult").on("click", function () {
    // Add clicked state to the button
    $("#new-insult").addClass("clicked");

    getInsult();

    // Remove clicked state after a delay
    setTimeout(function () {
      $("#new-insult").removeClass("clicked");
    }, 1000); // Change the delay as needed
  });
});
