$(document).ready(function() {
  //initial sports car array
  var sportsCars = ["Audi", "BMW", "Bugatti", "Ferrari", "Ford", "Jaguar", "Lamborghini", "Maserati", "Mercedes-Benz", "Porsche"]

  function populateButtons() {
    for (var i = 0; i < sportsCars.length; i++) {
      //button creation for items in initial array
      var sportsButton = $("<button>")
      //adds bootsrap classes and 'item' for triggers later
      sportsButton.addClass("btn btn-primary item")
      //adds sportsCar array name to button text
      sportsButton.text(sportsCars[i])
      //adds buttons to HTML
      $("#buttonsContainer").append(sportsButton)
    }
  }

  $("#Submit").on("click", function(event){
    //prevent page refresh
    event.preventDefault()
    //checks if Input is empty or not, and proceeds
    if ($('#newCar').val() === "") {
      //prevent user from putting blank buttons in HTML
      alert("Type a name to submit")
    } else {
      //empty the container for other button divs
      $("#buttonsContainer").empty()
      //variable to hold value that is typed
      var newCar = $("#newCar").val()
      //add the variable's value to the sportsCars array
      sportsCars.push(newCar)
      //re-display the newly updated array in HTML
      populateButtons();
      //enable the carClick function
      carClick();
      //set the input form back to default after inserting current value to array
      $('#newCar').val("")
    }
  })

  $("#Clear").on("click", function(event){
    //resets page to defaults
  })

  //event click for car buttons
  function carClick() {
    $(".item").on("click", function(event){
      //empty container for other divs
      $("#gifyContainer").empty()
      //prevent page refresh
      event.preventDefault()

      var name = $(this).text()
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=GskWlsLDt8Qxyare1sPpFYC8ZeH0SWaC&limit=10"

      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response){
        console.log(response)

        var responseArray = response.data

        console.log(responseArray)

        for (var i = 0; i < responseArray.length; i++ ) {

            var maxWidth = responseArray[i].images.fixed_height.width

            var gifyDiv = $("<div>")
            gifyDiv.addClass('card text-white bg-secondary mb-3 margin')
            var gifyRating = $("<div>")
            gifyRating.addClass('card-header')
            gifyRating.text("Rating: " + responseArray[i].rating)
            var gifyBody = $("<div>")
            gifyBody.addClass('card-body')
            var gifyImg = $("<img>")
            gifyImg.attr("src", responseArray[i].images.fixed_height_still.url)
            gifyImg.attr("src-animate", responseArray[i].images.fixed_height.url)
            gifyImg.attr("src-still", responseArray[i].images.fixed_height_still.url)
            gifyImg.attr("data", "still")


            $(gifyBody).append(gifyImg)
            $(gifyDiv).append(gifyRating)
            $(gifyDiv).append(gifyBody)

            $("#gifyContainer").append(gifyDiv)

        }

        $('img').off().on("click", function() {

          var status = $(this).attr("data")

          if (status === "still") {
            $(this).attr("src", $(this).attr("src-animate"));
            $(this).attr("data", "animated");
          } else if (status === "animated") {
            $(this).attr("src", $(this).attr("src-still"));
            $(this).attr("data", "still");
          }
        })
      })
    })
  }

  populateButtons();
  carClick();

})
