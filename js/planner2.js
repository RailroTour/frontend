var array_day=new Array(0); //일차
var array_value=new Array(0); //지역명
var array_position=new Array(0); //위치
var position=0;

$(document).ready(function(){
    
    $(".create").on("click", function(){
        $("#create_event").css({display:'block'});
    })
    $("#create_event .title_box img").on("click", function(){
        $("#create_event").css({display:'none'});
    })
    $("#datepicker").datepicker({
        showOtherMonths:true,
        selectOtherMonths:true,
        showButtonPanel: true,
        changeMonth:true,
        changeYear:true,
        dateFormat:"yy-mm-dd",
        monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
        dayNamesMin: ['일','월','화','수','목','금','토']
    });
    
    $(document).on("click", ".minus", function(){ //일수 감소

//        var num=Number($(this).parent().find(".day").val());
//        num-=1;
//        
//        if(num<1) num=1;
//        if(num>7) num=7;
//        $(this).parent().find(".day").val(num);
       
        var n=$(this).parent().parent().index();
        array_day[n]-=1;
        if(array_day[n]>7) array_day[n]=7;
        if(array_day[n]<1) array_day[n]=1;
        display();
    })    
    $(document).on("click", ".plus", function(){ //일수 증가

//        var num=Number($(this).parent().find(".day").val());
//        num+=1;
//        if(num<1) num=1;
//        if(num>7) num=7;
//        $(this).parent().find(".day").val(num);
        var n=$(this).parent().parent().index();
        array_day[n]+=1;
        if(array_day[n]>7) array_day[n]=7;
        if(array_day[n]<1) array_day[n]=1;
        display();
    })
    $(document).on("click", ".cancel_btn", function(){ //삭제 
        
        var n=$(this).parent().index();

        array_day.splice(n, 1);
        array_value.splice(n, 1);

        display();
    })

    $(".all .bukdo").click(function(){
        $(".all").css({display:'none'});
        $(".buk_do").css({display:'block'});
        $(".nam_do").css({display:'none'});
        $(".Gwangju").css({display:'none'});
        $("#BUK_DO_VIEW").css({backgroundColor:'#1a7ad9'});
        $("#BUK_DO_VIEW").siblings().css({backgroundColor:'transparent'});
    })
    $(".all .namdo").click(function(){
        $(".all").css({display:'none'});
        $(".buk_do").css({display:'none'});
        $(".nam_do").css({display:'block'});
        $(".Gwangju").css({display:'none'});
        $("#NAM_DO_VIEW").css({backgroundColor:'#1a7ad9'});
        $("#NAM_DO_VIEW").siblings().css({backgroundColor:'transparent'});
    })
    $(".all .gwangju").click(function(){
        $(".all").css({display:'none'});
        $(".buk_do").css({display:'none'});
        $(".nam_do").css({display:'none'});
        $(".Gwangju").css({display:'block'});
        $("#Gwangju_VIEW").css({backgroundColor:'#1a7ad9'});
        $("#Gwangju_VIEW").siblings().css({backgroundColor:'transparent'});
    })
    $(".item_box .clear img").click(function(){ //지역추가
        var ci=$(this).data("ci_name");

        if(array_day.length<12){
            array_position.push(position);
            array_day.push(1);
            array_value.push($(this).data("ci_name"));
            display();
            position++;
        }
        else{
            alert('지역 개수가 12개를 초과하였습니다.');
        }

    })
var day, value, index;
    
    $(".area_list").sortable({
        axis: 'y',
        start:function(event, ui){
            index=ui.item.index();
            day=array_day[index]; //일차
            value=array_value[index]; //지역명
        },
        stop:function(event, ui){
            if(ui.item.index()<index){
                for(var i=index; ui.item.index()<i; i--){
                    array_day[i]=array_day[i-1];
                    array_value[i]=array_value[i-1];
                }
            }
            else{
                for(var i=index; i<ui.item.index(); i++){
                    array_day[i]=array_day[i+1];
                    array_value[i]=array_value[i+1];
                }
            }

            array_day[ui.item.index()]=day;
            array_value[ui.item.index()]=value;
        }
    })
})




function display(){
    document.getElementById("area_list_box").innerHTML="";
    for(i=0; i<array_day.length; i++){
        document.getElementById("area_list_box").innerHTML+=create(array_value[i], array_day[i]);
    }
}
function create(ci_name, day){ //동적 추가 
    return '<ul class="area_item_box" draggable="true"> <li class="cancel_btn"><img src="../jpg/cancel_btn.png" alt="" onclick="drop()"></li><li class="area_title">'+ci_name+'</li><div class="day_custom"><li class="minus" onclick="change(-1)"><img src="../jpg/minus.png" alt=""></li><li><input type="text" value="'+day+'" class="day" readonly>일</li><li class="plus" onclick="change(1)"><img src="../jpg/plus.png" alt=""></li></div></ul>';
}

function submit_check(){ //최종 제출시 체크부분
    var day_check=new Array(0, 0, 0, 0, 0, 0, 0);
    if(document.form1.title.value==""){
        alert('여행 제목을 입력해주세요');
        return false;
    }
    else if(document.form1.calendar.value==""){
        alert('날짜를 선택해주세요');
        return false;
    }
    else if(document.form1.travel_day.value==""){
        alert('여행 일 수를 선택해주세요');
        return false;
    }
    else if(document.form1.tema_select.value==""){
        alert('여행 테마를 선택해주세요');
        return false;
    }
    else if(array_day.length==0){
        alert('지역 일정을 확인해주세요');
        return false;
    }
    if(Number(document.form1.travel_day.value)==7){
        for(var i=0; i<array_day.length; i++){
            switch(array_day[i]){
                case 1: day_check[0]++; break;
                case 2: day_check[1]++; break;
                case 3: day_check[2]++; break;
                case 4: day_check[3]++; break;
                case 5: day_check[4]++; break;
                case 6: day_check[5]++; break;
                case 7: day_check[6]++; break;
            }
        }
        for(var i=0; i<day_check.length; i++){
            if(day_check[i]==0){
                alert((i+1)+'일차 일정이 없습니다.');
                return false;
            }
        }
    }
    else if(Number(document.form1.travel_day.value)==5){
        for(var i=0; i<array_day.length; i++){
            switch(array_day[i]){
                case 1: day_check[0]++; break;
                case 2: day_check[1]++; break;
                case 3: day_check[2]++; break;
                case 4: day_check[3]++; break;
                case 5: day_check[4]++; break;
                case 6: day_check[5]++; break;
                case 7: day_check[6]++; break;
            }
        }
        for(var i=0; i<5; i++){
            if(day_check[i]==0){
                alert((i+1)+'일차 일정이 없습니다.');
                return false;
            }
        }
        if(day_check[5]!=0){
            alert('5일인데 초과하는 일정을 계획하셨습니다. 수정해주세요');
            return false;
        }
        else if(day_check[6]!=0){
            alert('5일인데 초과하는 일정을 계획하셨습니다. 수정해주세요');
            return false;
        }
    }
    
}