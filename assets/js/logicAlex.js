$(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCpSivuBs4N0RQMZSGpZPtgGPTjPgsfvHU",
        authDomain: "food-lovers-9bdc3.firebaseapp.com",
        databaseURL: "https://food-lovers-9bdc3.firebaseio.com",
        projectId: "food-lovers-9bdc3",
        storageBucket: "",
        messagingSenderId: "592101420756"
    };
    firebase.initializeApp(config);
    //

    //Google Sign In
    $("#signIn").on("click", function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithRedirect(provider);

        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // ...
            }
            // The signed-in user info.
            var user = result.user;
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    })
    //

    //Materialize required javascripts//
    $(".dropdown-trigger").dropdown(
        { hover: false },
    );

    $(document).ready(function () {
        $('.sidenav').sidenav();
    });
    //-------------------------------------------//
});