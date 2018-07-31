$(document).ready(function() {

function createRowFavorites() {
    var list = JSON.parse(localStorage.getItem("favoriteList"))
};

var newRow = $("<tr>")
  var td0 = $("<td>").text(favoriteList.Name);
  var td1 = $("<td>").text(favoriteList.Cuisine);
  var td2 = $("<td>").text(favoriteList.Rating);
  var td3 = $("<td>").text(favoriteList.Address);

  newRow.append(td0).append(td1).append(td2).append(td3).append(td4).append(button);
  $("<tbody>").append(newRow);

  function deleteRowFavorites() {
    var list = JSON.parse(localStorage.getItem("favoriteList"))
};

var newRow = $("<tr>")
  var td0 = $("<td>").text(favoriteList.Name);
  var td1 = $("<td>").text(favoriteList.Cuisine);
  var td2 = $("<td>").text(favoriteList.Rating);
  var td3 = $("<td>").text(favoriteList.Address);

  var deleteButton = $("<button>");
  button.addClass("del-btn");
  button.attr("data-key", restaurantId);
  button.text("REMOVE");

  newRow.remove(td0).remove(td1).remove(td2).remove(td3).remove(td4).remove(button);
  $("<tbody>").remove(newRow);

});