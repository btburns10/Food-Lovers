$(function () {

    var instance = M.Carousel.init({
        fullWidth: true,
        indicators: true
    });

    // Or with jQuery

    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });

    $(".nextButton").on("click", function(){
        var target = $(this).attr("data-target")

        console.log(target)

        var x = document.getElementById(target);

        console.log(x)

        x.scrollIntoView();
    })
})