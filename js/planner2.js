
$(document).ready(function(){
    $(document).on("click", ".area-item>.cancel-btn", function(){
        $(this).parent().remove();
    })

    $(document).on("click", ".area-item>.minus", function(){ //여행 지역 일수 감소
        const val = Number($(this).next().find(".day-num").val());
        if(val>1){
            $(this).next().find(".day-num").val(val-1);
        }
    })
    $(document).on("click", ".area-item>.plus", function(){ //여행 지역 일수 증가
        const val = Number($(this).prev().find(".day-num").val());
        if(val<7){
            $(this).prev().find(".day-num").val(val+1);
        }
    })
    $(".areas>.area").on("click", function(){
        const area_name = $(this).find(".si-gun-gu").text();
        
        $(".selected-area>.vals").append('<div class="area-item"><button class="cancel-btn"><img src="./jpg/cancel_btn.png" alt=""></button><span class="area-name">'+area_name+'</span><button class="adjust-btn minus"><img src="./jpg/minus.png" alt=""></button><span><input type="text" disabled value="7" class="day-num"> 일</span><button class="adjust-btn plus"><img src="./jpg/plus.png" alt=""></button></div>');
    })
})
