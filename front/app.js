/**
 * Created by sergey on 09.12.16.
 */
$(document).ready(function(){

let token;

  $('#btnLogin').click(function(){

    let email = $('#email').val();
    let password = $('#password').val();

    $.post('/api/login',{email: email, password: password},function(data){
      if (!data.token)
      {
        console.log('error')
        alert('Bad login or password')
      }
      else
      {
        $('#btnLogout').removeClass('hidden')
        $('#btnLogin').addClass('hidden');
        $('#userName').text(data.name);
        $('#email').val("");
        $('#password').val("");
        $('#userToken').text(data.token);
        token = data.token;
      }
    })
  });

  $('#btnLogout').click(function(){
    $.get('/api/logout',function(data){
      $('#btnLogout').addClass('hidden')
      $('#btnLogin').removeClass('hidden')
      $('#userToken').text("");
      $('#userName').text("");
      console.log(data);
    })
  });




});