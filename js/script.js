$(document).ready(function(){ //서브메뉴 애니메이션 부분
    $('.m-menu>li, .s-menu').hover(function(){
       // $('.s-menu').stop().slideToggle(300);
        if($(window).width() > 768){
            $('.s-menu').stop().slideDown(300);
        }
        //$(this).find('.s-menu').stop().slideToggle('fast') 개별로 내려오게 할때
    }, function(){
        $('.s-menu').stop().slideUp();
    });
    
    $('.listmenu').focusin(function(){
        $(this).find('ul.listbox').stop().fadeIn();
    });
    $('.listmenu').focusout(function(){
        $(this).find('ul.listbox').stop().fadeOut();
    });
    
    $('.yes').click(function(){
        if($('.agree5').is(":checked")==false){
            alert("모든 약관에 동의 하셔야 합니다.");
        }
        else if($('.agree2').is(":checked")==false){
            alert("모든 약관에 동의 하셔야 합니다.");
        }
        else if($('.agree3').is(":checked")==false){
            alert("모든 약관에 동의 하셔야 합니다.");
        }
        else if($('.agree4').is(":checked")==false){
            alert("모든 약관에 동의 하셔야 합니다.");
        }
        else{
            $("#group_from").submit();
        }
    });
    $('.all-agree').click(function(){
        if($('.all-agree').is(":checked")==true){
            $('.agree5').attr("checked", true);
            $('.agree2').attr("checked", true);
            $('.agree3').attr("checked", true);
            $('.agree4').attr("checked", true);
        }
        else{
            $('.agree5').attr("checked", false);
            $('.agree2').attr("checked", false);
            $('.agree3').attr("checked", false);
            $('.agree4').attr("checked", false);
        }
    })
    

})

    var submenu;
    var aborder;

  function bgcolor(seq){
    
    var submenu = $('.hoverbg'+seq)
    var aborder = $('.list_a'+seq)
    if($(window).width() > 768){
        $(submenu).css({background:'#f7f7f7'})
        $(submenu).siblings().css({background:'#fff'})

        $(aborder).addClass('aborder')
    }
  }

  function removecolor(seq){
    var aborder = $('.list_a'+seq)
    $(aborder).removeClass('aborder')
    
  }

start();
var imgs=1;
var now=0;

function start(){
    $('.imgbox>img').eq(0).siblings().fadeOut();
    setInterval(slide, 3000);
}

function slide(){
    now=(now===imgs)?0:now+=1
    $('.imgbox>img').eq(now-1).fadeOut();
    $('.imgbox>img').eq(now).fadeIn();
}

function change(num){
  
   var x  = document.form;
   var y = Number(x.count.value) + num;
   if(y < 1) y = 1;
   x.count.value = y;
  
}



		
function area_change(cnt){
  
   var a  = document.area_form;
   var b = Number(a.area_count.value) + cnt;
   if(b < 1) b = 1;
   a.area_count.value = b;
  
}


function planner_view(seq){
    var view_group=$(".group"+seq)
    var view_btn=$(".click"+seq)
    
    $(view_group).css({zIndex:"5"})
    $(view_group).siblings().css({zIndex:"1"})
    
    $(view_btn).css({background:"blue"})
    $(view_btn).siblings().css({background:"#ccc"})
}

function plannerbtn(seq){
    switch(seq){
        case 1:
            planner_view(1);
            break;
        case 2:
            planner_view(2);
            break;
        case 3:
            planner_view(3);
            break;
        case 4:
            planner_view(4);
            break;
		case 5:
			planner_view(5);
			break;
		case 6:
			planner_view(6);
			break;
		case 7:
			planner_view(7);
			break;
		case 8:
			planner_view(8);
			break;
    }
}


iconstart()
  var icon = 2
  var iconnow = 0
  
  function iconstart(){
    $('.tema_slide>.tema_slide_group').eq(0).siblings().fadeOut();
	  iconslide();
  }
  
  function iconslide(){
    iconnow = (iconnow == icon)? 0:iconnow+=1
    $('.tema_slide>.tema_slide_group').eq(iconnow-1).fadeOut();
    $('.tema_slide>.tema_slide_group').eq(iconnow).fadeIn();
  }
  
  // 버튼코드
  var sIndex = 1;
  show(sIndex);
  
  function plus(n){
    show(sIndex+=n);
  }
  
  function show(n){
    
    var slides = document.getElementsByClassName('myS');
    
    if(n > slides.length ){ sIndex = 1; }
    if(n < 1){ sIndex = slides.length; }
    
    for(i=0; i<slides.length; i++){
      slides[i].style.display='none';
    }
    slides[ sIndex-1 ].style.display='block';
  }
    




