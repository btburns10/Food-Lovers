//This javascript file will dynamically add the entire function navbar to the page that has <div id="entireNavBar">
// <!--Scripts required for navbar-->
// <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js"></script>
// <script src="https://www.gstatic.com/firebasejs/4.12.0/firebase.js"></script>
// <script src='assets/js/navbar.js'></script>
// <!--xxxxxxxxxxxxxxxxxx-->
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

    function addNavBar(){
        $("#entireNavBar").html(`<!-- Main Navbar -->
        <nav>
            <div class="nav-wrapper">
                <div class="container">
                    <a href="#!" class="brand-logo">
                        <img src="assets/images/foodLogoPNG.png" id="headerLogo">
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li>
                            <a href="#1">Page</a>
                        </li>
                        <li>
                            <a href="#1">Contact Us</a>
                        </li>
                        <!-- Profile Dropdown Trigger -->
                        <li class="row">

                            <a href="#!" class="dropdown-trigger" data-beloworigin="true" data-target="dropdown1" id="profileIcon">
                            </a>

                        </li>
                        <!--xxxxxxxxxxxxx-->
                    </ul>
                </div>
            </div>
        </nav>
        <!--Profile Dropdown Menu-->
        <ul id="dropdown1" class="dropdown-content">
            <li>
                <a href="#!">Profile</a>
            </li>
            <li>
                <a href="#!">Favorites</a>
            </li>
            <li class="divider"></li>
            <li id="loginControl">
                <a href="#!" id="signIn">Sign In</a>
            </li>
        </ul>
        <!--xxxxxxxxxxxxxxxxxxxxxxxxxx-->`)
    };

    addNavBar();

    // Checks if there is a user signed in, gets info, changes html accordingly//
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    userLoggedIn = false;

    if (user != null) {
        userLoggedIn = true;
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid;
        // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.

        if (userLoggedIn === true) {
            var $profile = $("<img>").attr("src", photoUrl).attr("id", )
            $("#profileIcon").empty();
            $("#profileIcon").append($profile)

            var $signOut = $("<a>").attr("href", "#!").attr("id", "signOut")
            var $signOut = $signOut.html("Sign Out")
            $("#loginControl").empty()
            $("#loginControl").append($signOut)
        }

    } else {
        console.log(userLoggedIn)

        var $profile = $("<i>").addClass("large material-icons").attr("id", "profileIcon").css("font-size", "60px").html("account_circle")
        $("#profileIcon").empty()
        $("#profileIcon").append($profile)
        console.log("user not logged in")

        var $signIn = $("<a>").attr("href", "#!").attr("id", "signIn")
        var $signIn = $signIn.html("Sign In")
        $("#loginControl").empty()
        $("#loginControl").append($signIn)
    }

    //-------------------------------------------//

    //Google Sign In
    $(document).on("click", "#signIn", function () {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(result.credential.accessToken)
            // The signed-in user info.
            var user = result.user;
            var user = firebase.auth().currentUser;
            if (user != null) {
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                emailVerified = user.emailVerified;
                uid = user.uid;
                // The user's ID, unique to the Firebase project. Do NOT use
                // this value to authenticate with your backend server, if
                // you have one. Use User.getToken() instead.
                user.providerData.forEach(function (profile) {
                    console.log("Sign-in provider: " + profile.providerId);
                    console.log("  Provider-specific UID: " + profile.uid);
                    console.log("  Name: " + profile.displayName);
                    console.log("  Email: " + profile.email);
                    console.log("  Photo URL: " + profile.photoURL);
                })
            };
            userLoggedIn = true;
        }).catch(function (error) {
            console.log(error.code)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log("Fail")
        }).then(function () {

            //swap out account_circle for user profile pic//
            var $profile = $("<img>").attr("src", photoUrl).attr("id", "profilePicture")
            $("#profileIcon").empty();
            $("#profileIcon").append($profile)

            var $signOut = $("<a>").attr("href", "#!").attr("id", "signOut")
            var $signOut = $signOut.html("Sign Out")
            $("#loginControl").empty()
            $("#loginControl").append($signOut)

        });
    });


    //-----------------------------------------------------------------------------------//

    // Use to set persistence until user logs out- was not working initially, come back to this
    // firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    //     .then(function () {
    //         // Existing and future Auth states are now persisted in the current
    //         // session only. Closing the window would clear any existing state even
    //         // if a user forgets to sign out.
    //         // ...
    //         // New sign-in will be persisted with session persistence.
    //         return firebase.auth().signInWithEmailAndPassword(email, password);
    //     })
    //     .catch(function (error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //     });


    $(document).on("click", "#signOut", function () {
        firebase.auth().signOut()
            .then(function () {
                console.log("signed out")
                userLoggedIn = false;
            })
            .catch(function (error) {
                console.log(error);
            }).then(function () {
                var $profile = $("<i>").addClass("large material-icons").attr("id", "profileIcon").css("font-size", "60px").html("account_circle")
                $("#profileIcon").empty()
                $("#profileIcon").append($profile)
                console.log("user not logged in")

                var $signIn = $("<a>").attr("href", "#!").attr("id", "signIn")
                var $signIn = $signIn.html("Sign In")
                $("#loginControl").empty()
                $("#loginControl").append($signIn)
            });
    });
    //-----------------------------------------------------------------------------------//

    //Materialize specific javascripts//
    $('.dropdown-trigger').dropdown({
        inDuration: 300,
        outDuration: 225,
        hover: false, // Activate on click
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
    });
    $('.sidenav').sidenav();
    //-----------------------------------------------------------------------------------//
});