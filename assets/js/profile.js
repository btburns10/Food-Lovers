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
    var uid = localStorage.getItem("userID")
    database = firebase.database().ref('Users/' + uid)

    database.on("value", function (snapshot) {


        console.log(snapshot.val());
        console.log(snapshot.val().name);
        console.log(snapshot.val().email);

        $("#namePrint").html(snapshot.val().name)
        $("#cityPrint").html(snapshot.val().city)
        $("#emailPrint").html(snapshot.val().email)
        $("#profileImage").attr("src", snapshot.val().photo);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    $("#profileImage").attr("src", "assets/images/placeholder.png");

    $("#editProfileBtn").on("click", function () {
        $(".editsOfProfile").css("display", "block");
        $("input").css("border", "1px teal solid");
        $(".profileTextEdits").css("display", "block");
        $(this).addClass("disabled");
    })

    $(document).on("click", "#updateProfile", function () {
        var name = $("#first_name").val().trim();
        var city = $("#city").val().trim();
        var email = $("#email").val().trim();
        var photo = $("#profileImage").attr("src");

        if ((name === "") || (city === "") || (email === "")) {
            $("#modal1").css("display", "block");
        } else {
            var information = {
                name: name,
                city: city,
                email: email,
                photo: photo
            };
            $(".editsOfProfile").css("display", "none");
            $("#editProfileBtn").removeClass("disabled");
            $(".profileTextEdits").css("display", "none");

            database.set(information);
        }
    })

    $("#modal-close").on("click", function(){
        $("#modal1").css("display", "none");
    })
});