$(document).ready(function() {

  createRowFavorites();

function createRowFavorites() {
  var list = JSON.parse(localStorage.favoriteList);
  console.log('LOOK HERE ', JSON.parse(localStorage.favoriteList))

  for (var i = 0; i < list.length; i++) {

    var name = list[i].restaurantName;
    var cuisine = list[i].cuisine;
    var rating = list[i].rating;
    var address = list[i].address;
    var restaurantId = list[i].restaurantId;

    console.log('NAME ', name)
    console.log('CUISINE ', cuisine)
    console.log('RATING ', rating)
    console.log('ADDRESS ', address)
    console.log('RESTAURANT ID ', restaurantId)


var newRow = $("<tr>")
  var td0 = $("<td>").text(name);
  var td1 = $("<td>").text(cuisine);
  var td2 = $("<td>").text(rating);
  var td3 = $("<td>").text(address);
  var td4 = $("<td>").html('<i class="material-icons left">delete_forever</i>').attr("data-key", restaurantId);

  newRow.prepend(td4).prepend(td3).prepend(td2).prepend(td1).prepend(td0); //.;
  $("#tbody").prepend(newRow);

  console.log(newRow);

  console.log($("<tbody>"))
 };

};

$(document).on("click", ".material-icons", function() {
  event.preventDefault();

  $(this).closest("tr").remove();

});

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