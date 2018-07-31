$(document).ready(function() {

  createRowFavorites();

function createRowFavorites() {
  var list = JSON.parse(localStorage.getItem("favoriteList"));
   

  for (var i = 0; 0 <= list.length-1; i++) {
    

    console.log("imInTheLoop");
    console.log (list +" inside the loop")

    // console.log(list[i].restaurantName, list[i].cuisine, list[i].rating, list[i].address);

    // var name = list[i].restaurantName;
    var cuisine = list[i].cuisine;
    var rating = list[i].rating;
    var address = list[i].address;

var newRow = $("<tr>")
  var td0 = $("<td>").text(name);
  var td1 = $("<td>").text(cuisine);
  var td2 = $("<td>").text(rating);
  var td3 = $("<td>").text(address);
  var td4 = $("<td>").attr('<a class="waves-effect waves-light btn">');

  newRow.prepend(td0).prepend(td1).prepend(td2).prepend(td3).prepend(td4);
  $("<tbody>").prepend(newRow);

  console.log(newRow);

  };

};

});
//   function deleteRowFavorites() {
//     var list = JSON.parse(localStorage.getItem("favoriteList"))
// };

// var newRow = $("<tr>")
//   var td0 = $("<td>").text(favoriteList.Name);
//   var td1 = $("<td>").text(favoriteList.Cuisine);
//   var td2 = $("<td>").text(favoriteList.Rating);
//   var td3 = $("<td>").text(favoriteList.Address);

//   var deleteButton = $("<button>");
//   button.addClass("del-btn");
//   button.attr("data-key", restaurantId);
//   button.text("REMOVE");

//   newRow.remove(td0).remove(td1).remove(td2).remove(td3).remove(td4).remove(button);
//   $("<tbody>").remove(newRow);

// });