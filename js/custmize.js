$(document).ready(function(){
    $('.bar li label').on('click', function(){
        $(this).addClass('selected');
        $(this).siblings().removeClass('selected');
    })
    $('.s-c-b-content center button').on('click', function(){
        var person_cnt=$('input[name="people_cnt"]:checked').val();
        var travel_day=$('input[name="travel_day"]:checked').val()
        var travel_tema=$('input[name="travel_tema"]:checked').val();
        var area_cnt=$('input[name="area_cnt"]:checked').val();
        console.log(person_cnt);
        console.log(travel_day);
        console.log(travel_tema);
        console.log(area_cnt);
    })
})