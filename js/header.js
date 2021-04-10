$(document).ready(function(){
    $(window).resize(function() { 
        if($(window).width() >768) {
            $(".m-menu").css("display", "block");
        }
        else{
            $(".m-menu").css("display", "none");
        }
    });
    $(".navbar__toggleBtn").on('click', function(){
        $('.m-menu').slideToggle(500);
    });
});