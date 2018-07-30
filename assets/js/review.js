$(function () {

  // initialize materialize
  M.AutoInit();

  $('.carousel.carousel-slider').carousel({

    fullWidth: true,
    dist: 0,
    padding: 0,
    indicators: true,
    duration: 100,
  });

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBmkUTzXWeKHgrMrODh7Ra1b4feAfwrtiU",
    authDomain: "food-lovers-14947.firebaseapp.com",
    databaseURL: "https://food-lovers-14947.firebaseio.com",
    projectId: "food-lovers-14947",
    storageBucket: "food-lovers-14947.appspot.com",
    messagingSenderId: "134886336746"
  };


});
//----------------------------------------------------------------------------
$(document).ready(function () {

  //Set variables 
  // const restaurantReviewDB = 
  //var header = "";
  var displayImg = "";
  var restaurantId = "17052855";
  var fav = false;
  var i = 0;
  var restaurantReview = [];
  var restaurantName = "";
  var menuUrl = "";
  var webUrl = "";
  var phone = "";
  var cost = "";
  var rating ="";
  var UserId ="test1234"
  var address="";

  // rotate slider
  setInterval(function () {

    $('.carousel.carousel-slider').carousel('next');

  }, 3000);




  getDataFromLocalStorage();

  reviewCall();


  //On click for adding and subtracting rows from favorite list
  $("#favorite").on("click", function (event) {
    event.preventDefault();
    if (fav === false) {
      fav = true;
      $("#favorite").html('<i id="favorite" class="small material-icons">favorite</i>');
      addRowFavorites();
    } else {
      fav = false;
      $("#favorite").html('<i id="favorite" class="small material-icons">favorite_border</i>');
      console.log("before")
      delRowFavorites(); 

    }
  });

  function addRowFavorites() {
    var list = JSON.parse(localStorage.getItem("favoriteList"));

    // check to see if any on list
    if (!Array.isArray(list)) {
      list = [];
      // var header= {
      //   restaurantId : restaurantId,
      //   UserId : UserId,
      //   restaurantName : restaurantName,
      //   menuUrl : menuUrl,
      //   webUrl: webUrl,
      //   phone:phone,
      //   cost: cost,
      //   rating: rating,
      //   address:address,
      //   cuisine:cuisine,
      // }
      localStorage.setItem("favoriteList", JSON.stringify({restaurantId,UserId,restaurantName,menuUrl,webUrl,phone,cost,rating,address,cuisine}));
    } 

     var val={restaurantId,UserId,restaurantName,menuUrl,webUrl,phone,cost,rating,address,cuisine};
      list.push(val);

     localStorage.setItem("favoriteList",JSON.stringify(list));  
    }

  function delRowFavorites() { 
        var delKey = restaurantId;
        var favoriteList = JSON.parse(localStorage.getItem("favoriteList"));
  
        favoriteList.splice(delKey,1);


      localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
     




  }


  // Get the data from Local storage that was set on previous page  
  function getDataFromLocalStorage() {
    var obj = JSON.parse(localStorage.getItem("restaurantData"));
    console.log("created obj from local storage");
    console.log(obj);

    // set variables for divs and for local storage
    restaurantId = obj.restaurantId;
    restaurantName=obj.name;
    webUrl=obj.website;
    menuUrl=obj.menu;
    address = obj.address;
    // phone=obj.phone; 
    cost=obj.cost;
    cuisine=obj.cuisine;
    rating=(obj.rating+ "/5");
    
    //     userId=(obj.userId)
    //      $("#display-img").src(obj.       );
    $("#rest-name").text(restaurantName);
    $("#rest-head").text(restaurantName);
    $("#web").attr("href",  webUrl);
    $("#menu").attr("href", menuUrl);
    $("#address1").text(address);
    //     $("#address1").text(phone);
    $("#cost").text(cost);
    $("#cuisine").text(cuisine);
    $("#rating").text(rating);
    console.log(restaurantId,UserId,restaurantName,menuUrl,webUrl,phone,cost,rating,address,cuisine);
  }

  function reviewCall() {

    const queryURL = "https://developers.zomato.com/api/v2.1/reviews?res_id=" + restaurantId + "&count=20";

    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: 'json',
      async: true,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('user-key',
          'b81c89ea8a3dba9037dd6ffe97c3a20b');
      },
    }).then(function (response) {

      console.log(response);
      restaurantReview = response;
      console.log(restaurantReview)
      if (restaurantReview.reviews_count === 0) {
        $("#review-name").text("No Reviews");
        $("#next").addclass("disabled");
      } else {
        console.log(restaurantReview.user_reviews[0].review.user.name);
        console.log(restaurantReview.user_reviews[0].review.rating_text);
        console.log(restaurantReview.user_reviews[0].review.review_time);
        console.log(restaurantReview.user_reviews[0].review.review_text);
        $("#review-name").text(restaurantReview.user_reviews[0].review.user.name);
        //    $("#rating-text").text(restaurantReview.user_reviews[0].review.rating_text);
        //    $("#review-time").text(restaurantReview.user_reviews[0].review.review_time);
        $("#review").text(restaurantReview.user_reviews[0].review.review_text);
      }


    });

    $("#next").on("click", function (event) {
      event.preventDefault();
      i++;
      console.log(i + " next button i");

      if (i <= 3) {

        $("#review-name").html("");
        $("#rating-text").html("");
        $("#review-time").html("");
        $("#review").html("");
        $("#prev").removeClass("disabled");
        $("#review-name").text(restaurantReview.user_reviews[i].review.user.name);
        //  $("#rating-text").text(restaurantReview.user_reviews[i].review.rating_text);
        //  $("#review-time").text(restaurantReview.user_reviews[i].review.review_time);
        $("#review").text(restaurantReview.user_reviews[i].review.review_text);
      } else if (i = 4) {
        $("#next").addClass("disabled");
        $("#review-name").text(restaurantReview.user_reviews[i].review.user.name);
        //  $("#rating-text").text(restaurantReview.user_reviews[i].review.rating_text);
        //  $("#review-time").text(restaurantReview.user_reviews[i].review.review_time);
        $("#review").text(restaurantReview.user_reviews[i].review.review_text);
      }

    })

    $("#prev").on("click", function (event) {
      event.preventDefault();
      i--;
      console.log(i + " prev button i");

      if (i > 0) {
        console.log("inside of i>0")
        $("#review-name").html("");
        $("#rating-text").html("");
        $("#review-time").html("");
        $("#review").html("");
        $("#next").removeClass("disabled");
        $("#review-name").text(restaurantReview.user_reviews[i].review.user.name);
        //  $("#rating-text").text(restaurantReview.user_reviews[i].review.rating_text);
        //  $("#review-time").text(restaurantReview.user_reviews[i].review.review_time);
        $("#review").text(restaurantReview.user_reviews[i].review.review_text);
      } else {

        $("#prev").addClass("disabled");
        $("#review-name").text(restaurantReview.user_reviews[0].review.user.name);
        //  $("#rating-text").text(restaurantReview.user_reviews[i].review.rating_text);
        //  $("#review-time").text(restaurantReview.user_reviews[i].review.review_time);
        $("#review").text(restaurantReview.user_reviews[0].review.review_text);

      }

    })



  }
})
