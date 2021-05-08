$(document).ready(function(){
    $(".kind_select>div").on("click", function(){
        $(this).css("color", "#009dff");
        $(".kind_select>div").not($(this)).css("color", "#ccc");
    });
    $(".search_form>.area_search").keydown(function(key){
        if(key.keyCode == 13){
            const tour_api = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword";
            const api_key = "JXL40bCK2WGOu/E1WOGjuALpADt64Wb2mQVwNpxiA0bre/V8GozZggM2O01/PaTTyNm0A2JahebDf/PGwW8jbg==";

            $.get(tour_api, {
                MobileOS: 'ETC', 
                MobileApp: 'railro', 
                ServiceKey: api_key, 
                keyword: $(".search_form>.area_search").val(),
                _type: 'json',
                listYN: 'Y',
                arrange: 'O',
                numOfRows: 1000
            }, function(data){
                console.log(data);
                const cnt = data.response.body.items.item.length;
                data = data.response.body.items.item;
                for(let i=0; i<cnt; i++){
                    $(".search_result>.all").append(
                        search_tour_element(
                            data[i].firstimage2,
                            data[i].title,
                            data[i].contentid
                        )
                    );
                }
            });
        }
    })
});

function search_tour_element(img, title, id){
    return '<div class="search_data"><a href="./'+id+'" class="img"><img src="'+img+'" alt="" width="100px" height="100px"></a><ul class="info_group"><input type="hidden" class="content_id" value="0"><li class="title">'+title+'</li><li class="sub_title">관광지</li></ul><div class="add_btn"><img src="./map_image/add.png" alt="" class="route_add_btn"></div></div>'
}