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
var sort = "";
var order = "";
const filterArray = ["cost", "rating"];
const orderArray = ["asc", "desc"];


//drop down search filter function
$(document).ready(function(){
    $('select').formSelect();
  });

//event handler to create variables from form when button with class ".btn" is clicked
$(".btn").on("click", function(event) {
    event.preventDefault();

    getLocationId($("#cityInput").val().trim());
    $("#cityInput").val("");

    const sortVal = $("#selectOne").val() - 1;
    const orderVal = $("#selectTwo").val() - 1;

    sort = filterArray[sortVal];
    order = orderArray[orderVal];
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
        response.location_suggestions[0].entity_type,
        sort,
        order
    )
});

}

//ajax call to pull local restaurant info
function getRestaurants(entityID, entityType, sort, order) {

    const queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" + entityID + "&entity_type=" + entityType + "&count=20&sort=" + sort + "&order=" + order;

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

//display to div with id #restaurant-list the results from getRestaurants()
function displayRestaurants(response) {
    response.restaurants.forEach(function(data) {

        const restaurantId = data.restaurant.R.res_id;
        const name = data.restaurant.name;
        const rating = data.restaurant.user_rating.aggregate_rating;
        const cuisine = data.restaurant.cuisines;
        const cost = data.restaurant.average_cost_for_two;
        const address = data.restaurant.location.address;
        const website = data.restaurant.url;
        const menu = data.restaurant.menu_url;


        const divContainer = $("<div>").addClass("col s12 m7 grow");
        const headerName = $("<h4>");
        const divCardHorizontal = $("<div>").addClass("card horizontal").attr("id", restaurantId).attr("name", name).attr("rating", rating).attr("cuisine", cuisine).attr("cost", cost).attr("address", address).attr("website", website).attr("menu", menu);
        const divCardImage = $("<div>").addClass("card-image");
        const image = $("<img>").addClass("placeholder-image");
        const divCardStacked = $("<div>").addClass("card-stacked");
        const divCardContent = $("<div>").addClass("card-content");
        const divCardAction = $("<div>").addClass("card-action");
        const pRating = $("<p>");
        const pCuisine = $("<p>");
        const pCost = $("<p>");
        const pAddress = $("<p>");
        const link = $("<a>").addClass("margin-right");
        divContainer.append(divCardHorizontal);
        divCardHorizontal.append(divCardImage, divCardStacked);
        divCardImage.append(image);
        image.attr("src", "assets/images/placeholder.png");
        divCardStacked.append(divCardContent, divCardAction);
        divCardContent.append(headerName, pRating, pCuisine, pCost, pAddress);
        divCardAction.append(link);
        link.attr("href", data.restaurant.url).attr("target", "_blank").text("Make a reservation");
        headerName.html(name);
        pRating.html("Rating: " + rating + " / 5");
        pCuisine.html("Cuisine: " + cuisine);
        pCost.html("Average Cost for Two: " + cost + "$");
        pAddress.html("Address: " + address)
        $("#restaurant-list").append(divContainer);

        restaurantdb.push(data.restaurant.name);
    })
    
}

$(document).on("dblclick", ".card", function() {
    //open up review page in separate tab
    window.open("https://btburns10.github.io/Food-Lovers/review.html", "_blank");

    //store restaurant data to local storage
    var restaurantId = $(this).attr("id");
    var name = $(this).attr("name");
    var rating = $(this).attr("rating");
    var cuisine = $(this).attr("cuisine");
    var cost = $(this).attr("cost");
    var address = $(this).attr("address");
    var website = $(this).attr("website");
    var menu = $(this).attr("menu");

    localStorage.setItem("restaurantData", JSON.stringify({restaurantId, name, rating, cuisine, cost, address, website, menu}));
    var test = JSON.parse(localStorage.getItem("restaurantData"));
    console.log(test);

})
  

})
