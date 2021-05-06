Kakao.init('6f0f8167f64486dc0809c9626d6436d5');
console.log(Kakao.isInitialized());
//Kakao.API.request({
//  url: '/v1/user/unlink',
//  success: function(res) {
////    alert('success: ' + JSON.stringify(res))
//  },
//  fail: function(err) {
////    alert('fail: ' + JSON.stringify(err))
//  },
//})
$(document).ready(function(){

});
function loginWithKakao() {
    Kakao.Auth.login({
      success: function(authObj) {
        console.log(authObj);
        console.log(authObj["access_token"]);
        $.cookie('access_token', authObj["access_token"], {expires: 7199, path:'/'});
        $.cookie('refresh_token', authObj["refresh_token"], {expires: 5183999});

                var param = {'access':'123'};

                $.ajax({
                  url:'/backend/member', //request 보낼 서버의 경로
                  type:'delete', // 메소드(get, post, put 등)
                  async: false, //동기: false, 비동기(기본값): ture
                  data:JSON.stringify(param), //보낼 데이터,
                  contentType:'application/json; charset=utf-8',
                  success: function(data) {
                    console.log("data:"+data);
                    console.log(data.status);
                  },
                  error: function(request, status, error) {
                    //서버로부터 응답이 정상적으로 처리되지 못햇을 때 실행
                    rtnmsg = JSON.parse(request.responseText);
                    //alert(rtnmsg.message);
                    console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
                  }
                });
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      },
    })
}