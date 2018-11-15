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
    var city = "";
    const filterArray = ["cost", "rating"];
    var filter = false;
    const demoPhotoArray = [
        "assets/images/photo1.jpg",
        "assets/images/photo2.jpg",
        "assets/images/photo3.jpg",
        "assets/images/photo4.jpg",
        "assets/images/photo5.jpg",
        "assets/images/photo6.jpeg",
        "assets/images/photo7.jpg",
        "assets/images/photo8.jpg",
        "assets/images/photo9.jpg"
    ];
    
    //drop down search filter function
    $(document).ready(function(){
        $('select').formSelect();
      });
    
    function randomPhoto() {
        var randNum = Math.floor(Math.random() * 9);
        photo = demoPhotoArray[randNum];
    }

    //event handler to create variables from form input when button with class ".btn" is clicked
    $(".btn").on("click", function(event) {
        event.preventDefault();
    
        city = $("#cityInput").val().trim();
        console.log(city);
        $(".input-field")[0].style.display = "none";
        $(".card-unit").fadeIn(1000);
    });
    
    $(document).on("click", "#filter", function() {
        filter = true;

        if($(this).attr("sort") === "cost") {
            const sortVal = $(this).attr("value") - 1;
            sort = filterArray[sortVal];
            order = "asc";
        }
        if($(this).attr("sort") === "rating") {
            const ratingVal = $(this).attr("value") - 1;
            sort = filterArray[ratingVal];
            order = "desc";
        }
        $(".card-unit")[0].style.display = "none";
        $(".card-unit")[1].style.display = "none";
        $(".card-unit")[2].style.display = "none";

        getLocationId(city);  
    })

    function displayLoadingGif() {
        $(".main-content")[0].style.background = "none";
        var image1 = $("<img>");
        image1.attr("src", "assets/images/loading.gif").addClass("loadingStyle");
        $("#restaurant-list").html(image1);
    }
        
    //ajax call function to pull city id, city type, sort, order to pass through getRestaurants() search query
    function getLocationId(city) {
        
        displayLoadingGif();
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
    
        if(response.location_suggestions[0].entity_type === "city") {
            alert("Please enter a valid city in the Raleigh area");
            $("#restaurant-list").html("");
            $(".input-field")[0].style.display = "block";
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
    
    //ajax call to pull local search restaurant data
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
        });
    }
    
    //display in card format the results to div with id #restaurant-list
    function displayRestaurants(response) {
        response.restaurants.forEach(function(data) {4
            //run randomPhoto to assign image to photo variable for current interation
            randomPhoto()
            //begin building individual card
            const restaurantId = data.restaurant.R.res_id;
            const name = data.restaurant.name;
            const rating = data.restaurant.user_rating.aggregate_rating;
            const cuisine = data.restaurant.cuisines;
            const cost = data.restaurant.average_cost_for_two;
            const address = data.restaurant.location.address;
            const website = data.restaurant.url;
            const menu = data.restaurant.menu_url;
            //assign materialize and custom classes
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
            image.attr("src", photo);
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
            $(".main-content")[0].style.overflow = "scroll";
            $(".main-content")[0].style.overflowX = "hidden";
        })
        
    }
    
    $(document).on("dblclick", ".card", function() {
        //open up review html page in separate tab
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
    
    })
      
    
    })
    