$(document).ready(function(){

    //initial array of tv shows
    var movies = ["Scrubs", "Ballers", "The Office", "Game of Thrones", "It's Always Sunny in Philadelphia", "Vikings", "Workaholics", "Parks and Recreation", "HIMYM"]
    GIFArea = " "
    
    //==================RENDER BUTTON=============================
    
    //function for displaying tv show data
    function renderButtons() {
    
    //deleting the movie buttons prior to adding new gifs buttons
    $("#movies-view").empty();
    
    //looping through the array of gifs
    for (var i=0; i < movies.length; i++) {
   
    var a = $('<button>');
    //Adding a class
    a.addClass('btn btn-primary');
    
    //adding a data-attribute with a value of the television at index i
    a.attr('data-name', movies[i]);
    //providing the button's text with a value of the gif at index i
    a.text(movies[i]);
    //adding the button the html
    $("#movies-view").append(a);
    }
    
    }
    
    renderButtons();
    

    //this function handles events where one button is clicked
    $("#add-movie").on('click', function() {
    
    event.preventDefault();
    
    //This line will grab the text from the input box
    var gif = $("#movie-input").val().trim();
    
    //this movie from the textbox is then added to our array
    movies.push(gif);
    
    //calling renderButtons which handles the processing of our movie array
    renderButtons();
    
    });
    
    //==============DISPLAY INFO==============================
        $(document).on('click', 'button',  function() {
            // Deleting the movies prior to adding new movies
            // (this is necessary otherwise we will have repeat buttons)
                $('#GIFArea').empty(); 
                var b = $(this).attr('data-name');		// 'this' refers to the button that was clicked
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + b + "&api_key=XnT9o5sRVqXcTKwiLphR0a0Hh2AkXSQu&limit=10";  //query api url and public key
                console.log(queryURL); 
    
                //standard ajax call to get request
                $.ajax({
                        url: queryURL,
                        method: 'GET'
                    })
                //after the data comes back from the API
                    .done(function(response) {
                        console.log(response);
                  //Storing an array of results in the results variable
                        var results = response.data;
               
                        for (var i = 0; i < results.length; i++) {
               
                        var gifDiv = $('<div class="item">');
                
                        var rating = results[i].rating;
               
                        var r = $('<p>').text("Rating: " + rating);
                
                        var gifImage = $('<img>');
               
                            gifImage.attr('src', results[i].images.fixed_height_still.url)
                                    .attr('data-still', results[i].images.fixed_height_still.url)
                                    .attr('data-animate', results[i].images.fixed_height.url)
                                    .attr('data-state', "still")
                                    .addClass("showImage");
                //displaying the rating & image
                            gifDiv.append(r)
                                  .append(gifImage);	                    
    
                //prepending data not necessary since cleared             	  
                            $('#GIFArea').prepend(gifDiv);
                        }
    
                    });
            });
    
    

        // Listens for a click on any image 
        $(document).on('click', '.showImage',  function() {
    
            var state = $(this).data('state');
            //If the clicked image's state is still, update its src attribute to what its data-animate value is
            if (state == "still") {
                console.log("image works");
             // Then, set the image's data-state to animate
                $(this).attr('src', $(this).data('animate'))
                       .data('state', 'animate');
            } else {
            //  else set src to the data-still value
                console.log("animated image works");
                $(this).attr('src', $(this).data('still'))
                       .data('state', 'still');               
            }
    
        });
    
    });