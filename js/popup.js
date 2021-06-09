const train_key = "JXL40bCK2WGOu/E1WOGjuALpADt64Wb2mQVwNpxiA0bre/V8GozZggM2O01/PaTTyNm0A2JahebDf/PGwW8jbg==";

$(document).ready(function(){
    $("#search-btn>button").on('click', function(){
        var start_station = $("#start option:selected").val();
        var end_station = $("#end option:selected").val();
        var date = new Date();

        $.ajax({ //관광지 검색
            type:'GET',
            url: "http://openapi.tago.go.kr/openapi/service/TrainInfoService/getStrtpntAlocFndTrainInfo?serviceKey=DrVFgkqXkuQbgQfBPCyTkqsUDXXukiY3pGLkMGgXwCA%2BMZ2XCGAmvQdQtDm8QlqKejostGbcJSHKR0Ru8n8Weg%3D%3D&numOfRows=10&pageNo=1&depPlaceId=NAT010000&arrPlaceId=NAT011668&depPlandTime=20201201&trainGradeCode=00&_type=json",
            success:function(data){
                console.log(data);
            },
            error:function(){
                console.log('ajax failed');
            }
        });
    })
})