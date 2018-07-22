$(document).ready(function () {

 
        var queryURL = "https://api.yelp.com/v3/businesses/search?api_key=dvl9z8EFiDtD8diOMPoAdHuxVBpcFt_g1aJkRvimmFjMk2h1RcgEsrGaT3GDkdUVABxqaux8YkYOq-6WdMcHTcBoS7fpIFBL3lqPxbp3PkBnRuKh3jQh8cegGidRW3Yx";
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
                console.log(response);
            }
        )}
    )
    

    
        