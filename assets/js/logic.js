$(function() {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBmkUTzXWeKHgrMrODh7Ra1b4feAfwrtiU",
    authDomain: "food-lovers-14947.firebaseapp.com",
    databaseURL: "https://food-lovers-14947.firebaseio.com",
    projectId: "food-lovers-14947",
    storageBucket: "food-lovers-14947.appspot.com",
    messagingSenderId: "134886336746"
  };

  const restaurantdb = firebase.database().ref("Restaurants")
  const searchHistory = firebase.database().ref("Search History")

//----------------------------------------------------------------------------

//event handler to create const 'city' from input when button with class ".btn" is clicked
$(".btn").on("click", function(event) {
    event.preventDefault();

    getLocationId($("#cityInput").val().trim());
    $("#cityInput").val("");
});
    
//ajax call function to pull city id
function getLocationId(city) {

    searchHistory.push(city);
    
    const queryURL = "https://developers.zomato.com/api/v2.1/locations?query=" + city + "%20research%20triangle&count=1"

$.ajax({
    url: queryURL,
    method: "GET",
    dataType: 'json',
    async: true,
    beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
    'b81c89ea8a3dba9037dd6ffe97c3a20b');},
}).then(function(response) {
    
    console.log(response);

    if(response.location_suggestions[0].entity_type === "city") {
        alert("Please enter a valid city in the Raleigh area")
        return;
    }

    //call getRestaurants function with two parameters from location APIs
    getRestaurants(
        response.location_suggestions[0].entity_id,
        response.location_suggestions[0].entity_type
    )
});

}

//ajax call to pull local restaurant info
function getRestaurants(entityID, entityType) {

    const queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=20";

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: 'json',
        async: true,
        beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
        'b81c89ea8a3dba9037dd6ffe97c3a20b');},
    }).then(function(response) {
        $("#restaurant-list").empty();
        displayRestaurants(response);
        console.log(response);
    });
}

function displayRestaurants(response) {
    response.restaurants.forEach(function(data) {
        
        const divContainer = $("<div>").addClass("col s12 m7 grow");
        const headerName = $("<h4>");
        const divCardHorizontal = $("<div>").addClass("card horizontal");
        const divCardImage = $("<div>").addClass("card-image");
        const image = $("<img>").addClass("placeholder-image");
        const divCardStacked = $("<div>").addClass("card-stacked");
        const divCardContent = $("<div>").addClass("card-content");
        const divCardAction = $("<div>").addClass("card-action");
        const rating = $("<p>");
        const cuisine = $("<p>");
        const cost = $("<p>");
        const address = $("<p>");
        const favIcon = $("<i>").addClass("far fa-heart");
        divContainer.append(divCardHorizontal);
        divCardHorizontal.append(divCardImage, divCardStacked);
        divCardImage.append(image);
        image.attr("src", "assets/images/placeholder.png");
        divCardStacked.append(divCardContent, divCardAction);
        divCardContent.append(headerName, rating, cuisine, cost, address);
        divCardAction.html("Add to Favorites").append(favIcon);
        headerName.html(data.restaurant.name);
        rating.html("Rating: " + data.restaurant.user_rating.aggregate_rating + " / 5");
        cuisine.html("Cuisine: " + data.restaurant.cuisines);
        cost.html("Average Cost for Two: " + data.restaurant.average_cost_for_two + "$");
        address.html("Address: " + data.restaurant.location.address)
        $("#restaurant-list").append(divContainer);

        restaurantdb.push(data.restaurant.name);
    })
    
}

$(document).on("click", ".fa-heart", function() {
    if($(this).hasClass("far")) {
        $(this).removeClass("far").addClass("fas");
    }      
    else {
        $(this).removeClass("fas").addClass("far");
    }
})
  


})
