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
      //prevent user from putting blank divs in HTML
      alert("Type in a valid car name")
    } else {
      //empty container for other divs
      $("#buttonsContainer").empty()

      var newCar = $("#newCar").val()

      sportsCars.push(newCar)

      populateButtons();
      carClick();

      $('#newCar').val("")

    }
  })
  //event click for car buttons
  function carClick() {
    $(".item").on("click", function(event){
      //empty container for other divs
      $("#gifyContainer").empty()
      //prevent page refresh
      event.preventDefault()

      var name = $(this).text()
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=GskWlsLDt8Qxyare1sPpFYC8ZeH0SWaC&limit=10"

      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .done(function(response){
        console.log(response)

        var responseArray = response.data

        console.log(responseArray)

        for (var i = 0; i < responseArray.length; i++ ) {

            var gifyDiv = $("<div>")
            gifyDiv.addClass('card text-white bg-secondary mb-3')
            gifyDiv.attr("style", 'max-width: 600px')
            var gifyRating = $("<div>")
            gifyRating.addClass('card-header')
            gifyRating.text("Rating: " + responseArray[i].rating)
            var gifyBody = $("<div>")
            gifyBody.addClass('card-body')
            var gifyImg = $("<img>")
            gifyImg.addClass('img')
            gifyImg.attr("src", responseArray[i].images.fixed_height_still.url)
            gifyImg.attr("src-animate", responseArray[i].images.fixed_height.url)
            gifyImg.attr("src-still", responseArray[i].images.fixed_height_still.url)
            gifyImg.attr("data", "still")


            $(gifyBody).append(gifyImg)
            $(gifyDiv).append(gifyRating)
            $(gifyDiv).append(gifyBody)

            $("#gifyContainer").append(gifyDiv)

        }

        $('img').off().on("click", function(event) {

          event.preventDefault()

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
