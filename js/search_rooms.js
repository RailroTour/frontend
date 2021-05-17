const url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword';
const api_key = 'JXL40bCK2WGOu/E1WOGjuALpADt64Wb2mQVwNpxiA0bre/V8GozZggM2O01/PaTTyNm0A2JahebDf/PGwW8jbg==';

$(document).ready(function(){
    if($.urlParam('keyword') != null){
        $(".result_bar>div").text($.urlParam('keyword')+'의 검색 결과입니다.');
        $(".result_bar").show();
        $.ajax({ //관광지 검색
            type:'GET',
            url: url,
            data:{
                numOfRows:10,
                pageNo:$.urlParam('pageNo'),
                MobileOS:'ETC',
                MobileApp:'Railro',
                ServiceKey:api_key,
                _type:'json',
                listYN:'Y',
                arrange:'O',
                contentTypeId:32,
                keyword:$.urlParam('keyword')
            },
            success:function(data){
                console.log(data);
                const total_cnt = data.response.body.totalCount;
                data = data.response.body.items.item;
                //데이터 추가
                for(var i=0; i<data.length; i++){
                    $(".Tourist").append(search_elements(data[i].contenttypeid, data[i].contentid, data[i].firstimage, data[i].title, data[i].addr1));
                }
                
                //데이터 목록
                for(var i=0; i<Math.ceil(total_cnt/10); i++){
                    if((i+1)==$.urlParam('pageNo')){
                        $(".page_num_group").append('<a href=search_rooms.html?keyword='+$.urlParam('keyword')+'&pageNo='+(i+1)+' class="selected">'+(i+1)+'</a>');
                    }
                    else{
                        $(".page_num_group").append('<a href=search_rooms.html?keyword='+$.urlParam('keyword')+'&pageNo='+(i+1)+'>'+(i+1)+'</a>');
                    }
                }
            },
            error:function(){
                console.log('ajax failed');
            }
        });
        $(".itemlist>.itembox>a").eq(0).prop('href', 'search_integrated.html?keyword='+$.urlParam('keyword'));
        $(".itemlist>.itembox>a").eq(1).prop('href', 'search_tour.html?pageNo=1&keyword='+$.urlParam('keyword'));
        $(".itemlist>.itembox>a").eq(2).prop('href', 'search_foods.html?pageNo=1&keyword='+$.urlParam('keyword'));
        $(".itemlist>.itembox>a").eq(3).prop('href', 'search_planner.html?pageNo=1&keyword='+$.urlParam('keyword'));
        $(".itemlist>.itembox>a").eq(4).prop('href', 'search_rooms.html?pageNo=1&keyword='+$.urlParam('keyword'));
    }
    else{
        $(".result_bar").hide();
    }
    
    
    $(".search_btn").on('click', function(){
        location.href="search_rooms.html?pageNo=1&keyword="+$(".search_input").val();
    });
});

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}



function search_elements(contenttypeid, contentid, img, title, addr){
    return '<ul class="Tour_group"><a href=detail_info.jsp?contenttypeid='+contenttypeid+'&contentid='+contentid+'><li class="TourImage"><img src='+img+' alt="" width="148px"></li><div class="TourInfo"><li class="TourTitle">'+title+'</li><li class="shopping_add"><img src="./jpg/plus.png" alt=""></li><li class="TourContent">'+addr+'</li></div><div class="like_review"><span>321321</span><img src="./mynote_jpg/review.png" alt=""></div></a></ul>'
}