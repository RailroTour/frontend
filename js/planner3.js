const tour_api = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword";
const api_key = "JXL40bCK2WGOu/E1WOGjuALpADt64Wb2mQVwNpxiA0bre/V8GozZggM2O01/PaTTyNm0A2JahebDf/PGwW8jbg==";
let contentTypeId = 12;
let areaCode = $(".day_arrange>button").first().data('area');
let sigunguCode = $(".day_arrange>button").first().data('sigungu');

$(document).ready(function(){
    //처음화면 리스트 로딩
    getTourData(areaCode, contentTypeId, sigunguCode, api_key);
    
    $(".day_group>.refresh").on("click", function(){
        let clear = confirm("모든 일정을 삭제하시겠습니까?");
        if(clear == true){
            $("#route_add>.route").remove();
        }
    });
    
    $(".kind_select>div").on("click", function(){ // 검색타입 변경
        $(this).css("color", "#009dff");
        $(".kind_select>div").not($(this)).css("color", "#ccc");
        $(".search_result>.all>.search_data").remove();
        if($(this).attr("id")=="train"){
            $(".hash_add").show();
            contentTypeId = 40;
        }
        else if($(this).attr("id")=="cart"){
            $(".hash_add").hide();
            contentTypeId = 41;
        }
        else if($(this).attr("id")=="tour"){
            $(".hash_add").hide();
            contentTypeId = 12;
            getTourData(areaCode, contentTypeId, sigunguCode, api_key);
        }
        else if($(this).attr("id")=="food"){
            $(".hash_add").hide();
            contentTypeId = 39;
            getTourData(areaCode, contentTypeId, sigunguCode, api_key);
        }
        else if($(this).attr("id")=="rooms"){
            $(".hash_add").hide();
            contentTypeId = 32;
            getTourData(areaCode, contentTypeId, sigunguCode, api_key);
            
        }
    });
    
    $(document).on("mouseenter", ".search_result>.all>.search_data", function() { //마우스 오버시
        
        var imageSrc = './marker_img/hover.png', // 마커이미지의 주소입니다    
            imageSize = new kakao.maps.Size(44, 46), // 마커이미지의 크기입니다
            imageOption = {offset: new kakao.maps.Point(22, 46)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            markerPosition = new kakao.maps.LatLng($(this).data('mapy'), $(this).data('mapx')); // 마커가 표시될 위치입니다

        // 마커를 생성합니다
        marker = new kakao.maps.Marker({
            position: markerPosition, 
            image: markerImage // 마커이미지 설정 
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        setCenter($(this).data('mapy'), $(this).data('mapx'));
        marker.setMap(map);  
    });

    $(document).on("mouseleave", ".search_result>.all>.search_data", function() { //마우스 아웃
        marker.setMap(null);
    });
    
    $(".search_form>.area_search").keydown(function(key){ //검색
        $(".search_result>.all>.search_data").remove();
        let contentTypeId;
        let marker_img;
        if(key.keyCode == 13){
            for(let i=1; i<=$(".kind_select>div").length; i++){
                if(rgb2hex($(".kind_select>div:nth-child("+i+")").css('color'))=="#009dff"){
                    if($(".kind_select>div:nth-child("+i+")").attr('id')=="tour"){
                        contentTypeId=12;
                        marker_img="./marker_img/TourMarker.png";
                    }
                    else if($(".kind_select>div:nth-child("+i+")").attr('id')=="food"){
                        contentTypeId=39;
                        marker_img="./marker_img/FoodMarker.png";
                    }
                    else if($(".kind_select>div:nth-child("+i+")").attr('id')=="rooms"){
                        contentTypeId=32;
                        marker_img="./marker_img/"
                    }
                    else if($(".kind_select>div:nth-child("+i+")").attr('id')=="train"){
                        contentTypeId=40;
                    }
                    else if($(".kind_select>div:nth-child("+i+")").attr('id')=="cart"){
                        contentTypeId=41;
                    }
                    break;
                }
            }
            if(contentTypeId==12 || contentTypeId==39 || contentTypeId==32){


                $.get(tour_api, {
                    MobileOS: 'ETC', 
                    MobileApp: 'railro', 
                    ServiceKey: api_key, 
                    keyword: $(".search_form>.area_search").val(),
                    _type: 'json',
                    listYN: 'Y',
                    arrange: 'O',
                    numOfRows: 1000,
                    contentTypeId: contentTypeId
                }, function(data){
                    console.log(data);
                    const cnt = data.response.body.items.item.length;
                    data = data.response.body.items.item;
                    let markers = [];
                    
                    for(let i=0; i<cnt; i++){ 
                        $(".search_result>.all").append( //요소들 추가
                            search_tour_element(
                                data[i].firstimage2,
                                data[i].title,
                                data[i].contentid,
                                data[i].mapx,
                                data[i].mapy,
                                contentTypeId
                            )
                        );
                        
                    }
                });
            }
        }
    })
});

function search_tour_element(img, title, id, mapx, mapy, contentTypeId){
    let tour_type;
    if(contentTypeId==12){
        tour_type='관광지';
    }
    else if(contentTypeId==39){
        tour_type='음식점'
    }
    else if(contentTypeId==32){
        tour_type='숙박'
    }
    
    return '<div class="search_data" data-mapx='+mapx+' data-mapy='+mapy+'><a href="./'+id+'" class="img"><img src="'+img+'" alt="" width="100px" height="100px"></a><ul class="info_group"><input type="hidden" class="content_id" value="0"><li class="title">'+title+'</li><li class="sub_title">'+tour_type+'</li></ul><div class="add_btn"><img src="./map_image/add.png" alt="" class="route_add_btn"></div></div>'
}

function rgb2hex(rgb) {
     if (  rgb.search("rgb") == -1 ) {
          return rgb;
     } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     }
}

function setCenter(mapy, mapx) {            
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(mapy, mapx);
    
    // 지도 중심을 이동 시킵니다
    map.setCenter(moveLatLon);
}

function getTourData(areaCode, contentTypeId, sigunguCode, api_key){
    $.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList', {
            pageNo: 1,
            MobileOS: 'ETC',
            MobileApp: 'railro',
            ServiceKey: api_key,
            listYN: 'Y',
            arrange: 'O',
            contentTypeId: contentTypeId,
            areaCode: areaCode,
            sigunguCode: sigunguCode,
            _type: 'json'
        }, function(data){
            console.log('success : '+data);
        
            const cnt = data.response.body.items.item.length;
            let totalCount = data.response.body.totalCount;
            data = data.response.body.items.item;
            let markers = [];
                    
            for(let i=0; i<cnt; i++){ 
                $(".search_result>.all").append( //요소들 추가
                    search_tour_element(
                        data[i].firstimage2,
                        data[i].title,
                        data[i].contentid,
                        data[i].mapx,
                        data[i].mapy,
                        contentTypeId
                    )
                );

            }
        
            if(totalCount>10){
                for(let i=2; i<=totalCount/10+1; i++){
                    $.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList', {
                            pageNo: i,
                            MobileOS: 'ETC',
                            MobileApp: 'railro',
                            ServiceKey: api_key,
                            listYN: 'Y',
                            arrange: 'O',
                            contentTypeId: contentTypeId,
                            areaCode: areaCode,
                            sigunguCode: sigunguCode,
                            _type: 'json'
                        }, function(data){
                            console.log('success : '+data);
                            data = data.response.body.items.item;
                            let markers = [];

                            for(let i=0; i<cnt; i++){ 
                                console.log(data[i].firstimage2 == undefined);
                                $(".search_result>.all").append( //요소들 추가
                                    
                                    search_tour_element(
                                        data[i].firstimage2 == undefined ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Roundel_of_None.svg/600px-Roundel_of_None.svg.png':data[i].firstimage2,
                                        data[i].title,
                                        data[i].contentid,
                                        data[i].mapx,
                                        data[i].mapy,
                                        contentTypeId
                                    )
                                );

                            }
                            
                        }
                    );
                }
            }
        }
    );
}