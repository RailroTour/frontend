
const encoding_api_key = 'JXL40bCK2WGOu%2FE1WOGjuALpADt64Wb2mQVwNpxiA0bre%2FV8GozZggM2O01%2FPaTTyNm0A2JahebDf%2FPGwW8jbg%3D%3D';
const decoding_api_key = 'JXL40bCK2WGOu/E1WOGjuALpADt64Wb2mQVwNpxiA0bre/V8GozZggM2O01/PaTTyNm0A2JahebDf/PGwW8jbg=='

if(getParameterByName('contenttypeid')==12){
    $(".listmenu>button.info_name").text('관광지 정보');
}
else if(getParameterByName('contenttypeid')==32){
    $(".listmenu>button.info_name").text('숙박 정보');
}
else if(getParameterByName('contenttypeid')==39){
    $(".listmenu>button.info_name").text('음식점 정보');
}

$(document).ready(function(){
    //detailIntro(api_key, getParameterByName('contenttypeid'), getParameterByName('contentid'));
    
    
    //기본정보 조회
    detailCommon(decoding_api_key, 32, 1832039);
    //소개정보 조회
    detailIntro(decoding_api_key, 32, 1832039);

    (function( $ ) {
    "use strict";
    $(function() {
        function animated_contents() {
            $(".zt-skill-bar > div ").each(function (i) {
                var $this  = $(this),
                    skills = $this.data('width');

                $this.css({'width' : skills + '%'});

            });
        }
        
        if(jQuery().appear) {
            $('.zt-skill-bar').appear().on('appear', function() {
                animated_contents();
            });
        } else {
            animated_contents();
        }
    });
}(jQuery));
    $('#like').on('change', function(){
        if($('#like').is(':checked')){
            $('.like_btn').attr('src', '../Food_More_Infomation_IMG/like2.png');
        }
        else{
            $('.like_btn').attr('src', '../Food_More_Infomation_IMG/like1.png');
        }
    })
    $('#comment_add textarea').on('focus', function(){
        var text=$(this).attr('placeholder');
        if(text=='로그인 후 이용가능합니다.'){
            alert('로그인 후 이용 가능합니다.');
        }
    })
    $(document).on('click', '.imgfile .preview',function(){
        $(this).remove();
    })
    $('#img').on('change', function(){
        if($(this).val()!=""){
            var ext=$(this).val().split(".").pop().toLowerCase();
            
            if($.inArray(ext, ["gif", "jpg", "jpeg", "png"])==-1){
                swal('이미지 파일만 업로드 해주세요.');
                $(this).val('');
                return;
            }
            var fileSize=this.files[0].size;
            var maxSize=(1024*1024)*10;
            if(fileSize>maxSize){
                swal('파일용량 10MB를 초과했습니다.');
                $(this).val('');
                return;
            }
            
            if($('.imgfile .preview').length>4){
                swal('이미지는 5개까지만 첨부할 수 있습니다.');
                $(this).val('');
                return;
            }
            readURL(this);
            $(this).val('');
        }
    })
    $(document).on('keydown', '.input_tag',function(key){
        if(key.keyCode==13){//엔터키가 들어오면
            if($('.tags').length<10){
                var tag=$(this).val();
                if(tag!=''){
                    $('.tag ul .input_tag').before('<li class="tags">#'+tag+'<img src="../Food_More_Infomation_IMG/cancel-button.png" alt=""></li>');
                }
            }
            else{
                swal('태그는 최대 10개까지 등록할 수 있습니다.');
            }
            $(this).val('');
        }

    })
    $(document).on('click', '.tags img', function(){
        $(this).parent().remove();
    })
   $('.btn_group .Previous').on("click", function(){
       for(var i=0; i<$('.img_collection li').length; i++){
           if($('.img_collection li').eq(i).css('display')=='block'){
               $('.img_collection li').eq(i).fadeOut();
               $('.img_collection li').eq(i).css('display', 'none');
               if(i<1){
                   var num=$('.img_collection li').length;
                   $('.img_collection li').eq(num-1).fadeIn(500);
                   $('.img_collection li').eq(num-1).css('display', 'block');
               }
               else{
                   $('.img_collection li').eq(i-1).fadeIn(500);
                   $('.img_collection li').eq(i-1).css('display', 'block');
               }
               break;
           }
       }
   })
    $('.btn_group .Next').on("click", function(){
        for(var i=0; i<$('.img_collection li').length; i++){
           if($('.img_collection li').eq(i).css('display')=='block'){
               $('.img_collection li').eq(i).fadeOut();
               $('.img_collection li').eq(i).css('display', 'none');
               if(i==$('.img_collection li').length-1){
                   $('.img_collection li').eq(0).fadeIn(500);
                   $('.img_collection li').eq(0).css('display', 'block');
               }
               else{
                   $('.img_collection li').eq(i+1).fadeIn(500);
                   $('.img_collection li').eq(i+1).css('display', 'block');
               }
               break;
           }
       }
    })

})

