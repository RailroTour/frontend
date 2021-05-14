
$(document).ready(function(){
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

