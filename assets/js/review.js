$(function() {

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
var restaurantId ="17052855";
var fav = false;


// rotate slider
setInterval(function() {
 
  $('.carousel.carousel-slider').carousel('next');

}, 3000);   




   getDataFromLocalStorage();

   reviewCall();


   


 //On click for adding and subtracting rows from favorite list
  $("#favorite").on("click", function(event) {
    event.preventDefault();
    if (fav === false) {
       fav = true;
       $("#favorite").html('<i id="favorite" class="small material-icons">favorite</i>');
      //  addRowFirebase();
    } else {
       fav = false;
       $("#favorite").html('<i id="favorite" class="small material-icons">favorite_border</i>'); 
       //  delRowFirebase(); 

    }
  });  

// Get the data from Local storage that was set on previous page  
function getDataFromLocalStorage(){
  var obj=JSON.parse(localStorage.getItem("restaurantData"));
  console.log("created obj from local storage");
  console.log(obj);

        restaurantId = obj.restaurantId;
  //      $("#display-img").src(obj.       );
        $("#rest-name").text(obj.name);
        $("#rest-head").text(obj.name);
        $("#web").attr("href",obj.website);
        $("#menu").attr("href",obj.menu);
        $("#address1").text(obj.address);
   //     $("#address2").txt(obj.);
        $("#cuisine").text(obj.cuisine);
        $("#rating").text(obj.rating + "/ 5");
       }       

function reviewCall(){

  const queryURL = "https://developers.zomato.com/api/v2.1/reviews?res_id="+ restaurantId +"&count=20";

  $.ajax({
      url: queryURL,
      method: "GET",
      dataType: 'json',
      async: true,
      beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
      'b81c89ea8a3dba9037dd6ffe97c3a20b');},
  }).then(function(response) {
      
      console.log(response);
      const restaurantReviewDB = response;
      console.log(restaurantReviewDB)

}

  )}



})