function readURL(input){
    if(input.files&&input.files[0]){
        var reader=new FileReader();
        reader.onload=function(e){
            var vimg='<ul class="preview" style="background-image: url('+e.target.result+')"><li>삭제</li></ul>';
            $('#img').before(vimg);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
function detailCommon(api_key, contentTypeId, contentId){
    $.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon', {
        pageNo: 1,
        numOfRows: 10,
        MobileOS: 'ETC',
        MobileApp: 'railro',
        serviceKey: api_key,
        contentTypeId: contentTypeId,
        _type: 'json',
        contentId: contentId,
        defaultYN: 'Y',
        firstImageYN: 'Y',
        addrinfoYN: 'Y',
        overviewYN: 'Y'
    }, function(data){
        //console.log('success : '+JSON.stringify(data));
        //console.log('success : '+JSON.stringify(data.response.body));
        //console.log(data.response.body.items.item);
        data = data.response.body.items.item;
        $(document).attr('title', '상세정보 : '+data.title);
        $(".text>.text_group>.title>span:first-child").text(data.title); //제목
        $(".text>.text_group>.rotate>div:last-child").text(data.addr1); //주소
        $(".img_collection").append( //이미지
            '<li style="display: block"><img src='+data.firstimage+' alt=""></li>'
        );
        $(".text>.text_group>.homepage>div:last-child").html(data.homepage); //홈페이지
        $(".more_info>.overview>span:last-child").html(data.overview); //개요
        $(".more_info>.post>span:last-child").text(data.zipcode); //우편번호
        $(".text>.text_group>.phone>div:last-child").text(data.tel); //전화번호
    }
);
}
function detailIntro(api_key, contentTypeId, contentId){

    $.get('http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailIntro', {
            pageNo: 1,
            numOfRows: 10,
            MobileOS: 'ETC',
            MobileApp: 'railro',
            serviceKey: api_key,
            contentTypeId: contentTypeId,
            _type: 'json',
            contentId: contentId
        }, function(data){
            //console.log('success : '+JSON.stringify(data));
            console.log('success : '+JSON.stringify(data.response.body.items.item));
            data = data.response.body.items.item;
            if(contentTypeId==12){
                $(".more_info>.people>span:last-child").text(data.accomcount);
                $(".more_info>.stroller>span:last-child").text(data.chkbabycarriage);
                $(".more_info>.credit_card>span:last-child").text(data.chkcreditcard);
                $(".more_info>.animal>span:last-child").text(data.chkpet);
                $(".more_info>.available_age>span:last-child").text(data.expagerange);
                $(".more_info>.experience>span:last-child").text(data.expguide);
                $(".more_info>.question>span:last-child").text(data.infocenter);
                $(".more_info>.open>span:last-child").text(data.opendate);
                $(".more_info>.parking>span:last-child").text(data.parking);
                $(".more_info>.rest_day>span:last-child").text(data.restdate);
                $(".more_info>.use>span:last-child").text(data.useseason);
                $(".more_info>.use_time>span:last-child").text(data.usetime);
            }
            else if(contentTypeId==39){
                $(".more_info>.discount>span:last-child").text(data.discountinfofood);
                $(".more_info>.representative_menu>span:last-child").text(data.firstmenu);
                $(".more_info>.kid>span:last-child").text(data.kidsfacility);
                $(".more_info>.opening>span:last-child").text(data.opendatefood);
                $(".more_info>.packing>span:last-child").text(data.packing);
                $(".more_info>.reserv>span:last-child").text(data.reservationfood);
                $(".more_info>.scale>span:last-child").text(data.scalefood);
                $(".more_info>.seats>span:last-child").text(data.seat);
                $(".more_info>.smoking>span:last-child").text(data.smoking);
                $(".more_info>.handling_menu>span:last-child").text(data.treatmenu);
            }
        }
    );
}
function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
