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
  firebase.initializeApp(config);

  const restaurantdb = firebase.database().ref("Restaurants")
  const searchHistory = firebase.database().ref("Search History")

//----------------------------------------------------------------------------

//create const 'city' from input 
$("#submit").on("click", function(event) {
    event.preventDefault();

    const city = $("#cityInput").val().trim();
    getLocationId(city);
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

    const entityID = response.location_suggestions[0].entity_id;
    const entityType = response.location_suggestions[0].entity_type;
    getRestaurants(entityID, entityType);
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
        displayRestaurants(response);
        console.log(response);
    });
}

function displayRestaurants(response) {
    response.restaurants.forEach(function(data) {
        const div = $("<div>");
        const hName = $("<h5>");
        const rating = $("<p>");
        const cuisine = $("<p>");
        const cost = $("<p>");
        div.append(hName, rating, cuisine, cost);
        hName.html(data.restaurant.name).addClass("restaurant-font");
        rating.html(data.restaurant.user_rating.aggregate_rating + " / 5").addClass("rating-style");
        cuisine.html(data.restaurant.cuisines);
        cost.html("Average Cost for Two: " + data.restaurant.average_cost_for_two + "$");
        $("#restaurantList").append(div);

        restaurantdb.push(data.restaurant.name);
    })
    
}




})
  

