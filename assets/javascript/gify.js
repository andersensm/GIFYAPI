$(document).ready(function() {
  //initial topics array
  var topics = ["Audi", "BMW", "Bugatti", "Ferrari", "Ford", "Jaguar", "Lamborghini", "Maserati", "Mercedes-Benz", "Porsche"]

  function populateButtons() {
    for (var i = 0; i < topics.length; i++) {
      //button creation for items in initial array
      var topicsButton = $("<button>")
      //adds bootsrap classes and 'item' for triggers later
      topicsButton.addClass("btn btn-primary item")
      //adds topics array name to button text
      topicsButton.text(topics[i])
      //adds buttons to HTML
      $("#buttonsContainer").append(topicsButton)
    }
  }
  //event click for topic buttons
  function topicClick() {
    $(".item").on("click", function(event){
      //empty container for other divs
      $("#gifyContainer").empty()
      //access clicked button's text and store in name variable
      var name = $(this).text()
      //store host url, button that was clicked, apikey and giry limit inside queryURL variable
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=GskWlsLDt8Qxyare1sPpFYC8ZeH0SWaC&limit=10"
      //use ajax to access the URL of the button that was clicked
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      //get ajax data and store inside 'response'
      .done(function(response){
        //log what 'response' brought back
        console.log(response)
        //store the response inside 'responseArray', because it returns an array of 10 objects based on the queryURL
        var responseArray = response.data
        //log the array to make sure everything is correct
        console.log(responseArray)
        //for loop to go through the array of 10 objects
        for (var i = 0; i < responseArray.length; i++ ) {
            //create a div for each object and store in gifyDiv variable
            var gifyDiv = $("<div>")
            //add bootstrap classes to each gifyDiv within array
            gifyDiv.addClass('card text-white bg-secondary mb-3 margin')
            //create a div for each object and store in gifyRating variable
            var gifyRating = $("<div>")
            //add bootstrap class to each gifyRating  div within array
            gifyRating.addClass('card-header')
            //adds text with the rating that is accessed for the specific object within the array
            gifyRating.text("Rating: " + responseArray[i].rating)
            //create a div for each object and store in gifyBody variable
            var gifyBody = $("<div>")
            //add bootstrap class to each gifyBody div within array
            gifyBody.addClass('card-body')
            //create a img for each object and store in gifyImg variable
            var gifyImg = $("<img>")
            //added src attribute for initial img URL static when loaded to HTML DOM
            gifyImg.attr("src", responseArray[i].images.fixed_height_still.url)
            //added src-animate attribute for the img URL motion
            gifyImg.attr("src-animate", responseArray[i].images.fixed_height.url)
            //added src-still attribute for the img URL static
            gifyImg.attr("src-still", responseArray[i].images.fixed_height_still.url)
            //added data attribute for "still" when initial creation on HTML DOM
            gifyImg.attr("data", "still")
            //append each img to each body div
            $(gifyBody).append(gifyImg)
            //append each rating text div to the main container div for each item in the array
            $(gifyDiv).append(gifyRating)
            //append each body div to the main container div for each item in the array
            $(gifyDiv).append(gifyBody)
            //append the main container div for each item in the array to the entire container within HTML
            $("#gifyContainer").append(gifyDiv)
        }
        //when img is clicked
        $('img').off().on("click", function() {
          //store the img's 'data' attribute that was clicked in 'status' variable
          var status = $(this).attr("data")
          //if statement to check 'status' variable
          if (status === "still") {
            //if status is still, set the src of the img that was clicked to animate URL
            $(this).attr("src", $(this).attr("src-animate"));
            //set data attribute to animated
            $(this).attr("data", "animated");
          } else if (status === "animated") {
            //if status is animated, set the src of the img that was clicked to still URL
            $(this).attr("src", $(this).attr("src-still"));
            //set data attribute to still
            $(this).attr("data", "still");
          }
        })
      })
    })
  }
  $("#Submit").on("click", function(event){
    //prevent page refresh
    event.preventDefault()
    //checks if Input is empty or not, and proceeds
    if ($('#newTopic').val() === "") {
      //prevent user from putting blank buttons in HTML
      alert("Type a name to submit")
    } else {
      //empty the container for other button divs
      $("#buttonsContainer").empty()
      //variable to hold value that is typed
      var newTopic = $("#newTopic").val()
      //add the variable's value to the topics array
      topics.push(newTopic)
      //re-display the newly updated array in HTML
      populateButtons();
      //enable the topicClick function
      topicClick();
      //set the input form back to default after inserting current value to array
      $('#newTopic').val("")
    }
  })
  //resets to initial topics array
  $("#Clear").on("click", function(event){
    //prevent page refresh
    event.preventDefault()
    //empty the container for other button divs
    $("#buttonsContainer").empty()
    //reset the topics array to original array
    topics = ["Audi", "BMW", "Bugatti", "Ferrari", "Ford", "Jaguar", "Lamborghini", "Maserati", "Mercedes-Benz", "Porsche"]
    //re-display the newly updated array in HTML
    populateButtons();
    //enable the topicClick function
    topicClick();
  })
  //initial button population to HTML when page has loaded
  populateButtons();
  //enables click functionality to buttons after appending to HTML DOM
  topicClick();
})
