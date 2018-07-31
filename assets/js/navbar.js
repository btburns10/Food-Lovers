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
        storageBucket: "food-lovers-9bdc3.appspot.com",
        messagingSenderId: "592101420756"
        // apiKey: "AIzaSyBmkUTzXWeKHgrMrODh7Ra1b4feAfwrtiU",
        // authDomain: "food-lovers-14947.firebaseapp.com",
        // databaseURL: "https://food-lovers-14947.firebaseio.com",
        // projectId: "food-lovers-14947",
        // storageBucket: "food-lovers-14947.appspot.com",
        // messagingSenderId: "134886336746"
    };
    firebase.initializeApp(config);

    function addNavBar() {
        $("#entireNavBar").html(`
            <nav>
                <div class="nav-wrapper">
                    <div id="navbarMargins">
                        <a href="index.html" class="brand-logo left">
                            <img src="assets/images/foodLogoPNG.png" id="headerLogo">
                        </a>
                        <a href="#" data-target="dropdownMobile" class="dropdown-trigger right hide-on-large-only">
                            <i class="large material-icons">menu</i>
                        </a>
                        <ul class="right hide-on-med-and-down">
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                            <li>
                                <a href="resultsBurns.html">Search</a>
                            </li>
                            <li>
                                <a href="contact.html">Contact Us</a>
                            </li>
                            <!-- Profile Dropdown Trigger -->
                            <li class="row">
                                <a href="#!" class="dropdown-trigger" data-beloworigin="true" data-target="dropdown1" id="profileIcon">
                                <div class="preloader-wrapper active">
                                <div class="spinner-layer spinner-teal-only">
                                    <div class="circle-clipper left">
                                        <div class="circle">
                                        </div>
                                    </div>
                                    <div class="gap-patch">
                                        <div class="circle">
                                        </div>
                                    </div>
                                    <div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!--Profile Dropdown Menu-->
            <ul class="dropdown-content navbarDropdown" id="dropdown1">
                <li class="divider" id="accountLinks"></li>
            </ul>
            <!--xxxxxxxxxxxxxxxxxx-->
            <!--Mobile Dropdown Menu-->
            <ul class="dropdown-content navbarDropdown right hide-on-large-only" id="dropdownMobile">
                <li>
                    <a href="resultsBurns.html">Search</a>
                </li>
                <li>
                    <a href="contact.html">Contact Us</a>
                </li>
                <li class="divider" id="mobileAccountLinks"></li>
            </ul>
            <!--xxxxxxxxxxxxxxxxxx-->
        `)
    };

    addNavBar();

    // Checks if there is a user signed in, gets info, changes html accordingly//


    firebase.auth().onAuthStateChanged(function (user) {
        if (user != null) {
            //User is signed in.
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;
            // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            dropdownOnSignIn();
        } else {
            dropdownOnSignOut();
        }
    });

    //-------------------------------------------//

    //Google Sign In
    $(document).on("click", ".signIn", function () {
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
        });
    });


    //-------------------------------------------------------------//

    $(document).on("click", ".signOut", function () {
        firebase.auth().signOut()
            .then(function () {
                console.log("signed out")
            })
            .catch(function (error) {
                console.log(error);
            });
    });
    //-----------------------------------------------------------------------------------//

    function dropdownOnSignIn() {
        $("#profileIcon").empty();
        $(".signIn").remove();

        var $photo = $("<img>").attr("src", photoUrl).attr("id", "profilePicture");
        $("#profileIcon").append($photo);

        var $liProfile = $("<li>").addClass("profileLink");
        var $profile = $("<a>").attr("href", "profile.html").html("Profile");
        var $profile = $liProfile.append($profile);
        $("#dropdown1").append($profile);
        $("#dropdownMobile").append($profile.clone());

        var $liFavorites = $("<li>").addClass("favoritesLink");
        var $favorites = $("<a>").attr("href", "favorites.html").html("Favorites");
        var $favorites = $liFavorites.append($favorites)
        $("#dropdown1").append($favorites);
        $("#dropdownMobile").append($favorites.clone());

        var $liSignout = $("<li>").addClass("signOut")
        var $signOut = $("<a>").attr("href", "#!").html("Sign Out")
        var $signOut = $liSignout.append($signOut)
        $("#dropdown1").append($signOut);
        $("#dropdownMobile").append($signOut.clone());

        localStorage.setItem("userID", uid);
    };

    function dropdownOnSignOut() {
        $(".profileLink").remove();
        $(".favoritesLink").remove();
        $(".signOut").remove();

        var $profileImage = $("<i>").addClass("large material-icons").attr("id", "profileIcon").css("font-size", "60px").html("account_circle");
        $("#profileIcon").empty();
        $("#profileIcon").append($profileImage);
        console.log("user not logged in");

        var $liSignIn = $("<li>").addClass("signIn");
        var $signIn = $("<a>").attr("href", "#!").html("Sign In");
        var $signIn = $liSignIn.append($signIn);
        $("#dropdown1").append($signIn);
        $("#dropdownMobile").append($signIn.clone());

        localStorage.removeItem("userID");
    }

    //Materialize specific javascripts//
    $('.dropdown-trigger').dropdown({
        inDuration: 300,
        outDuration: 225,
        hover: false, // Activate on click
        belowOrigin: true, // Displays dropdown below the button
        alignment: 'right', // Displays dropdown with edge aligned to the left of button
    });
    //-----------------------------------------------------------------------------------//
});