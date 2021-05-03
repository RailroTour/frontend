Kakao.init('6f0f8167f64486dc0809c9626d6436d5');
console.log(Kakao.isInitialized());
Kakao.API.request({
  url: '/v1/user/unlink',
  success: function(res) {
    alert('success: ' + JSON.stringify(res))
  },
  fail: function(err) {
    alert('fail: ' + JSON.stringify(err))
  },
})
$(document).ready(function(){

});
function loginWithKakao() {
    Kakao.Auth.login({
      success: function(authObj) {
        console.log(authObj);
        console.log(authObj["access_token"]);
        $.cookie('access_token', authObj["access_token"], {expires: 7199, path:'/'});
        $.cookie('refresh_token', authObj["refresh_token"], {expires: 5183999});
        location.href="./index.html";
      },
      fail: function(err) {
        alert(JSON.stringify(err))
      },
    })
}