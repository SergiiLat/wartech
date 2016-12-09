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
        $('#btnGetItems').removeClass('hidden')
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
      $('#btnGetItems').addClass('hidden')
      $('#btnLogin').removeClass('hidden')
      $('#userToken').text("");
      $('#userName').text("");
      console.log(data);
    })
  });

  $('#btnGetItems').click(function(){
        $.ajax({
          type:"GET",
          beforeSend: function (request)
          {
            request.setRequestHeader("Authorization", token);
          },
          data:{token:token},
          url: "/api/allItems",
          success: function(msg) {
            console.log(msg);
          }
        });

  });

});